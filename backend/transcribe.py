from flask import Flask, request, jsonify
from vosk import Model, KaldiRecognizer
import wave
import json

app = Flask(__name__)

# Load the Vosk model once
model = Model("model")

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    wf = wave.open(file, "rb")

    if wf.getnchannels() != 1 or wf.getsampwidth() != 2 or wf.getframerate() not in [8000, 16000, 32000, 44100, 48000]:
        return jsonify({"error": "Audio file must be WAV format mono PCM."}), 400

    rec = KaldiRecognizer(model, wf.getframerate())
    results = []

    while True:
        data = wf.readframes(4000)
        if len(data) == 0:
            break
        if rec.AcceptWaveform(data):
            res = json.loads(rec.Result())
            results.append(res.get('text', ''))

    res = json.loads(rec.FinalResult())
    results.append(res.get('text', ''))

    full_text = ' '.join(results)

    return jsonify({"text": full_text})

if __name__ == '__main__':
    app.run(port=5000)
