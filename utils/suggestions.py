def generate_suggestions(report, missing_skills, weak_words):

    suggestions = []

    # Missing Sections
    if not report["Projects"]:
        suggestions.append("Add a Projects section.")

    if not report["Skills"]:
        suggestions.append("Add a dedicated Skills section.")

    if not report["Education"]:
        suggestions.append("Education section is missing.")

    if not report["Experience"]:
        suggestions.append("Work Experience section is missing.")

    # Missing Skills
    if len(missing_skills) > 0:
        suggestions.append(
            f"Add important skills like: {', '.join(missing_skills[:5])}"
        )

    # Weak Words
    if len(weak_words) > 0:
        suggestions.append(
            "Replace weak words with strong action verbs."
        )

    return suggestions