import json
from flask import Flask, Response, jsonify, request, session, redirect
from app import db


class predictions :

    def getAllPredictions():

        res = list(db.predictions.find({}))
        return json.dumps(res)

    def getPredictionsCount():

        res = list(db.predictions.find({}))
        return json.dumps(len(res))

    def updatePredictionApproval():

        data = request.get_json()
        id = data['_id']
        approval = data['approval']
        x = db.predictions.find_one_and_update({"_id": id}, {"$set": {"approved": approval}})
        return json.dumps(x)
        


