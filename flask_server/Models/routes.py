from flask import Flask
from flask_cors import cross_origin
from app import app
from Models.Tuberculosis.models import Tuberculosis
from Models.Covid.models import Covid_Model
from Models.Kidney.models import Kidney_Model
from Models.predictions import predictions
from Models.queries import queries


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

@app.route('/query/get_predictions_count', methods=['GET'])
@cross_origin()
def get_predictions_count():
    return queries.getPredictionsCount()

@app.route('/predict/update_prediction_approval', methods=['PUT'])
@cross_origin()
def update_prediction_approval():
    return predictions.updatePredictionApproval()

@app.route('/query/get_approved_predictions_count', methods=['GET'])
@cross_origin()
def get_approved_predictions_count():
    return queries.getApprovedPredictionsCount()

@app.route('/query/get_unapproved_predictions_count', methods=['GET'])
@cross_origin()
def get_unapproved_predictions_count():
    return queries.getUnApprovedPredictionsCount()

@app.route('/query/predictions_count_per_desease', methods=['GET'])
@cross_origin()
def predictions_count_per_desease():
    return queries.predictionsCountPerDesease()

@app.route('/query/prediction_count_per_kidney_desease', methods=['GET'])
@cross_origin()
def prediction_count_per_kidney_desease():
    return queries.predictionCountPerKidneyDesease()

@app.route('/query/symptoms_count', methods=['GET'])
@cross_origin()
def distinctSymptomsCount():
    return queries.distinctSymptomsCount()

@app.route('/query/symptoms_count_per_kidney_result', methods=['GET'])
@cross_origin()
def distinctSymptomsCountperKidneyResult():
    return queries.distinctSymptomsCountperKidneyResult()

@app.route('/query/approval_count_per_desease', methods=['GET'])
@cross_origin()
def approvalCountPerDesease():
    return queries.approvalCountPerDesease()

@app.route('/query/predictions_per_month', methods=['GET'])
@cross_origin()
def predictionsPerMonth():
    return queries.predictionsCountPerMonth()
