import loginAxios from "../utils/login";
import {useState} from "react";
import { PropTypes } from "prop-types";

const LoginForm = ({setUser, setErrorMsg}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	
	const handleLogin = async (e) => {
		e.preventDefault();
	
		try{
			const loginUser = {
				username,
				password
			}
			const response = await loginAxios.login(loginUser);
			setUser(response);
			console.log(JSON.stringify(response));
			window.localStorage.setItem("user", JSON.stringify(response));
			console.log("Login successfully with", username, password);
			setUsername("");
			setPassword("");
		} catch(err) {
			setErrorMsg("Wrong credentials");
			setTimeout(() => {
				setErrorMsg("");
			}, 3000);
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<div>
				<label htmlFor="username">Username</label>
				<input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} value={username} />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
			</div>
			<button type="submit">Login</button>
		</form>
	);
}

LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	setUsername: PropTypes.func.isRequired,
	setPassword: PropTypes.func.isRequired,
	setUser: PropTypes.func.isRequired,
	setErrorMsg: PropTypes.func.isRequired,
}

export default LoginForm;