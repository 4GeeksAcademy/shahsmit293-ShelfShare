from flask_sqlalchemy import SQLAlchemy
import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine


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
            "books": [book.lean_serialize() for book in self.books]
           
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

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "author": self.name
        }




