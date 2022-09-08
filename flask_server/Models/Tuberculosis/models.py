import json
import os
import random
import uuid
import cv2
from flask import request, session
from app import db
from keras.models import load_model
import numpy as np
from user.routes import get_current_user


class Tuberculosis:
     

    
    def predict(self):

        if request.method == 'POST':
            file = request.files['img']
            data = request.form
            print(json.dumps(data))



            random_number = random.randint(00000, 99999)
            filepath = './tmp/tuberculosis/' + str(random_number) + '.png'
            file.save(filepath)


            model = load_model(os.path.dirname(__file__) +'\\cnn_model_Tuberculosis.h5')
            img = preprocess_img(filepath)
            ress = model.predict(img)
            res = np.argmax(ress, axis = 1)


            # create a dictionary with the ID of the task
            responseObject = {"status": "success","probs": ress[0].tolist(), "data": res[0].tolist()}
            #save prediction data to database
            save(data,responseObject,filepath)
            # return the dictionary
            return responseObject

        return {"status": "failed"}

def preprocess_img(image):
        z_img = cv2.imread(image)
        z_img = cv2.resize(z_img, (70, 70)) / 255.0
        z_img = z_img.reshape(1, z_img.shape[0], z_img.shape[1], z_img.shape[2])
        return z_img
    

def save(data,response,filepath):
    user_id = session.get('user_id')
    


    data = {
      "_id": uuid.uuid4().hex,
      "patient": data.get('patient'),
      "doctor_id": user_id,
      "desease": "tuberculosis",
      "result": response.get('data'),
      "probs": json.dumps(response.get('probs')),
      "image_path": filepath,
      "symptoms": data.get('symptoms'),
      "d_report": data.get('report'),
      "prediction_status": response.get('status') 
    }
    print(data)
    print(user_id)

    db.predictions.insert_one(data)




