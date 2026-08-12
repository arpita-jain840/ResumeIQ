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

# ✅ WRITE PDF (FORMATTED)
def _write_pdf_file(path, content):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=10)
    pdf.set_font("Arial", size=11)

    for line in content.split("\n"):
        pdf.multi_cell(0, 6, line)

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
            rewritten_resume = ""

        # ✅ VALIDATION (IMPORTANT FIX)
        if not rewritten_resume or len(str(rewritten_resume).strip()) < 200:
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

        # ✅ DOWNLOAD LINKS (FIXED)
        txt_url = url_for("rewrite.download_file", filename=txt_filename, _external=True)
        pdf_url = url_for("rewrite.download_file", filename=pdf_filename, _external=True)

        return jsonify({
            "rewritten_resume": rewritten_resume,
            "txt_url": txt_url,
            "pdf_url": pdf_url
        })

    except Exception as e:
        print("REWRITE ERROR:", e)
        return jsonify({"error": "Rewrite failed"}), 500


# ✅ DOWNLOAD ROUTE (FIXED)
@rewrite_bp.route("/uploads/<filename>", methods=["GET"])
def download_file(filename):
    try:
        safe_name = secure_filename(filename)
        file_path = os.path.join(UPLOAD_FOLDER, safe_name)

        if not os.path.exists(file_path):
            return jsonify({"error": "File not found"}), 404

        return send_from_directory(UPLOAD_FOLDER, safe_name, as_attachment=True)

    except Exception as e:
        print("DOWNLOAD ERROR:", e)
        return jsonify({"error": "Download failed"}), 500