import os
import re
from dotenv import load_dotenv
from google import genai

# --------------------------------------------------
# Load Environment Variables
# --------------------------------------------------
load_dotenv()

# --------------------------------------------------
# Supported Candidate Models (with fallback)
# --------------------------------------------------
DEFAULT_MODELS = [
    "gemini-3.5-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.6-flash",
    "gemini-3-flash-preview",
]


def _get_client():
    api_key = (os.getenv("GEMINI_API_KEY") or "").strip()
    if not api_key:
        return None
    return genai.Client(api_key=api_key)


def _clean_markdown_code_blocks(text: str) -> str:
    if not text:
        return ""
    text = text.strip()
    # If the entire text is wrapped in ```markdown ... ``` or ``` ... ```, unwrap it
    match = re.match(r"^```(?:markdown|text|txt)?\s*\n([\s\S]*?)\n```$", text, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    return text


def _extract_response_text(response):
    if response is None:
        return ""

    text = getattr(response, "text", None)
    if isinstance(text, str) and text.strip():
        return _clean_markdown_code_blocks(text)

    try:
        candidates = getattr(response, "candidates", None) or []
        for candidate in candidates:
            content = getattr(candidate, "content", None)
            parts = getattr(content, "parts", None) or []
            for part in parts:
                part_text = getattr(part, "text", None)
                if isinstance(part_text, str) and part_text.strip():
                    return _clean_markdown_code_blocks(part_text)
    except Exception:
        return ""

    return ""


# --------------------------------------------------
# Generate AI Response
# --------------------------------------------------
def generate_response(prompt):
    if not prompt or not isinstance(prompt, str) or not prompt.strip():
        return "Unable to generate a response because the prompt was empty."

    client = _get_client()
    if client is None:
        print("Gemini Error: Missing GEMINI_API_KEY")
        raise RuntimeError("Gemini API key is not configured")

    custom_model = (os.getenv("GEMINI_MODEL") or "").strip()
    candidate_models = []
    if custom_model:
        candidate_models.append(custom_model)
    for m in DEFAULT_MODELS:
        if m not in candidate_models:
            candidate_models.append(m)

    last_error = None
    for model_name in candidate_models:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
            )

            extracted_text = _extract_response_text(response)
            if extracted_text:
                return extracted_text

        except Exception as e:
            print(f"Gemini model '{model_name}' failed: {e}")
            last_error = e
            continue

    if last_error:
        raise RuntimeError(f"Gemini request failed: {last_error}") from last_error

    raise RuntimeError("Gemini returned an empty response across all models")