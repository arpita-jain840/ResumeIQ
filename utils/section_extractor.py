SECTION_HEADERS = {

    "summary": [
        "summary",
        "professional summary",
        "profile",
        "objective"
    ],

    "skills": [
        "skills",
        "technical skills",
        "core competencies",
        "key skills"
    ],

    "experience": [
        "experience",
        "work experience",
        "employment",
        "professional experience"
    ],

    "projects": [
        "projects",
        "academic projects",
        "personal projects"
    ],

    "education": [
        "education",
        "qualification",
        "academic qualification"
    ],

    "certifications": [
        "certifications",
        "certification",
        "licenses"
    ]
}

import re
def extract_sections(text):
    sections = {}
    text = text.lower()
    