import re

def analyze_structure(resume):

    resume = resume.lower()

    report = {}

    sections = {
        "Summary": [
            "summary",
            "professional summary",
            "objective",
            "profile"
        ],

        "Skills": [
            "skills",
            "technical skills",
            "core competencies"
        ],

        "Projects": [
            "projects",
            "academic projects",
            "personal projects"
        ],

        "Experience": [
            "experience",
            "work experience",
            "employment"
        ],

        "Education": [
            "education",
            "qualification",
            "academic qualification"
        ],

        "Certifications": [
            "certifications",
            "certification",
            "licenses"
        ]
    }

    for section, keywords in sections.items():

        found = False

        for word in keywords:

            if re.search(r"\b" + re.escape(word) + r"\b", resume):
                found = True
                break

        report[section] = found

    return report