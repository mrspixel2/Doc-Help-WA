from dotenv import load_dotenv
import os
import redis
load_dotenv()

class ApplicationConfig:
    SESSION_TYPE = 'REDIS'
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url('redis://127.0.0.1:6379')
    SECRET_KEY = b'\xcc^\x91\xea\x17-\xd0W\x03\xa7\xf8J0\xac8\xc5'
    JSONIFY_PRETTYPRINT_REGULAR = False
    