
from datetime import date,datetime
import json
import os
import random
import time
import uuid
import cv2
from flask import Flask, Response, flash, jsonify, request, session, redirect, url_for
from app import db
from werkzeug.utils import secure_filename
from numpy import loadtxt
from keras.models import load_model
import numpy as np


class Covid_Model:
     

    
    def predict(self):
        if request.method == 'POST':
            file = request.files['img']
            data = request.form



            random_number = random.randint(00000, 99999)
            filepath = '../public/tmp/covid19/' + str(random_number) + '.png'
            image_name = str(random_number) + '.png'
            file.save(filepath)


            model = load_model(os.path.dirname(__file__) +'\\Covid19_Model.h5')
            img = preprocess_img(filepath)
            ress = model.predict(img)
            res = np.argmax(ress, axis = 1)
            time.sleep(5)



            # create a dictionary with the ID of the task
            responseObject = {"status": "success", "probs": ress[0].tolist(), "data": res[0].tolist()}
            #save prediction data to database
            save(data,responseObject,image_name)
            # return the dictionary
            return responseObject

        return None

def preprocess_img(image):
        z_img = cv2.imread(image)
        z_img = cv2.resize(z_img, (70, 70)) / 255.0
        z_img = z_img.reshape(1, z_img.shape[0], z_img.shape[1], z_img.shape[2])
        return z_img

def save(data,response,file):
    user_id = session.get('user_id')
    


    data = {
      "_id": uuid.uuid4().hex,
      "patient": data.get('patient'),
      "doctor_id": user_id,
      "desease": "Covid19",
      "result": response.get('data'),
      "probs": response.get('probs'),
      "image_path": '/tmp/covid19/' + file,
      "symptoms": data.getlist('symptoms[]'),
      "d_report": data.get('report'),
      "approved": -1,
      "date": datetime.today(),
      "prediction_status": response.get('status') 
    }
    print(data)
    print(user_id)

    db.predictions.insert_one(data)
    

