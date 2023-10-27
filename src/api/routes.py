"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Book
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

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
        password=generate_password_hash(body["password"]),
        first_name=body["first_name"],
        last_name=body["last_name"],
        age=body["age"],
        location=body["location"]
    )
    db.session.add(user)
    db.session.commit()
    token=create_access_token(identity=user.email)

    return jsonify(user=user.serialize(), token=token), 201

@api.route('/login',methods=['POST'])
def login():
    password=request.json.get("password",None)
    email=request.json.get("email",None)
    user=User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify("Email or password are incorret!"), 401
    if not check_password_hash(user.password,password):
        return jsonify("Email or password are incorret!"), 401
    token=create_access_token(identity=email)

    return jsonify(token=token, user=user.serialize()), 200

@api.route('/addbook',methods=['POST'])
def add_book():
    body=request.json
    book=Book(
        name=body["name"],
        author=body["author"],
        category=body["category"],
        year=body["year"],
        quantity=body["quantity"],
        user_id=body["user_id"],
    )
    db.session.add(book)
    db.session.commit()
    return book.serialize()

@api.route('/allbooks',methods=['GET'])
def all_books():
    books=Book.query.all()
    allbooks_dictionary=[]
    for book in books:
        allbooks_dictionary.append(book.serialize())
    return jsonify(allbooks_dictionary),200

@api.route('/book/<id>',methods=['GET'])
def individual_book(id):
    books=Book.query.get(id)
    return jsonify(books.serialize()),200