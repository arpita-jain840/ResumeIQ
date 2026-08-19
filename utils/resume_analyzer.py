from utils.ats_score import calculate_ats_score
from utils.weak_words import detect_weak_words
from utils.missing_skills import find_missing_skills

from models.skill_extractor import (
    load_skills,
    extract_skills
)


def analyze_resume(resume_text):

    analysis = {}

    # -----------------------------
    # ATS
    # -----------------------------
    ats_score, ats_report = calculate_ats_score(resume_text)

    analysis["ATS Score"] = ats_score
    analysis["ATS Report"] = ats_report

    # -----------------------------
    # Skills
    # -----------------------------
    all_skills = load_skills("skills/data_science.txt")
    found_skills = extract_skills(
        resume_text,
        all_skills
    )

    analysis["Detected Skills"] = found_skills

    # -----------------------------
    # Missing Skills
    # -----------------------------
    missing = find_missing_skills(resume_text)

    analysis["Missing Skills"] = missing

    # -----------------------------
    # Weak Words
    # -----------------------------
    weak = detect_weak_words(resume_text)

    analysis["Weak Words"] = weak

    # -----------------------------
    # Resume Strength
    # -----------------------------
    strength = 0

    # ATS (20 Marks)
    strength += analysis["ATS Score"]

    # Skills (30 Marks)
    skill_count = len(found_skills)

    if skill_count >= 10:
        strength += 30
    elif skill_count >= 7:
        strength += 25
    elif skill_count >= 5:
        strength += 20
    elif skill_count >= 3:
        strength += 10
    else:
        strength += 5

    # Missing Skills (20 Marks)
    if len(missing) < 5:
        strength += 20
    elif len(missing) < 10:
        strength += 15
    else:
        strength += 5

    # Weak Words (15 Marks)
    if len(weak) == 0:
        strength += 15
    elif len(weak) <= 3:
        strength += 10
    else:
        strength += 5

    analysis["Resume Strength"] = min(strength, 100)
# -----------------------------
# Suggestions
# -----------------------------

    suggestions = []

    # ATS Suggestions
    if analysis["ATS Report"]["Email"] == "❌ Missing":
        suggestions.append("Add a professional email address.")

    if analysis["ATS Report"]["Phone"] == "❌ Missing":
        suggestions.append("Add your phone number.")

    if analysis["ATS Report"]["LinkedIn"] == "❌ Missing":
        suggestions.append("Add your LinkedIn profile.")

    if analysis["ATS Report"]["GitHub"] == "❌ Missing":
        suggestions.append("Add your GitHub profile.")

    # Missing Skills
    if len(missing) > 0:
        suggestions.append(
            "Learn or include these important skills: "
            + ", ".join(missing[:5])
        )

    # Weak Words
    if len(weak) > 0:
        suggestions.append(
            "Replace weak words with strong action verbs."
        )

    # Resume Strength
    if analysis["Resume Strength"] < 40:
        suggestions.append(
            "Your resume needs significant improvement."
        )

    elif analysis["Resume Strength"] < 70:
        suggestions.append(
            "Your resume is average. Improve projects and skills."
        )

    else:
        suggestions.append(
            "Your resume is strong."
        )

    analysis["Suggestions"] = suggestions
        
    # -----------------------------
    # Recruiter View
    # -----------------------------

    recruiter = {}

    strengths = []
    weaknesses = []

    # Strengths
    if len(found_skills) >= 5:
        strengths.append("Good technical skill coverage.")

    if analysis["Resume Strength"] >= 70:
        strengths.append("Strong overall resume.")

    if analysis["ATS Report"]["LinkedIn"] == "✅ Found":
        strengths.append("LinkedIn profile available.")

    if analysis["ATS Report"]["GitHub"] == "✅ Found":
        strengths.append("GitHub profile available.")

    # Weaknesses
    if len(found_skills) < 5:
        weaknesses.append("Very few technical skills detected.")

    if len(missing) > 10:
        weaknesses.append("Many important industry skills are missing.")

    if analysis["ATS Report"]["LinkedIn"] == "❌ Missing":
        weaknesses.append("LinkedIn profile is missing.")

    if analysis["ATS Report"]["GitHub"] == "❌ Missing":
        weaknesses.append("GitHub profile is missing.")

    # Recommendation
    if analysis["Resume Strength"] >= 75:
        recommendation = "Strong Hire"

    elif analysis["Resume Strength"] >= 50:
        recommendation = "Maybe"

    else:
        recommendation = "Needs Improvement"

    recruiter["Recommendation"] = recommendation
    recruiter["Strengths"] = strengths
    recruiter["Weaknesses"] = weaknesses

    analysis["Recruiter View"] = recruiter
    
    return analysis
