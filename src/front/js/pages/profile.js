import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Profile = () => {

	return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-evenly mt-4">
                <div className="col-4 d-flex justify-content-center align-items-center">
                    <h3>My available books</h3>
                </div>
                <div className="col-4 d-flex justify-content-center align-items center">
                <h3>My Wishlist</h3>
                </div>
            </div>

            <div className="row d-flex justify-content-evenly">
                <div 
                className="col-4 border border-3 rounded d-flex flex-column p-4 m-4">
                    <ul className="list-group">
                        <li className="list-group-item">1</li>
                        <li className="list-group-item">2</li>
                        <li className="list-group-item">3</li>
                    </ul>
                    <button 
                    className="btn btn-success btn-sm mx-auto">
                            Add a book
                    </button>
                </div>
                <div 
                className="col-4 border border-3 rounded d-flex flex-column p-4 m-4">
                    <ul className="list-group">
                        <li className="list-group-item">1</li>
                        <li className="list-group-item">2</li>
                        <li className="list-group-item">3</li>
                    </ul>
                    <button 
                    className="btn btn-success btn-sm mx-auto">
                        Add to Wishlist
                    </button>
                </div>
            </div>
            <div className="row m-2 mt-4">
                <div className="col-12 d-flex justify-content-center">
                    <h3> My Information</h3>
                </div>
            </div>
            <div className="row mb-2 d-flex justify-content-center">
                <div className="col-4 d-flex align-items-center flex-column border border-3 p-2">
                    <p>Name: John Pazda</p>
                    <p>Age: 27</p>
                    <p>Address: 1738 spring Drive<br></br> Marietta, GA 30060</p>
                </div>
            </div>
        </div>
	);
};

