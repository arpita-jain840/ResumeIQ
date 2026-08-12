import os
import re

def load_skills(file_path):

    with open(file_path, "r", encoding="utf-8") as file:
        skills = file.read().splitlines()

    return [skill.lower() for skill in skills]


def extract_skills(resume, skills):

    resume = resume.lower()

    found_skills = []

    for skill in skills:

        pattern = r"\b" + re.escape(skill) + r"\b"

        if re.search(pattern, resume):
            found_skills.append(skill)

    return sorted(list(set(found_skills)))