import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import ForgotPassword from './forgotPassword';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState("");

  const validateLogin = () => {
    if (email == "" && password == "") {
      setError("Enter your email and password!")
    }
    else if (email == "") {
      setError("Enter your email!")
    }
    else if (password == "") {
      setError("Enter your Password!")
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (store.accessToken && store.accessToken != "" && store.accessToken != "undefined" && store?.accessToken.length > 0) {
      navigate("/")
    }
  }, [store.accessToken])


  return (
    <div>
      {store.accessToken ? (
        navigate("/")
      ) : (
        <div className=" justify-content-center align-items-center vh-100">
          <div className="text-center login">
            <div >
              <h1>Login</h1>
              <h4>{error ?? ""}</h4>
            </div>
            <div>
              <div>
                <i class="fa-regular fa-envelope"></i>
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => { setEmail(event.target.value) }}
                  placeholder="E-mail"
                  required />
              </div>
              <div>
                {store.accessToken ?
                  <i class="fa-solid fa-lock-open"></i>
                  :
                  <i class="fa-solid fa-lock"></i>
                }
                <input
                  className="input"
                  type="password"
                  name="passaword"
                  value={password}
                  onChange={(event) => { setPassword(event.target.value) }}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="forgot">
                <div onClick={() => setShowForgotPassword(true)}
                >Forgot Password?
                </div>
                <div
                  onClick={() => navigate("/signup")}
                >Create Account
                </div>
              </div>
              {showForgotPassword && <ForgotPassword onClose={() => setShowForgotPassword(false)} />}
              <div>
                {store.accessToken ?
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => {
                      actions.handleLogout()
                    }
                    }
                  >Logout
                  </button>
                  :
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => {
                      validateLogin()
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

      )}
      </div>
  );
}
