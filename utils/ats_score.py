import re

def calculate_ats_score(resume_text):

    score = 0
    report = {}

    # ----------------------------
    # Email Check
    # ----------------------------
    email = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        resume_text
    )

    if email:
        score += 5
        report["Email"] = "✅ Found"
    else:
        report["Email"] = "❌ Missing"

    # ----------------------------
    # Phone Check
    # ----------------------------
    phone = re.search(r"\b\d{10}\b", resume_text)

    if phone:
        score += 5
        report["Phone"] = "✅ Found"
    else:
        report["Phone"] = "❌ Missing"

    # ----------------------------
    # LinkedIn
    # ----------------------------
    if "linkedin.com" in resume_text.lower():
        score += 5
        report["LinkedIn"] = "✅ Found"
    else:
        report["LinkedIn"] = "❌ Missing"

    # ----------------------------
    # GitHub
    # ----------------------------
    if "github.com" in resume_text.lower():
        score += 5
        report["GitHub"] = "✅ Found"
    else:
        report["GitHub"] = "❌ Missing"

    return score, report