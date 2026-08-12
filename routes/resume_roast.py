from flask import Blueprint
from flask import request
from flask import jsonify

import os

from utils.pdf_parser import extract_text_from_pdf
from utils.resume_analyzer import analyze_resume
from ai.resume_roast import generate_resume_roast

roast_bp = Blueprint(
    "roast",
    __name__
)

UPLOAD_FOLDER = "uploads"


@roast_bp.route("/resume-roast", methods=["POST"])
def roast():

    if "resume" not in request.files:
        return jsonify(
            {
                "error": "No resume uploaded."
            }
        ), 400

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

    resume_text = extract_text_from_pdf(
        filepath
    )

    analysis = analyze_resume(
        resume_text
    )

    roast = generate_resume_roast(
        resume_text,
        analysis
    )

    return jsonify(
        {
            "resume_roast": roast
        }
    )