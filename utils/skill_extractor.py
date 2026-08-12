import os
import ast
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def extract_skills(text):
    prompt = f"""
    Extract all professional and technical skills from the following resume.

    Rules:
    - Return ONLY a Python list
    - No explanation
    - Include all domains (IT, SAP, Finance, etc.)

    Resume:
    {text}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0
        )

        content = response.choices[0].message.content

        # convert string → list safely
        skills = ast.literal_eval(content)

        # remove duplicates
        return list(set([s.lower() for s in skills]))

    except Exception as e:
        print("AI Skill Extraction Error:", e)
        return []