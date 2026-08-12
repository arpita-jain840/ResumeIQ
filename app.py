from dotenv import load_dotenv
import os
from routes.chat import chat_bp

load_dotenv()

from flask import Flask, send_from_directory
from flask_cors import CORS

from routes.analyze import analyze_bp
from routes.rewrite import rewrite_bp
from routes.cover_letter import cover_letter_bp
from routes.resume_roast import roast_bp

# ✅ INIT WITH STATIC FOLDER
app = Flask(__name__, static_folder="static", static_url_path="")

# ✅ FILE SIZE LIMIT
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024

# ✅ CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# ✅ REGISTER ROUTES
app.register_blueprint(analyze_bp)
app.register_blueprint(rewrite_bp)
app.register_blueprint(cover_letter_bp)
app.register_blueprint(roast_bp)
app.register_blueprint(chat_bp)   # 🔥 NEW

# ✅ 🔥 MAIN FIX: SERVE REACT BUILD
@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

# ✅ OPTIONAL (for React routing)
@app.route("/<path:path>")
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

# ✅ DOWNLOAD ROUTE
@app.route('/downloads/<path:filename>')
def download_file(filename):
    return send_from_directory('downloads', filename, as_attachment=True)

# ✅ DEBUG HEADERS
@app.after_request
def after_request(response):
    print("\n===== RESPONSE HEADERS =====")
    print(response.headers)
    print("============================\n")
    return response

# ✅ RUN
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
   