import os
import logging
from flask import Flask, request, jsonify
import google.generativeai as genai

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s: %(message)s'
)

app = Flask(__name__)
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
if not GOOGLE_API_KEY:
    logging.critical("GOOGLE_API_KEY is not set!")
    raise ValueError("No Google API key provided")

try:
    genai.configure(api_key=GOOGLE_API_KEY)

    model = genai.GenerativeModel(
        model_name="gemini-2.0-flash",
        system_instruction=(
            "Anda adalah seorang penasihat ekspor berpengalaman dalam komunitas ekspor. "
            "Selalu berikan respons dengan pengetahuan dan wawasan terkait perdagangan internasional, "
            "ekspor produk, analisis pasar, logistik, dokumentasi, dan regulasi. "
            "Bersikaplah membantu dan profesional. Bahkan jika pertanyaan pengguna tidak jelas, kaitkan jawaban Anda dengan topik ekspor. "
            "Jangan gunakan markdown, poin-poin, asteris, atau simbol pemformatan. "
            "Berikan respons dalam teks biasa saja. "
            "Gunakan nada sopan dan ringkas. Hindari bahasa kasual atau lelucon. "
            "Hindari menjawab pertanyaan yang tidak terkait dengan ekspor atau perdagangan internasional. Arahkan percakapan kembali ke topik yang relevan. "
            "Jika pertanyaan pengguna kurang jelas, berikan pertanyaan klarifikasi sambil tetap menawarkan informasi terkait perdagangan yang berguna. "
            "Jika konteks geografis disebutkan (misalnya, Indonesia, Uni Eropa, AS), berikan regulasi atau peluang spesifik wilayah jika memungkinkan."
        )
    )

except Exception as e:
    logging.error(f"Model Initialization Error: {e}")
    raise

@app.route("/", methods=["GET"])
def root_route():
    return jsonify({
        "status": "success",
        "message": "TradeConnect API",
        "endpoints": {
            "/ask": "POST endpoint for export advice",
            "/test": "GET health check endpoint"
        },
        "version": "1.0.0"
    }), 200

@app.route("/ask", methods=["POST"])
def ask_gemini():
    try:
        data = request.get_json()
        logging.info(f"Received request: {data}")

        if not data or "message" not in data:
            logging.warning("Invalid request: Missing 'message'")
            return jsonify({
                "status": "error",
                "message": "Missing 'message' in request"
            }), 400

        message = data["message"]

        response = model.generate_content(message)

        if not hasattr(response, 'text'):
            raise ValueError("Model did not return a text response")

        logging.info("Response generated successfully")
        return jsonify({
            "status": "success",
            "reply": response.text
        }), 200

    except Exception as e:
        logging.error(f"Error processing request: {e}", exc_info=True)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route("/test", methods=["GET"])
def test_route():
    return jsonify({
        "status": "success",
        "message": "Application is live",
        "deployment": "Railway"
    }), 200

@app.errorhandler(404)
def not_found_error(error):
    return jsonify({
        "status": "error",
        "message": "Endpoint not found",
        "available_endpoints": {
            "/": "Root information",
            "/ask": "POST export advice",
            "/test": "GET health check"
        }
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "status": "error",
        "message": "Internal server error"
    }), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)