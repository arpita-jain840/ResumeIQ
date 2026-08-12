import re

def clean_text(text):

    # Lowercase
    text = text.lower()

    # Remove URLs
    text = re.sub(r'https?://\S+|www\.\S+', ' ', text)

    # Remove Emails
    text = re.sub(r'\S+@\S+', ' ', text)

    # Remove Phone Numbers
    text = re.sub(r'\+?\d[\d\s()-]{8,}\d', ' ', text)

    # Remove Special Characters & Numbers
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)

    return text