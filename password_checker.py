import re


COMMON_PASSWORDS = {
    "password",
    "password123",
    "123456",
    "12345678",
    "qwerty",
    "admin",
    "letmein",
    "welcome"
}

def check_password(password):
    score = 0
    suggestions =[]

    #check for common password first
    if password.lower() in COMMON_PASSWORDS:
        return{
            "score" : 0,
            "strength" : "very weak",
            "suggestions" : [
                "Avoid common and easily guessed passwords."
            ]
        }

    # Check password length
    if len(password) >= 8:
        score += 1
    else:
        suggestions.append("Use atleast 8 characters.")

    if len(password) >= 12:
        score += 1
    else:
        suggestions.append("Aim for 12 or more characters.")

    # Check lowercase letters
    if re.search(r"[a-z]", password):
        score += 1
    else:
        suggestions.append("Include lowercase letters.")

    # Ckeck uppercase letters
    if re.search(r"[A-Z]", password):
        score += 1
    else:
        suggestions.append("Use uppercase letters.")

    # Check digits
    if re.search(r"\d", password):
        score += 1
    else:
        suggestions.append("Include Numbers.")

    # Check for special characters
    if re.search(r"[^a-zA-Z0-9]", password):
        score += 1
    else:
        suggestions.append("Include Special Characters.")

    # Determine strength
    if len(password) < 8 or score <= 2 :
        strength = "weak"
    elif score <= 3:
        strength = "Medium"
    elif score <= 4:
        strength = "Strong"
    else:
        strength = "Very Strong"

    return {
        "score" : score,
        "strength" : strength,
        "suggestions" : suggestions
    }

# def main():
#     print("=" * 40)
#     print("       PASSWORD STRENGTH CHECKER")
#     print("=" * 40)

#     password = input("Enter a password to check: ")

#     if not password:
#         print("Error: Password cann't be empty.")
#         return

#     result = check_password(password)

#     print("\nPassword Strength:", result["strength"])
#     print("Score:", result["score"], "/ 6")

#     if result["suggestions"]:
#         print("\nSuggestions:")
#         for suggestions in result["suggestions"]:
#             print("-", suggestions)
#     else:
#         print("\nYour password meets all the checks!")


#     print("\nNote: This is a basic educational password checker. It does not guaremtee that a password is secure.")
    

