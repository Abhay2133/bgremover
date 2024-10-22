import os
from flask import Flask, render_template, request, jsonify
from rembg import remove
from PIL import Image
from io import BytesIO
import base64

app = Flask(__name__)

# Upload folder
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Home route - Upload form
@app.route('/')
def index():
    return render_template('index.html')

# Upload and process image route (AJAX)
@app.route('/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        # Save the uploaded image
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)

        # Open the image and process it with rembg
        input_image = Image.open(file_path)
        output_image = remove(input_image)

        # Save the processed image to a BytesIO object
        img_io = BytesIO()
        output_image.save(img_io, 'PNG', quality=100)
        img_io.seek(0)

        # Convert the image to base64 so it can be displayed on the frontend
        img_data = base64.b64encode(img_io.getvalue()).decode('utf-8')
        img_src = f"data:image/png;base64,{img_data}"

        # Send the image src to the frontend as a response
        return jsonify({'image_src': img_src})

if __name__ == '__main__':
    app.run(debug=True)
