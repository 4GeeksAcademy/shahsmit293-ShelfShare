import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 login">
			Login
		</div>
	);
};
