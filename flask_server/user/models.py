from flask import Flask, Response, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from app import db
from bson import ObjectId
import uuid

class User:

  def get_current_user(self):
    if session.get('user_id'):
        user = db.users.find_one({"_id": session.get('user_id')})
        return user
    else:
      return jsonify({ "error": "Unauthorized",
                       "_id" : session.get('user_id') }), 401

  def start_session(self, user):
    del user['password']
    session['logged_in'] = True
    session['user_id'] = user['_id']
    return jsonify(user), 200

  def signup(self):
    print(request.form)
    json_data = request.get_json()

    # Create the user object
    user = {
      "_id": uuid.uuid4().hex,
      "name": json_data.get('name'),
      "email": json_data.get('email'),
      "docid": json_data.get('docid'),
      "password": json_data.get('password')
    }
    print(user)

    # Encrypt the password
    user['password'] = pbkdf2_sha256.encrypt(user['password'])
    # Check for existing email address
    if db.users.find_one({ "email": user['email'] }):
      return jsonify({ "error": "Email address already in use" }), 400

    if db.users.insert_one(user):
      return self.start_session(user)
      

    return jsonify({ "error": "Signup failed" }), 400
  
  def signout(self):
    session.clear()
    return redirect('/')
  
  def login(self):

    user = db.users.find_one({
      "email": request.json['email']
    })

    if user and pbkdf2_sha256.verify(request.json['password'], user['password']):
      return self.start_session(user)
    
    return jsonify({ "error": "Invalid login credentials" }), 401