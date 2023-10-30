import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    console.log("STORE***",store.user)

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
						<div>Forgot Password</div>                         
						<div
                        onClick={() => navigate("/signup")}
                        >Create Account</div>
                        </div>
                    <div>
                    {store.accessToken? 
                        <button
                            type="button"
                            class="btn btn-secondary"
                            onClick={()=> {
                                actions.handleLogout()
                                // actions.logout()
                                // setEmail("")
                                // setPassword("")
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
