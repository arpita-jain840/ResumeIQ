import re

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


def parse_sections(text):

    text = text.lower()

    sections = {}

    for section, headers in SECTION_HEADERS.items():

        sections[section] = ""

        for header in headers:

            pattern = rf"{header}(.*?)(?=summary|skills|experience|projects|education|certifications|$)"

            match = re.search(pattern, text, re.DOTALL)

            if match:
                sections[section] = match.group(1).strip()
                break

    return sections