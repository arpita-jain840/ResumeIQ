def build_job_match_prompt(
    resume,
    analysis,
    job_description
):

    prompt = f"""
You are a Senior Technical Recruiter with over 15 years of experience hiring candidates for Software Engineering, Data Science, AI, Cloud, Marketing, Finance, HR, and Business roles.

Your task is to compare the candidate's resume with the given Job Description and provide a detailed, professional evaluation.

==================================================
CANDIDATE RESUME
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
JOB DESCRIPTION
==================================================

{job_description}

==================================================
Instructions

Provide your response in the following format only.

1. Overall Match Score (0-100%)

2. Overall Assessment

3. Matching Skills

4. Missing Skills

5. Candidate Strengths

6. Candidate Weaknesses

7. Interview Probability
(Low / Medium / High)

8. Learning Roadmap
(Explain what the candidate should learn to become a stronger fit.)

9. Final Recommendation
(Hire / Consider / Reject)

Keep the response professional, recruiter-oriented, and easy to understand.
"""

    return prompt