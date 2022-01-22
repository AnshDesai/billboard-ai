import os
import openai
import regex
import argparse 
from typing import List
MAX_INPUT_LENGTH = 32

def  main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input",'-i',type=str,required=True)
    args = parser.parse_args()
    user_input = args.input
    if validate_length(user_input):
        branding_result = generate_branding_snippet(user_input)
        keywords_result = generate_keywords(user_input)
    else:
        raise ValueError(f"Input length is too long. Must be under {MAX_INPUT_LENGTH}")

def validate_length(prompt:str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH

def generate_keywords(prompt:str)-> List[str]:
    openai.api_key = os.getenv("OPENAI_API_KEY")
    enriched_prompt = f"Generate related branding keywords for {prompt}:"
    response = openai.Completion.create(
        engine = "davinci-instruct-beta-v3", prompt=enriched_prompt,max_tokens=32)
    keywords_text: str = response['choices'][0]['text']
    keywords_text = keywords_text.strip()
    keywords_array = regex.split(",|\n|;|-",keywords_text)
    keywords_array = [k.lower().strip() for k in keywords_array]
    keywords_array = [k for k in keywords_array if len(k)>0]
    print(keywords_array)
    return keywords_array


def generate_branding_snippet(prompt:str)-> str:
    openai.api_key = os.getenv("OPENAI_API_KEY")
    enriched_prompt = f"Generate branding snippet for {prompt}:"
    response = openai.Completion.create(
        engine = "davinci-instruct-beta-v3", prompt=enriched_prompt,max_tokens=32)
    branding_text: str = response['choices'][0]['text']
    branding_text = branding_text.strip()
    last_char = branding_text[-1]
    if last_char not in {".","!","?"}:
        branding_text += "..."
    print(branding_text)
    return branding_text

if __name__ == "__main__":
    main()