import json
import os
import random
import uuid
import cv2
from flask import Flask, Response, flash, jsonify, request, session, redirect, url_for
from app import db
from werkzeug.utils import secure_filename
from numpy import loadtxt
from keras.models import load_model
import numpy as np


class Kidney_Model:
     

    
    def predict(self):
        if request.method == 'POST':
            file = request.files['img']
            data = request.form
            random_number = random.randint(00000, 99999)
            filepath = './tmp/kidney/' + str(random_number) + '.png'
            file.save(filepath)
            filename = str(random_number) + '.png'
            model = load_model(os.path.dirname(__file__) +'\\cnn_model_kidney_diseases.h5')
            img = preprocess_img(filepath)
            res = model.predict(img)
            res = np.argmax(res, axis = 1)
            # create a dictionary with the ID of the task
            responseObject = {"status": "success", "data": res[0].tolist()}
            #save prediction data to database
            save(data,responseObject,filepath)
            # return the dictionary
            return responseObject

        return None

def preprocess_img(image):
        z_img = cv2.imread(image, cv2.IMREAD_GRAYSCALE)
        z_img = cv2.resize(z_img, (200, 200)) / 255.0
        z_img = z_img.reshape(1, z_img.shape[0], z_img.shape[1], 1)
        return z_img

def save(data,response,filepath):
    user_id = session.get('user_id')
    


    data = {
      "_id": uuid.uuid4().hex,
      "patient": data.get('patient'),
      "doctor_id": user_id,
      "desease": "Kidney",
      "result": response.get('data'),
      "image_path": filepath,
      "symptoms": data.get('symptoms'),
      "d_report": data.get('report'),
      "prediction_status": response.get('status') 
    }
    print(data)
    print(user_id)

    db.predictions.insert_one(data)

    

