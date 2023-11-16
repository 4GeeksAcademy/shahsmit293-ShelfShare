"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Book, WishlistBook,Conversation,Favorite
from api.utils import generate_sitemap, APIException
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
from sqlalchemy import or_
from flask import Response
import json

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
    user = User.query.filter_by(email=body['email']).first()
    if user:
        return jsonify({"error": "Email already exists. Please use a different email."}), 409

    user = User(
        email=body["email"],
        password=generate_password_hash(body["password"]),
        first_name=body["first_name"],
        last_name=body["last_name"],
        age=body["age"],
        location=body["location"],
        coordinates=body["coordinates"]
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
    FRONTEND_URL= os.getenv('FRONTEND_URL')
    MAIL_USERNAME= os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD= os.getenv('MAIL_PASSWORD')
    URL_TOKEN = f"{FRONTEND_URL}resetPassword?token={token}"

    try:
        msg = MIMEMultipart()
        msg['From'] = MAIL_USERNAME
        msg['To'] = email
        msg['Subject'] = 'Password Reset'        
        body = f'Hello, you requested a password reset. If you did not request this, please ignore this email.\n\n'
        body += f'Click the link below to reset your password.:\n\n'
        body += f'Link: {URL_TOKEN}\n\n'       
        body += f'This token is valid for 1 hour. After expiration, you will need to request another password reset.\n\n'
        body += f'Sincerely,\nShelfShare'

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
    

@api.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    token = data.get('token')
    new_password = data.get('new_password')

    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
        email = payload.get('email')
        user = User.query.filter_by(email=email).first()
        if user:
            user.password = generate_password_hash(new_password)
            db.session.commit()
            return jsonify({'message': 'Password reset successful.'}), 200
        else:
            return jsonify({'error': 'User not found.'}), 404

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token.'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token.'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/addbook', methods=['POST'])
@jwt_required()
def add_book():
    email=get_jwt_identity()
    user= User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400
    body=request.json
    book=Book(
        name=body["name"],
        author=body["author"],
        category=body["category"],
        year=body["year"],
        quantity=body["quantity"],
        image=body["image"],
        donate=body["donate"],
        exchange=body["exchange"],
        description=body["description"],
        user_id=user.id,
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
def loadAllUsers():
    users=User.query.all()
    allusers_dictionary=[]
    for user in users:
        allusers_dictionary.append(user.serialize())
    return jsonify(allusers_dictionary), 200

@api.route('/wishlist_book', methods=["POST"])
@jwt_required()
def add_wishlist_book():
    email=get_jwt_identity()
    user= User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400
    body=request.json
    wishlist_book=WishlistBook(
        name=body["name"],
        author=body["author"],
        user_id=user.id
    )
    db.session.add(wishlist_book)
    db.session.commit()
    return wishlist_book.serialize()

@api.route('/addchat', methods=["POST"])
@jwt_required()
def add_chat():
    email=get_jwt_identity()
    user= User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400
    body=request.json
    chat=Conversation(
        sender_id=body["sender_id"],
        receiver_id=body["receiver_id"],
        message=body["message"]
    )
    db.session.add(chat)
    db.session.commit()
    return chat.serialize(),200

@api.route('/conversation/<senderid>&<receiverid>', methods=["GET"])
@jwt_required()
def get_chat(senderid,receiverid):
    email=get_jwt_identity()
    user= User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400
    results = Conversation.query.filter(or_(
        (Conversation.sender_id == senderid) & (Conversation.receiver_id == receiverid),
        (Conversation.sender_id == receiverid) & (Conversation.receiver_id == senderid))).all()
    results_dict = [item.serialize() for item in results]
    return jsonify(results_dict),200

@api.route('/inbox/<inboxid>', methods=["GET"])
@jwt_required()
def inbox_chat(inboxid):
    email=get_jwt_identity()
    user= User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400
    data = Conversation.query.filter(or_(
        (Conversation.sender_id == inboxid),
        (Conversation.receiver_id == inboxid))).all()
    data_dict = [item.serialize() for item in data]
    return jsonify(data_dict),200

@api.route('deletebook/<int:bookID>', methods=["DELETE"])
@jwt_required()
def delete_book(bookID):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("This user doesn't exist"), 400
    book = Book.query.get(bookID)
    if book is None:
        return jsonify("This book doesn't exist"), 400
    
    if book.user.id != user.id:
        return jsonify("you are not authorized to delete this book"), 401
    db.session.delete(book)
    db.session.commit()
    return jsonify("book deleted successfully"), 200


@api.route('deletewishlistbook/<int:wishlistbookID>', methods=["DELETE"])
@jwt_required()
def delete_wishlist_book(wishlistbookID):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("This user doesn't exist"), 400
    book = WishlistBook.query.get(wishlistbookID)
    if book is None:
        return jsonify("This book doesn't exist"), 400
    if book.wishlistuser.id != user.id:
        return jsonify("you are not authorized to delete this book")
    db.session.delete(book)
    db.session.commit()
    return jsonify("book deleted successfully"), 200
    
# edit book
@api.route('/editbook/<int:book_id>', methods=['PUT'])
@jwt_required()
def edit_book(book_id):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("User doesn't exist"), 400

    book = Book.query.get(book_id)
    if book is None:
        return jsonify("Book doesn't exist"), 400

    body = request.json
    book.name = body.get("name", book.name)
    book.author = body.get("author", book.author)
    book.category = body.get("category", book.category)
    book.year = body.get("year", book.year)
    book.quantity = body.get("quantity", book.quantity)
    book.image = body.get("image", book.image)
    book.donate = body.get("donate", book.donate)
    book.exchange = body.get("exchange", book.exchange)
    book.description = body.get("description", book.description)

    db.session.commit()
    return jsonify(book.serialize())

#get  edit book
@api.route('/vieweditbook/<int:book_id>', methods=['GET'])
@jwt_required()
def get_edit_book(book_id):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("User doesn't exist"), 400

    book = Book.query.get(book_id)
    if book is None:
        return jsonify("Book doesn't exist"), 400

    return jsonify(book.serialize())

@api.route('/addfavoritebook', methods=["POST"])
@jwt_required()
def add_favorite():
    email=get_jwt_identity()
    user= User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400
    body=request.json
    favorite_book=Favorite(
        user_id=body["user_id"],
        book_id=body["book_id"],
    )
    db.session.add(favorite_book)
    db.session.commit()
    return favorite_book.serialize(),200

@api.route('/deletefavoritebook/<int:bookid>', methods=["DELETE"])
@jwt_required()
def delete_favorite_book(bookid):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("This user doesn't exist"), 400
    select_book = Favorite.query.filter_by(user_id=user.id, book_id=bookid).first()
    if select_book is None:
        return jsonify("This book doesn't exist"), 400
    if select_book.book.user_id == user.id:
        return jsonify("you are not authorized to delete this book")
    db.session.delete(select_book)
    db.session.commit()
    return jsonify("favorite book deleted successfully"), 200


@api.route('/viewfavoritebook/<int:userid>', methods=['GET'])
@jwt_required()
def get_favorite_book(userid):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("User doesn't exist"), 400

    favorite_books = Favorite.query.filter_by(user_id=userid).all()
    favorite_books_dictionary = [book.serialize() for book in favorite_books]
    if favorite_books is None:
        return jsonify("Book doesn't exist"), 400

    return jsonify(favorite_books_dictionary),200