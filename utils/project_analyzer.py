import re

TECH_SKILLS = [
    "python", "java", "c++", "javascript", "react", "node",
    "flask", "django", "sql", "mongodb", "mysql",
    "machine learning", "deep learning",
    "opencv", "tensorflow", "pytorch",
    "html", "css", "git", "github"
]

ACTION_WORDS = [
    "developed",
    "built",
    "designed",
    "implemented",
    "created",
    "deployed",
    "trained"
]


def analyze_projects(resume):

    resume = resume.lower()

    report = {}

    # GitHub
    report["GitHub"] = "github.com" in resume

    # Live Demo
    report["Live Demo"] = (
        "vercel.app" in resume
        or "netlify.app" in resume
        or "render.com" in resume
    )

    # Tech Stack
    tech_found = []

    for tech in TECH_SKILLS:
        if tech in resume:
            tech_found.append(tech)

    report["Tech Stack"] = tech_found

    # Action Words
    actions = []

    for word in ACTION_WORDS:
        if word in resume:
            actions.append(word)

    report["Action Words"] = actions

    return report