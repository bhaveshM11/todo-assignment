import React, { useState } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
const Signup = () => {
	const history = useHistory();

	const [value, setValues] = useState({
		username: '',
		password: '',
		confirmPassword:'',
	});
	const changeHandler = (event) => {
		if (event.target.name === 'username') {
			setValues((prev) => {
				return { ...prev, username: event.target.value };
			});
		}else if (event.target.name === 'password') {
			setValues((prev) => {
				return { ...prev, password: event.target.value };
			});
			
		}else if (event.target.name === 'confirmPassword') {
			setValues((prev) => {
				return { ...prev, confirmPassword: event.target.value };
			});
			
		}
	};
	console.log(value)
	const onSubmitHandler = (e) => {
		e.preventDefault();
		console.log(value)
		if(value.username === 0 || value.password === 0 || value.confirmPassword === 0){
			return;
		}else if(value.password === value.confirmPassword){
			
			axios.post('http://localhost:3002/register', value).then((res) => {
			if (res.data.message.includes('Successfully')) {
				alert(res.data.message);
				history.push('/');
			}
		});	
		}
	};

	return (
		<div className="login_box">
			<div className="login_main">
				<div className="login_body min-h">
					
					<div className="part-2">
					
						<div className="login_body-container">
							<form onSubmit={onSubmitHandler}>
								<div className="form-floating mb-3">
									<input
										type="text"
										className="form-control input-child"
										id="floatingInput"
										placeholder="name@example.com"
										onChange={changeHandler}
										name="username"
										autoComplete="off"
										required
									/>
									<label htmlFor="floatingInput">Username</label>
								</div>
								<div className="form-floating input-child mb-3">
									<input
										type="password"
										className="form-control"
										id="floatingPassword"
										placeholder="Password"
										onChange={changeHandler}
										name="password"
										autoComplete="off"
										required
									/>
									<label htmlFor="floatingPassword">Password</label>
								</div>
								<div className="form-floating input-child">
									<input
										type="password"
										className="form-control"
										id="floatingconPassword"
										placeholder="Confirm Password"
										onChange={changeHandler}
										name="confirmPassword"
										autoComplete="off"
										required
									/>
									<label htmlFor="floatingconPassword">Confirm Password</label>
								</div>
								
								<button className="login-btn input-child signup-formbutton" type="submit">
									Sign Up
								</button>
							</form>
							<div className="mt-4 ">
								<h6 className="py-1 mb-3"> Already Have Account ?</h6>
								<Link to="/">
									<span className="login-btn p-2">Log In</span>{' '}
								</Link>
							</div>
						</div>	
				
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
