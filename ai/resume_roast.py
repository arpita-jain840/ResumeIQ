from ai.gemini_client import generate_response


def build_resume_roast_prompt(
    resume,
    analysis
):

    prompt = f"""
You are a brutally honest Senior Technical Recruiter with over 15 years of hiring experience.

Your job is to roast the resume in a humorous but constructive way.

==================================================
RESUME
==================================================

{resume}

==================================================
RESUME ANALYSIS
==================================================

ATS Score:
{analysis["ATS Score"]}

Detected Skills:
{", ".join(analysis["Detected Skills"])}

Missing Skills:
{", ".join(analysis["Missing Skills"])}

Resume Strength:
{analysis["Resume Strength"]}

==================================================
Rules

1. Roast the resume professionally.
2. Keep the tone funny but respectful.
3. Never insult the candidate personally.
4. Point out formatting issues.
5. Point out weak sections.
6. Point out missing skills.
7. Mention what recruiters may think.
8. End with motivational advice.
9. Keep it under 500 words.
10. Return only the roast.
"""

    return prompt


def generate_resume_roast(
    resume,
    analysis
):

    prompt = build_resume_roast_prompt(
        resume,
        analysis
    )

    return generate_response(prompt)