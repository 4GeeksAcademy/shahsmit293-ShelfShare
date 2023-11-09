from flask_sqlalchemy import SQLAlchemy
import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Date, Time
from sqlalchemy import func


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(180), unique=False, nullable=False)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    age = db.Column(db.String(80), unique=False, nullable=False)
    location = db.Column(db.String(140), unique=False, nullable=False)
    # books = db.relationship("Book", backref="user",uselist=True) 
    # wishlist_books 

    def __repr__(self):
        return f'<User {self.email}>'

    def __init__(self,email,password,first_name,last_name,age,location):
        self.email=email
        self.password=password
        self.first_name=first_name
        self.last_name=last_name
        self.age=age
        self.location=location

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "age": self.age,
            "location": self.location,
            "books": [book.lean_serialize() for book in self.books],
            "wishlist_books": [book.lean_serialize() for book in self.wishlist_books]
           
            # do not serialize the password, its a security breach
        }
class Book(db.Model):
    __tablename__ = 'book'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    year = db.Column(db.Integer, nullable=True)
    quantity = db.Column(db.Integer, nullable=True)
    image = db.Column(db.String(2000), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    user = db.relationship(User, backref="books")

    def __init__(self,name,author,category,year,quantity,image,user_id):
        self.name=name
        self.author=author
        self.category=category
        self.year=year
        self.quantity=quantity
        self.image=image
        self.user_id=user_id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "author": self.author,
            "category": self.category,
            "year": self.year,
            "quantity": self.quantity,
            "image":self.image,
            "user_id": self.user_id,
            # "user_location": self.user.location,
            "user": self.user.serialize()
        }
    def lean_serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "author": self.author,
            "category": self.category,
            "year": self.year,
            "quantity": self.quantity,
            "image":self.image,
        }
    
class WishlistBook(db.Model):
    __tablename__ = 'wishlist_book'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    wishlistuser = db.relationship(User, backref="wishlist_books")

    def __init__(self,name,author,user_id):
        self.name=name
        self.author=author
        self.user_id=user_id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "author": self.author,
            "wishlistuser": self.wishlistuser.serialize()
        }
    
    def lean_serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "author": self.author,
        }

class Conversation(db.Model):
    __tablename__ = 'conversation'
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    message = db.Column(db.String(4000), nullable=False)
    current_date = db.Column(Date, default=func.current_date())
    current_time = db.Column(Time, default=func.current_time())
    sender = db.relationship(User, backref="sent_conversations", foreign_keys=[sender_id])
    receiver = db.relationship(User, backref="received_conversations", foreign_keys=[receiver_id])

    def __init__(self,sender_id,receiver_id,message):
        self.sender_id=sender_id
        self.receiver_id=receiver_id
        self.message=message

    def serialize(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "message":self.message,
            "current_date": self.current_date.isoformat() if self.current_date else None,
            "current_time": self.current_time.strftime('%H:%M') if self.current_time else None,
            "sender": self.sender.serialize(),
            "receiver": self.receiver.serialize()
        }
    
    def lean_serialize(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
        }



