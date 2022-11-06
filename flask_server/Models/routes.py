from flask import Flask
from flask_cors import cross_origin
from app import app
from Models.Tuberculosis.models import Tuberculosis
from Models.Covid.models import Covid_Model
from Models.Kidney.models import Kidney_Model
from Models.predictions import predictions


@app.route('/predict/tuberculosis', methods=['POST'])
@cross_origin()
def tuberculosis_predict():
 return Tuberculosis().predict()

@app.route('/predict/covid19', methods=['POST'])
@cross_origin()
def covid_predict():
 return Covid_Model().predict()

@app.route('/predict/Kidney_classification', methods=['POST'])
@cross_origin()
def kidney_predict():
 return Kidney_Model().predict()

@app.route('/predict/getAll_predictions', methods=['POST'])
@cross_origin()
def get_all_predictions():
    return predictions.getAllPredictions()

@app.route('/predict/get_predictions_count', methods=['GET'])
@cross_origin()
def get_predictions_count():
    return predictions.getPredictionsCount()

@app.route('/predict/update_prediction_approval', methods=['PUT'])
@cross_origin()
def update_prediction_approval():
    return predictions.updatePredictionApproval()