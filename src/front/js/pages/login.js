import React, { useContext, useState,useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from './forgotPasswordForm';

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
		if(store.accessToken &&	store.accessToken != "" && store.accessToken != "undefined" && store?.accessToken.length > 0){
	    	navigate("/")			
		}
	},[store.accessToken])


    return (
        <div className=" justify-content-center align-items-center vh-100">
            <div className="text-center login">
                <div >
                    <h1>Login</h1>
                </div>
                <div>                    
                    <div>
						<i class="fa-regular fa-envelope"></i>
                        <input
                        className="input"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(event)=>{setEmail(event.target.value)}}                    
                        placeholder="E-mail"
                        required/>						
                    </div>                   
                    <div>
                        {store.accessToken?
                        <i class="fa-solid fa-lock-open"></i>
                        :
                        <i class="fa-solid fa-lock"></i>
                        }
                        <input
                        className="input"
                        type="password"
                        name="passaword"
                        value={password}
                        onChange={(event)=>{setPassword(event.target.value)}}                         
                        placeholder="Password"
                        required
                        />
                    </div>
                    <div className="forgot">
                        <div onClick={() => setShowForgotPasswordForm(true)}
                        >Forgot Password?
                        </div>               
						<div
                        onClick={() => navigate("/signup")}
                        >Create Account
                        </div>
                    </div>
                    {showForgotPasswordForm && <ForgotPasswordForm onClose={() => setShowForgotPasswordForm(false)} />}
                    <div>
                    {store.accessToken? 
                        <button
                            type="button"
                            class="btn btn-secondary"
                            onClick={()=> {
                                actions.handleLogout()
                                }
                            }
                            >Logout
                        </button>
                        :
                        <button
                            type="button"
                            class="btn btn-secondary"
                            onClick={()=>{
                                actions.login(email, password)
                            }
                        }
                            >Submit
                        </button>                        
                    } 
					</div>
                </div>
            </div>
        </div>
    );
};
