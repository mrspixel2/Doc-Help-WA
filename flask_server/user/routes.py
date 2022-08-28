from flask import Flask
from flask_cors import cross_origin
from app import app
from user.models import User

@app.route('/user/signup', methods=['GET', 'POST'])
@cross_origin()
def signup():
  return User().signup()

@app.route('/user/signout')
@cross_origin()
def signout():
  return User().signout()

@app.route('/user/login', methods=['GET','POST'])
@cross_origin()
def login():
  return User().login()

@app.route('/user/me', methods=['POST'])
@cross_origin()
def get_current_user():
  return User().get_current_user()