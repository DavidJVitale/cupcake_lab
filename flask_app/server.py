#Author: David Vitale

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

import mockdb

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/frostings/', methods=['GET'])
@cross_origin()
def frostings():
    return jsonify(mockdb.ALL_FROSTINGS)

@app.route('/api/frostingoptions/vanillabodies', methods=['GET'])
@cross_origin()
def frostings_for_vanilla_bodies():
    return jsonify(mockdb.frostings_for(mockdb.VANILLA_BODY))

@app.route('/api/frostingoptions/chocolatebodies', methods=['GET'])
@cross_origin()
def frostings_for_chocolate_bodies():
    return jsonify(mockdb.frostings_for(mockdb.CHOCOLATE_BODY))

@app.route('/api/frostingoptions/carrotbodies', methods=['GET'])
@cross_origin()
def frostings_for_carrot_bodies():
    return jsonify(mockdb.frostings_for(mockdb.CARROT_BODY))
