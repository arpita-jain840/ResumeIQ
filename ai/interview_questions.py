def build_interview_prompt(
    resume,
    analysis,
    job_description
):

    prompt = f"""
You are a Senior Technical Interviewer with over 15 years of experience interviewing candidates for internships and full-time roles.

Your task is to analyze the candidate's resume and the provided Job Description to generate realistic interview preparation.

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

Generate interview preparation in the following format.

1. Overall Difficulty
(Easy / Medium / Hard)

2. Questions Based on the Candidate's Resume
(Only ask about skills, projects, and technologies explicitly mentioned in the resume.)

3. Questions Based on Matching Job Skills
(Ask questions only on skills that are present in BOTH the resume and the job description.)

4. Preparation Questions for Missing Skills
(Generate questions ONLY for skills required in the job description but missing from the resume. Clearly mention that these are preparation topics, not claimed skills.)

5. HR / Behavioral Questions

6. Topics to Revise Before Interview

7. Common Mistakes to Avoid

8. Interview Tips

Important Rules:

- Do NOT mark a skill as missing if it already exists in the resume.
- Do NOT contradict the resume analysis.
- Separate resume-based questions from preparation questions.
- Keep the response professional and recruiter-oriented.
- Do not generate answers.
Section 1:
Questions based ONLY on the candidate's existing resume and projects.

Section 2:
Questions the candidate should prepare because these skills are required in the Job Description but are currently missing from the resume.

Clearly separate both sections."""

    return prompt