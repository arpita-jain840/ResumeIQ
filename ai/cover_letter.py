from ai.gemini_client import generate_response

# ✅ UPDATED FUNCTION (TYPE ADD KIYA)
def build_cover_letter_prompt(
    resume,
    analysis,
    job_description,
    type="cover"
):

    if type == "email":
        instruction = """
Write a professional job application email.
Keep it short.
Include subject line.
"""

    elif type == "dm":
        instruction = """
Write a LinkedIn DM.
Very short and engaging.
"""

    elif type == "referral":
        instruction = """
Write a referral request message.
Polite and clear.
"""

    else:
        instruction = """
Write a professional ATS-friendly Cover Letter.
Formal tone.
"""

    prompt = f"""
You are a Senior HR Recruiter.

Resume:
{resume}

ATS Score:
{analysis["ATS Score"]}

Skills:
{", ".join(analysis["Detected Skills"])}

Job Description:
{job_description}

==============================

{instruction}

Rules:
- Do NOT invent experience
- Use only resume data
- Match with job description
- Return only final output
"""

    return prompt


# ✅ UPDATED GENERATOR
def generate_cover_letter(
    resume,
    analysis,
    job_description,
    type="cover"
):

    prompt = build_cover_letter_prompt(
        resume,
        analysis,
        job_description,
        type
    )
 
    return generate_response(prompt)