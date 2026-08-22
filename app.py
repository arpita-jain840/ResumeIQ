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
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_FOLDER = os.path.join(BASE_DIR, "static")
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(STATIC_FOLDER, exist_ok=True)

app = Flask(__name__, static_folder=STATIC_FOLDER, static_url_path="")

# ✅ FILE SIZE LIMIT
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024

# ✅ CORS: Enable across all origins, methods, and headers for localhost, LAN, and deployed envs
CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials", "Accept"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# ✅ REGISTER ROUTES
app.register_blueprint(analyze_bp)
app.register_blueprint(rewrite_bp)
app.register_blueprint(cover_letter_bp)
app.register_blueprint(roast_bp)
app.register_blueprint(chat_bp)

# ✅ SERVE REACT BUILD (SPA)
@app.route("/")
def serve():
    index_file = os.path.join(app.static_folder, "index.html")
    if os.path.exists(index_file):
        return send_from_directory(app.static_folder, "index.html")
    return "ResumeIQ Backend API is running."

# ✅ SPA CATCH-ALL ROUTE (for client-side routing)
@app.route("/<path:path>")
def static_proxy(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path) and not os.path.isdir(file_path):
        return send_from_directory(app.static_folder, path)
    index_file = os.path.join(app.static_folder, "index.html")
    if os.path.exists(index_file):
        return send_from_directory(app.static_folder, "index.html")
    return "Not Found", 404

# ✅ GLOBAL UPLOADS / DOWNLOAD ROUTE
@app.route('/uploads/<path:filename>')
def serve_uploads(filename):
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)

# ✅ RUN
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
   