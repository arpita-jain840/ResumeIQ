import os
from dotenv import load_dotenv
from google import genai

# --------------------------------------------------
# Load Environment Variables
# --------------------------------------------------

load_dotenv()

# --------------------------------------------------
# Configure Gemini API
# --------------------------------------------------

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key) if api_key else None

# --------------------------------------------------
# Load Gemini Model
# --------------------------------------------------

model = "gemini-1.5-flash"


def _extract_response_text(response):
    if response is None:
        return ""

    text = getattr(response, "text", None)

    if isinstance(text, str) and text.strip():
        return text.strip()

    try:
        candidates = getattr(response, "candidates", None) or []

        for candidate in candidates:
            content = getattr(candidate, "content", None)
            parts = getattr(content, "parts", None) or []

            for part in parts:
                part_text = getattr(part, "text", None)

                if isinstance(part_text, str) and part_text.strip():
                    return part_text.strip()

    except Exception:
        return ""

    return ""


# --------------------------------------------------
# Generate AI Response
# --------------------------------------------------

def generate_response(prompt):
    if not prompt or not isinstance(prompt, str) or not prompt.strip():
        return "Unable to generate a rewrite because the prompt was empty."

    if client is None:
        print("Gemini Error: Missing GEMINI_API_KEY")
        raise RuntimeError("Gemini API key is not configured")

    try:
        response = client.models.generate_content(
            model=model,
            contents=prompt,
        )

        extracted_text = _extract_response_text(response)

        if extracted_text:
            return extracted_text

        raise RuntimeError("Gemini returned an empty response")

    except Exception as e:
        print("Gemini Error:", e)
        raise RuntimeError("Gemini request failed") from e