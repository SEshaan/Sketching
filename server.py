import os
from flask import Flask, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Load the Gemini API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing. Check your .env file.")

genai.configure(api_key=GEMINI_API_KEY)

@app.route('/analyze-image', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image_file = request.files['image']
    image_bytes = image_file.read()  # Read image as bytes

    # Use a valid model
    model = genai.GenerativeModel("gemini-1.5-pro")

    # Construct the input correctly
    response = model.generate_content([
        {"text": "Describe this image simply"},  # Text prompt
        {"inline_data": {"mime_type": "image/jpeg", "data": image_bytes}}  # Image data
    ])

    return jsonify({'description': response.text})

@app.route("/", methods=["GET"])
def return_page():
    return app.send_static_file("index.html")

if __name__ == '__main__':
    app.run(debug=True)
