import os
import ast
import re
from dotenv import load_dotenv

load_dotenv()


def find_missing_skills(resume_text):
    if not resume_text or not isinstance(resume_text, str) or not resume_text.strip():
        return []

    openai_key = (os.getenv("OPENAI_API_KEY") or "").strip()
    if openai_key:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=openai_key)
            prompt = f"""
Based on this resume, suggest important missing skills.
Return ONLY a Python list.
No explanation.

Resume:
{resume_text}
"""
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                temperature=0
            )
            content = response.choices[0].message.content
            parsed = ast.literal_eval(content)
            if isinstance(parsed, list):
                return parsed
        except Exception as e:
            print("OpenAI Missing Skills Error:", e)

    # Fallback to Gemini if OpenAI is unavailable
    try:
        from ai.gemini_client import generate_response
        prompt = f"""
Based on this resume, suggest 5-8 important missing technical skills for this role.
Return ONLY a Python list of strings, for example: ["Docker", "Kubernetes", "AWS"]
No markdown formatting, no explanation.

Resume:
{resume_text}
"""
        response_text = generate_response(prompt)
        # Extract list
        match = re.search(r"\[.*?\]", response_text, re.DOTALL)
        if match:
            parsed = ast.literal_eval(match.group(0))
            if isinstance(parsed, list):
                return [str(s).strip() for s in parsed if s]
    except Exception as e:
        print("Gemini Missing Skills Fallback Error:", e)

    return []