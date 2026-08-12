def build_recruiter_prompt(resume_text, analysis):

    prompt = f"""
You are a Senior Technical Recruiter with more than 15 years of hiring experience.

Analyze the following resume professionally.

Resume Information
------------------

ATS Score:
{analysis['ATS Score']}

Detected Skills:
{", ".join(analysis['Detected Skills'])}

Missing Skills:
{", ".join(analysis['Missing Skills'])}

Weak Words:
{", ".join(analysis['Weak Words']) if analysis['Weak Words'] else "None"}

Resume Strength:
{analysis['Resume Strength']}/100


Resume:

{resume_text}


Instructions:

1. Give an Overall Assessment.
2. Mention the candidate's strengths.
3. Mention weaknesses.
4. Suggest improvements.
5. Give a recruiter recommendation.
6. Give Hiring Confidence out of 100.

Keep the response professional, constructive, and concise.
"""

    return prompt