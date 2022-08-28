import json
from flask import Flask, Response, jsonify, request, session, redirect
from app import db


class predictions :

    def getAllPredictions():

        res = list(db.predictions.find({}))
        return json.dumps(res)
        


