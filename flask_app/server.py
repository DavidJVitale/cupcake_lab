from flask import Flask, request, jsonify

import frosting

app = Flask(__name__)

print("Flask App running!")

@app.route('/api/frostingoptions/', methods=['GET'])
def frosting_options():
    return jsonify(frosting.ALL_FROSTINGS)
