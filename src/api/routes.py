"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup',methods=['POST'])
def signup():
    body=request.json
    user=User(
        email=body["email"],
        password=body["password"],
        first_name=body["first_name"],
        last_name=body["last_name"],
        age=body["age"],
        location=body["location"]
    )
    db.session.add(user)
    db.session.commit()
    return user.serialize()

