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
            },
        }, {"$sort": {"_id": 1}
            }]))
        return json.dumps(res)

    def predictionsCountPerMonth():

        res = list(db.predictions.aggregate([
            {
                "$project":
                {
                    "month": {"$month": "$date"},
                    "year": {"$year": "$date"}
                }
            },
            {"$group": {
                "_id": '$year',
                "jan": {"$sum": {"$cond": [{"$eq": ["$month", 1]}, 1, 0]}},
                "feb": {"$sum": {"$cond": [{"$eq": ["$month", 2]}, 1, 0]}},
                "mar": {"$sum": {"$cond": [{"$eq": ["$month", 3]}, 1, 0]}},
                "apr": {"$sum": {"$cond": [{"$eq": ["$month", 4]}, 1, 0]}},
                "may": {"$sum": {"$cond": [{"$eq": ["$month", 5]}, 1, 0]}},
                "jun": {"$sum": {"$cond": [{"$eq": ["$month", 6]}, 1, 0]}},
                "jul": {"$sum": {"$cond": [{"$eq": ["$month", 7]}, 1, 0]}},
                "aug": {"$sum": {"$cond": [{"$eq": ["$month", 8]}, 1, 0]}},
                "sep": {"$sum": {"$cond": [{"$eq": ["$month", 9]}, 1, 0]}},
                "oct": {"$sum": {"$cond": [{"$eq": ["$month", 10]}, 1, 0]}},
                "nov": {"$sum": {"$cond": [{"$eq": ["$month", 11]}, 1, 0]}},
                "dec": {"$sum": {"$cond": [{"$eq": ["$month", 12]}, 1, 0]}}
            }}
        ]))
        return json.dumps(res)
