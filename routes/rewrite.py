from flask import Blueprint, request, jsonify, send_from_directory, url_for
from werkzeug.utils import secure_filename
from fpdf import FPDF
import os
import uuid

from utils.pdf_parser import extract_text_from_pdf
from utils.resume_analyzer import analyze_resume
from ai.resume_rewriter import rewrite_resume

# ✅ FIXED BLUEPRINT
rewrite_bp = Blueprint("rewrite", __name__)

# ✅ PATH SETUP
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ✅ FALLBACK (FULL RESUME SAFE)
def _build_fallback_rewrite(resume_text):
    lines = [line.strip() for line in resume_text.splitlines() if line.strip()]
    
    if not lines:
        return "Professional rewrite could not be generated."

    return "\n".join([
        "PROFESSIONAL RESUME",
        "",
        *lines,
        "",
        "End of Resume"
    ])

# ✅ WRITE TXT
def _write_text_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

# ✅ SANITIZE FOR FPDF
def _sanitize_pdf_text(text):
    if not text:
        return ""
    replacements = {
        "\u2022": "-",
        "\u2023": "-",
        "\u25e6": "-",
        "\u2043": "-",
        "\u2219": "-",
        "\u2013": "-",
        "\u2014": "-",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2026": "...",
        "\u00a0": " ",
        "\t": "    ",
    }
    for orig, rep in replacements.items():
        text = text.replace(orig, rep)
    return text.encode("latin-1", "replace").decode("latin-1")

# ✅ WRITE PDF (FORMATTED & SAFE)
def _write_pdf_file(path, content):
    try:
        pdf = FPDF()
        pdf.add_page()
        pdf.set_auto_page_break(auto=True, margin=15)
        pdf.set_font("helvetica", size=10)

        for line in content.split("\n"):
            safe_line = _sanitize_pdf_text(line)
            # Use effective page width (pdf.epw) to prevent FPDFException
            pdf.multi_cell(w=pdf.epw, h=5.5, text=safe_line)

        pdf.output(path)
    except Exception as e:
        print("PDF Generation warning:", e)
        # Fallback simple PDF writing
        pdf = FPDF()
        pdf.add_page()
        pdf.set_auto_page_break(auto=True, margin=15)
        pdf.set_font("helvetica", size=10)
        clean_text = _sanitize_pdf_text(content)
        pdf.multi_cell(w=pdf.epw, h=5.5, text=clean_text)
        pdf.output(path)

# 🚀 MAIN ROUTE
@rewrite_bp.route("/rewrite", methods=["POST"])
def rewrite():
    try:
        # ✅ CHECK FILE
        if "resume" not in request.files:
            return jsonify({"error": "No resume uploaded"}), 400

        file = request.files["resume"]

        if file.filename == "":
            return jsonify({"error": "Empty file"}), 400

        if not file.filename.lower().endswith(".pdf"):
            return jsonify({"error": "Only PDF allowed"}), 400

        # ✅ SAVE FILE
        filename = secure_filename(file.filename)
        file_id = uuid.uuid4().hex
        saved_name = f"{file_id}_{filename}"
        file_path = os.path.join(UPLOAD_FOLDER, saved_name)
        file.save(file_path)

        # ✅ EXTRACT TEXT
        try:
            resume_text = extract_text_from_pdf(file_path) or ""
        except Exception as e:
            print("PDF ERROR:", e)
            return jsonify({"error": "PDF read failed"}), 400

        if not resume_text.strip():
            return jsonify({"error": "Empty resume text"}), 400

        # ✅ ANALYZE
        try:
            analysis = analyze_resume(resume_text)
        except Exception as e:
            print("Analysis error:", e)
            analysis = {}

        # ✅ REWRITE (AI)
        try:
            rewritten_resume = rewrite_resume(resume_text, analysis)
        except Exception as e:
            print("AI ERROR:", e)
            rewritten_resume = _build_fallback_rewrite(resume_text)

        # ✅ VALIDATION (IMPORTANT FIX)
        if not rewritten_resume or len(str(rewritten_resume).strip()) < 50:
            print("⚠️ Using fallback (AI incomplete)")
            rewritten_resume = _build_fallback_rewrite(resume_text)

        rewritten_resume = str(rewritten_resume).strip()

        # ✅ FILE NAMES
        txt_filename = f"{file_id}_resume.txt"
        pdf_filename = f"{file_id}_resume.pdf"

        txt_path = os.path.join(UPLOAD_FOLDER, txt_filename)
        pdf_path = os.path.join(UPLOAD_FOLDER, pdf_filename)

        # ✅ SAVE FILES
        _write_text_file(txt_path, rewritten_resume)
        _write_pdf_file(pdf_path, rewritten_resume)

        # ✅ DOWNLOAD LINKS (Works for both relative routing and absolute URLs)
        try:
            txt_url = url_for("rewrite.download_file", filename=txt_filename, _external=True)
            pdf_url = url_for("rewrite.download_file", filename=pdf_filename, _external=True)
        except Exception:
            txt_url = f"/uploads/{txt_filename}"
            pdf_url = f"/uploads/{pdf_filename}"

        return jsonify({
            "rewritten_resume": rewritten_resume,
            "txt_url": txt_url,
            "pdf_url": pdf_url,
            "pdf_filename": pdf_filename,
            "txt_filename": txt_filename
        })

    except Exception as e:
        print("REWRITE ERROR:", e)
        return jsonify({"error": f"Rewrite failed: {str(e)}"}), 500


# ✅ DOWNLOAD ROUTE (FIXED)
@rewrite_bp.route("/uploads/<filename>", methods=["GET"])
def download_file(filename):
    try:
        safe_name = secure_filename(filename)
        file_path = os.path.join(UPLOAD_FOLDER, safe_name)

        if not os.path.exists(file_path):
            return jsonify({"error": "File not found"}), 404

        download_name = "rewritten_resume.pdf" if safe_name.endswith(".pdf") else "rewritten_resume.txt"
        return send_from_directory(
            UPLOAD_FOLDER,
            safe_name,
            as_attachment=True,
            download_name=download_name
        )

    except Exception as e:
        print("DOWNLOAD ERROR:", e)
        return jsonify({"error": "Download failed"}), 500