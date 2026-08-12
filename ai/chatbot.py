from ai.gemini_client import generate_response

def build_chat_prompt(message, resume, analysis):

    prompt = f"""
You are an AI Career Assistant.

You help users with:
- Resume improvement
- Cover Letters
- Job applications
- Interview prep
- LinkedIn messages

==================================

User Resume:
{resume}

ATS Score:
{analysis.get("ATS Score")}

Skills:
{", ".join(analysis.get("Detected Skills", []))}

==================================

User Message:
{message}

==================================

Instructions:

1. Be helpful and professional
2. Give accurate career advice
3. Do NOT hallucinate
4. Use resume context when needed
5. Keep answers clear and structured
6. If user asks to generate:
   - Cover letter → generate it
   - Email → generate it
   - DM → generate it

7. If unclear → ask follow-up

Return only the answer.
"""

    return prompt


def generate_chat_response(message, resume, analysis):

    prompt = build_chat_prompt(
        message,
        resume,
        analysis
    )

    return generate_response(prompt)