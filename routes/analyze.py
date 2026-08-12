from flask import Blueprint
from flask import request
from flask import jsonify

import os

from utils.pdf_parser import extract_text_from_pdf
from utils.resume_analyzer import analyze_resume

analyze_bp = Blueprint(
    "analyze",
    __name__
)

UPLOAD_FOLDER = "uploads"


@analyze_bp.route("/analyze", methods=["POST"])
def analyze():

    # Check whether resume is uploaded
    if "resume" not in request.files:

        return jsonify(
            {
                "error": "No resume uploaded."
            }
        ), 400

    file = request.files["resume"]

    # Create uploads folder if it doesn't exist
    os.makedirs(
        UPLOAD_FOLDER,
        exist_ok=True
    )

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    # Save PDF
    file.save(filepath)

    # Extract text
    resume_text = extract_text_from_pdf(
        filepath
    )

    # Analyze resume
    analysis = analyze_resume(resume_text)

    print("=" * 50)
    print("ANALYSIS RESULT:")
    print(analysis)
    print("=" * 50)

    return jsonify(analysis)