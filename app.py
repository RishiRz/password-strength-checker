from flask import Flask, render_template, request, jsonify
from password_checker import check_password

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/check-password", methods=["POST"])
def check():
    data = request.get_json(silent = True) or {}
    password = data.get("password", "")

    if not isinstance(password, str) or not password:
        return jsonify({
            "error": "Please enter a password."
        }), 400

    if len(password) > 1024:
        return jsonify({
            "error": "Password is too long to analyze."
        }), 400

    result = check_password(password)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)