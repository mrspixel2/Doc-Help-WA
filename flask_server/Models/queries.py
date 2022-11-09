import json
from flask import Flask, Response, jsonify, request, session, redirect
from app import db


class queries:

    def getPredictionsCount():

        res = list(db.predictions.find({}))
        return json.dumps(len(res))

    def getApprovedPredictionsCount():

        res = list(db.predictions.find({"approved": 1}))
        return json.dumps(len(res))

    def getUnApprovedPredictionsCount():

        res = list(db.predictions.find({"approved": 0}))
        return json.dumps(len(res))

    def predictionsCountPerDesease():

        res = list(db.predictions.aggregate(
            [{"$group": {"_id": "$desease", "count": {"$sum": 1}}}, {"$sort": {"count": -1}}]))
        return json.dumps(res)

    def predictionCountPerKidneyDesease():

        res = list(db.predictions.aggregate([{"$match": {"desease": "Kidney"}},
                                             {"$group": {"_id": "$result",
                                                         "count": {"$sum": 1}}},
                                             {"$sort": {"count": -1}}]))
        return json.dumps(res)

    def distinctSymptomsCount():

        res = list(db.predictions.aggregate([{"$unwind": "$symptoms"},
                                             {"$group": {"_id": "$symptoms",
                                                         "count": {"$sum": 1}}},
                                             {"$sort": {"count": -1}}]))
        return json.dumps(res)

    def distinctSymptomsCountperKidneyResult():

        res = list(db.predictions.aggregate([{"$match": {"desease": "Kidney"}},
                                             {"$unwind": "$symptoms"},
                                             {"$group": {"_id": {"result": "$result",
                                                                 "symptom": "$symptoms"},
                                                         "count": {"$sum": 1}}},
                                            {"$group": {"_id": "$_id.result",
                                                        "symptoms": {"$push": {"symptom": "$_id.symptom", "count": "$count"}}}},
                                             {"$sort": {"_id": 1}}
                                             ]))
        return json.dumps(res)

    def approvalCountPerDesease():

        res = list(db.predictions.aggregate([{
            "$group": {
                "_id": "$desease",
                "approved": {"$sum": {"$cond": [{"$eq": ["$approved", 1]}, 1, 0]}},
                "unapproved": {"$sum": {"$cond": [{"$eq": ["$approved", 0]}, 1, 0]}}
            }
        }]))
        return json.dumps(res)
