import React from 'react';
import './header2.css';
import {  useHistory } from 'react-router-dom';
import { useState } from 'react';

const Header2 = () => {
	const history = useHistory();
	const [name,setName] = useState({
		username:localStorage.getItem('username')
	})
	const logoutHandler = () => {
		alert('Are you Sure Want to logout?');
		localStorage.removeItem('token');
		history.push('/');
	};
	return (
		<>
			<div className="header-2-box">
			<span className="header-name">
					<span>Hi! {name.username}</span>
			</span>
			</div>
		</>
	);
};

export default Header2;
