
import React from 'react';
import { useState } from 'react';
import { Link ,useHistory } from 'react-router-dom';
import './login.css';
import axios from 'axios'


const Login = () => {

	const history = useHistory()

	const [loginData , setLoginData] = useState({
		username:'',
		password:''
	})


	const changeHandler = (e) => {
		if(e.target.name==='Username'){
			setLoginData((prev)=>{
				return {...prev,username:e.target.value}
			})
		}else if(e.target.name==='password'){
			setLoginData((prev)=>{
				return {...prev,password:e.target.value}
			})
		}
	}

	const formsubmitHandler = (e)=>{
		e.preventDefault();
		
		
		const userData = {
			username:loginData.username,
			password:loginData.password
		}
		console.log(userData)
		axios.post('http://localhost:3002/login',userData)
		.then((res)=>{
			alert(res.data.message)
			if(res.data.token){
				localStorage.setItem('token',res.data.token);
				localStorage.setItem('username',res.data.username);
				history.push('/landingPage')
			}
			
		})

	}
	return (
		<div className="login_box">
			<div className="login_main">
				<div className="login_body min-h">
					
					<div className="part-2">
						<div className="login_body-container">
						
							<form onSubmit={formsubmitHandler}>
							<div className="form-floating mb-3">
								<input
									type='text'
									value={loginData.username}
									name='Username'
									className="form-control input-child"
									id="floatingInput"
									placeholder="name@example.com"
									onChange={changeHandler}
									autoComplete="off"
									required
								/>
								<label htmlFor="floatingInput">Username</label>
							</div>
							<div className="form-floating input-child">
								<input
									type="password"
									name='password'
									value={loginData.password}
									className="form-control"
									id="floatingPassword"
									placeholder="Password"
									onChange={changeHandler}
									autoComplete="off"
									required
								/>
								<label htmlFor="floatingPassword">Password</label>
							</div>
                            <button className='login-btn input-child' type='submit'>Log In</button>
                            <div className='or-line'>
                                <hr className='line' />
                                <span>or</span>
                                <hr className='line'/>
                            </div>
							</form>
                           
                            <p className='forgot-pass'>Forgot Password?</p>
                            <div>
                                <h6 className='pt-5 pb-1'>Don't Have Account ?</h6>
                                <Link to='/signup'><span className='login-btn p-2'> Sign Up </span></Link>
                            </div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
