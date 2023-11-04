from flask import request, jsonify, Blueprint
from api.models import db, User, Book
from api.utils import APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from datetime import datetime, timedelta
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import os
import jwt

api = Blueprint('api', __name__)

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'Shelfshare')

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google Inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    body = request.json
    user = User(
        email=body["email"],
        password=generate_password_hash(body["password"]),
        first_name=body["first_name"],
        last_name=body["last_name"],
        age=body["age"],
        location=body["location"]
    )
    db.session.add(user)
    db.session.commit()
    token = create_access_token(identity=user.email)
    return jsonify(user=user.serialize(), token=token), 201

@api.route('/login', methods=['POST'])
def login():
    password = request.json.get("password", None)
    email = request.json.get("email", None)
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify("Email or password are incorrect!"), 401
    if not check_password_hash(user.password, password):
        return jsonify("Email or password are incorrect!"), 401
    token = create_access_token(identity=email)
    return jsonify(token=token, user=user.serialize()), 200

@api.route('/forgot-password', methods=['POST'])
def forgot_password():
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'Email not found in the database.'}), 400

    expiration_time = datetime.utcnow() + timedelta(hours=1)
    payload = {
        'email': email,
        'exp': expiration_time
    }
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')
    BACKEND_URL= os.getenv('BACKEND_URL')
    MAIL_USERNAME= os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD= os.getenv('MAIL_PASSWORD')

    try:
        msg = MIMEMultipart()
        msg['From'] = MAIL_USERNAME
        msg['To'] = email
        msg['Subject'] = 'Password Reset'
        body = f'Click the following link to reset your password: {BACKEND_URL}/reset-password/{token}'
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP(os.getenv('MAIL_SERVER'), os.getenv('MAIL_PORT'))
        server.starttls()
        server.login(MAIL_USERNAME, MAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(MAIL_USERNAME, email, text)
        server.quit()

        return jsonify({'message': 'Password reset link sent to your email.'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# @api.route('/reset-password', methods=['POST'])
# def generate_reset_password_token():
#     email = request.json.get('email')
#     user = User.query.filter_by(email=email).first()
#     if not user:
#         return jsonify({'message': 'Email not found in the database.'}), 400

#     expiration_time = datetime.utcnow() + timedelta(hours=1)
#     payload = {
#         'email': email,
#         'exp': expiration_time
#     }
#     token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')
#     return jsonify({'token': token}), 200

@api.route('/addbook', methods=['POST'])
def add_book():
    body = request.json
    book = Book(
        name=body["name"],
        author=body["author"],
        category=body["category"],
        year=body["year"],
        quantity=body["quantity"],
        image=body["image"],
        user_id=body["user_id"],
    )
    db.session.add(book)
    db.session.commit()
    return book.serialize()

@api.route('/allbooks', methods=['GET'])
def all_books():
    books = Book.query.all()
    allbooks_dictionary = [book.serialize() for book in books]
    return jsonify(allbooks_dictionary), 200

@api.route('/book/<id>', methods=['GET'])
def individual_book(id):
    book = Book.query.get(id)
    if book:
        return jsonify(book.serialize()), 200
    else:
        return jsonify({"message": "Book not found"}), 404

@api.route('/user/<id>', methods=['GET'])
def individual_user(id):
    user = User.query.get(id)
    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({"message": "User not found"}), 404

@api.route('/allusers', methods=['GET'])
def load_all_users():
    users = User.query.all()
    all_users_dictionary = [user.serialize() for user in users]
    return jsonify(all_users_dictionary), 200
