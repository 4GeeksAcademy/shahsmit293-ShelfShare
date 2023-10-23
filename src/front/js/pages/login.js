import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);
	console.log(email, password,"TEST***")

    return (
        <div className=" justify-content-center align-items-center vh-100">
            <div className="text-center login">
                <div >
                    <h1>Login</h1>
                </div>
                <div>                    
                    <div>
						<i class="fa-regular fa-envelope"></i>
                        <input onChange={(event)=>{setEmail(event.target.value)}} value={email} className="input" type="email" placeholder="E-mail"/>						
                    </div>                   
                    <div>
						<i class="fa-solid fa-lock"></i>
                        <input onChange={(event)=>{setPassword(event.target.value)}} value={password} className="input" type="password" placeholder="Password"/>
                    </div>
					<div className="forgot">                    
						<div>Forgot E-mail</div>
						<div>Forgot Password</div>                         
						<div>Creat Account</div>
                        <button type="button" class="btn btn-secondary">Submit</button> 
					</div>
                </div>
            </div>
        </div>
    );
};
