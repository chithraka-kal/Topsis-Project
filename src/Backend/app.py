from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Flask server is running!"

@app.route("/topsis", methods=["POST"])
def topsis():
    data = request.json
    matrix = np.array(data["ratings"], dtype=float)
    weights = np.array(data["weights"], dtype=float)
    impacts = data["impacts"]
    
    norm_matrix = matrix / np.sqrt((matrix**2).sum(axis=0))
    weighted_matrix = norm_matrix * weights

    ideal_best = np.max(weighted_matrix, axis=0) if '+' in impacts else np.min(weighted_matrix, axis=0)
    ideal_worst = np.min(weighted_matrix, axis=0) if '+' in impacts else np.max(weighted_matrix, axis=0)

    # Adjust ideal best/worst based on impacts
    for i, impact in enumerate(impacts):
        if impact == '-':
            ideal_best[i], ideal_worst[i] = ideal_worst[i], ideal_best[i]

    dist_best = np.sqrt(((weighted_matrix - ideal_best)**2).sum(axis=1))
    dist_worst = np.sqrt(((weighted_matrix - ideal_worst)**2).sum(axis=1))

    scores = dist_worst / (dist_best + dist_worst)
    rankings = scores.argsort()[::-1].argsort() + 1  # 1-based ranking

    return jsonify({
        "alternatives": [f"A{i+1}" for i in range(len(matrix))],
        "scores": scores.round(4).tolist(),
        "rankings": rankings.tolist()
    })

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

