from flask import Blueprint, request, jsonify
import os

from utils.pdf_parser import extract_text_from_pdf
from utils.resume_analyzer import analyze_resume
from ai.cover_letter import generate_cover_letter

cover_letter_bp = Blueprint(
    "cover_letter",
    __name__
)

UPLOAD_FOLDER = "uploads"


@cover_letter_bp.route("/cover-letter", methods=["POST"])
def cover_letter():

    if "resume" not in request.files:
        return jsonify({
            "error": "No resume uploaded."
        }), 400

    job_description = request.form.get("job_description")
    generation_type = request.form.get("type", "cover")

    if not job_description:
        return jsonify({
            "error": "Job Description is required."
        }), 400

    os.makedirs(
        UPLOAD_FOLDER,
        exist_ok=True
    )

    file = request.files["resume"]

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(filepath)

    resume_text = extract_text_from_pdf(filepath)

    analysis = analyze_resume(
        resume_text
    )

    letter = generate_cover_letter(
        resume_text,
        analysis,
        job_description,
        generation_type
    )

    return jsonify({
        "cover_letter": letter
    })