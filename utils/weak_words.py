import re

WEAK_WORDS = [
    "hardworking",
    "responsible",
    "good",
    "nice",
    "worked",
    "helped",
    "tried",
    "knowledge",
    "participated",
    "involved"
]


def detect_weak_words(resume):

    resume = resume.lower()

    found = []

    for word in WEAK_WORDS:

        pattern = r"\b" + re.escape(word) + r"\b"

        if re.search(pattern, resume):
            found.append(word)

    return found