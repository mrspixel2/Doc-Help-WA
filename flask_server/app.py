from flask import Flask, render_template, session, redirect
from functools import wraps
from flask_cors import CORS
import pymongo
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)
app.secret_key = b'\xcc^\x91\xea\x17-\xd0W\x03\xa7\xf8J0\xac8\xc5'
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False

# Database
client = pymongo.MongoClient('localhost', 27017)
db = client.dochelp_db

# Decorators
def login_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session:
      return f(*args, **kwargs)
    else:
      return redirect('/')
  
  return wrap

# Routes
from user import routes
from Models import routes

@app.route('/')
def home():
  return render_template('home.html')

@app.route('/dashboard/')
@login_required
def dashboard():
  return render_template('dashboard.html')