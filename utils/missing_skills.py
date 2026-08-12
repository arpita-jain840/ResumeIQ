from openai import OpenAI
import os, ast

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def find_missing_skills(resume_text):

    prompt = f"""
    Based on this resume, suggest important missing skills.

    Return ONLY a Python list.
    No explanation.

    Resume:
    {resume_text}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0
        )

        content = response.choices[0].message.content
        return ast.literal_eval(content)

    except Exception as e:
        print("Missing Skills Error:", e)
        return []