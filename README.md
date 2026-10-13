# 🔐 Password Strength Checker

A Python-based Password Strength Checker web application built with **Flask, HTML, CSS, and JavaScript**. It evaluates password strength using common password detection, length checks, uppercase and lowercase letters, numbers, and special characters.

The application provides a visual strength meter and recommendations to help users understand and improve their password security.

## 🚀 Features

- **Password Strength Analysis** — Classifies passwords as Weak, Medium, Strong, or Very Strong.
- **Live Strength Meter** — Displays a visual indicator of password strength as you type.
- **Password Visibility Toggle** — Show or hide the password while entering it.
- **Common Password Detection** — Identifies selected common and easily guessed passwords.
- **Character Validation** — Checks length, uppercase letters, lowercase letters, digits, and special characters.
- **Security Recommendations** — Provides suggestions for improving password strength.
- **Responsive Interface** — Dark-themed interface designed for desktop and mobile screens.
- **Python Backend** — Uses Flask to process password analysis requests.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Python | Password analysis logic |
| Flask | Backend web framework |
| HTML5 | Web page structure |
| CSS3 | Styling and responsive design |
| JavaScript | Live strength meter and user interactions |
| Regular Expressions | Character validation |

## 📁 Project Structure

```text
Password-strenght-checker/
│
├── app.py
├── password_checker.py
├── requirements.txt
├── README.md
├── .gitignore
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── venv/
```

The `venv/` directory is created locally and should not be committed to GitHub.

## ⚙️ Installation and Setup

### Prerequisites

- Python 3.10 or later
- Git
- A web browser

### 1. Clone the repository

```bash
git clone https://github.com/RishiRz/password-strength-checker.git
```


### 2. Navigate to the project directory

```bash
cd password-strength-checker
```

### 3. Create a virtual environment

**Windows PowerShell:**

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Windows Command Prompt:**

```cmd
python -m venv venv
venv\Scripts\activate.bat
```

### 4. Install dependencies

```bash
python -m pip install -r requirements.txt
```

If `requirements.txt` does not exist yet, create it with the following content:

```text
Flask
```

### 5. Run the application

```bash
python app.py
```

### 6. Open the application

Visit the following address in your browser:

```text
http://127.0.0.1:5000
```

## 🧪 How to Use

1. Open the Password Strength Checker in your browser.
2. Enter a test password in the input field.
3. Observe the live strength meter and character checks.
4. Click **Analyze Password** to request analysis from the Flask backend.
5. Review the strength score and recommendations.
6. Modify the test password to explore how the result changes.

**Example test inputs:**

| Example | Expected result |
|---|---|
| `rishi` | Weak |
| `password123` | Very Weak |
| `HelloWorld1` | Medium |
| `BlueSky!River92` | Very Strong |

These examples illustrate the current scoring rules; they are not recommended passwords for real accounts.

## 🔍 How It Works

The application evaluates a password using six basic checks:

1. At least 8 characters.
2. At least 12 characters.
3. Contains lowercase letters.
4. Contains uppercase letters.
5. Contains numbers.
6. Contains special characters.

Each satisfied check contributes one point, for a maximum score of 6. A list of selected common passwords is also checked.

The Python backend returns the score, strength classification, and improvement suggestions as JSON. JavaScript updates the interface using these results.

## 🔒 Security Considerations

- This is an educational project, not a complete password-security auditing solution.
- The current scoring system is a simple heuristic and does not accurately measure password guessability.
- A password can meet every character requirement and still be predictable.
- Prefer long, unique passwords or passphrases and use a password manager.
- Do not enter real or reused passwords into this demonstration application.
- The application is designed not to intentionally store passwords, but submitted passwords are sent to the local Flask backend for analysis.
- Flask debug mode is intended only for local development and must be disabled before production deployment.
- Do not expose the development server directly to the public internet.

## 🔮 Future Improvements

- Integrate a more advanced password-strength estimator such as [zxcvbn](https://github.com/dropbox/zxcvbn).
- Detect predictable sequences and repeated patterns.
- Improve password feedback and accessibility.
- Add automated unit tests.
- Add secure deployment configuration.
- Improve privacy protections and input handling.

## 🎯 Learning Outcomes

This project demonstrates practical experience with:

- Python functions and dictionaries.
- Regular expressions and conditional logic.
- Flask routes and JSON APIs.
- Frontend and backend integration.
- JavaScript DOM manipulation and asynchronous requests.
- Basic password-security principles.
- Git and GitHub version control.

## 👨‍💻 Author

**RishiRZ**

GitHub: [RishiRz](https://github.com/RishiRz)

## 📜 License

This project is available for educational and learning purposes. You may add an MIT License if you want to allow others to reuse and modify the code under its terms.
