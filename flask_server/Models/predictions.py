import json
from bson import json_util
from flask import request
from app import db


class predictions:

    def getAllPredictions():

        res = list(db.predictions.find({}))
        return json.dumps(res, default=json_util.default)

    def updatePredictionApproval():

        data = request.get_json()
        id = data['_id']
        approval = data['approval']
        x = db.predictions.find_one_and_update(
            {"_id": id}, {"$set": {"approved": approval}})
        return json.dumps(x)

