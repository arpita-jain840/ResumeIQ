from flask import Blueprint, request, jsonify
from ai.chatbot import generate_chat_response

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/chat", methods=["POST"])
def chat():

    data = request.json

    message = data.get("message")
    resume = data.get("resume")
    analysis = data.get("analysis")

    if not message:
        return jsonify({"error": "Message required"}), 400

    response = generate_chat_response(
        message,
        resume,
        analysis
    )

    return jsonify({
        "reply": response
    })