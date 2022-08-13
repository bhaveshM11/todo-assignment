import React from 'react';
import './usersidebar.css';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const UserSideBar = ({arr}) => {
	const history = useHistory();

	useEffect(()=>{
		
	})
	
	const logoutHandler = ()=>{
		alert('Are you Sure Want to logout?')
		axios.post('http://localhost:3002/todoList',{data:arr},{
			headers: { authorization: localStorage.getItem("token") },
		  })
		  .then((res)=>{
			console.log(res.data)
		  })
		localStorage.removeItem('token')
		history.push('/')
	}

	return (
		<aside className="user-side-bar">
			<div className='todo-list'>
				<span>TODO - List </span>
				<span>History</span>
			</div>
			
				<div onClick={logoutHandler} className="sidebar-list-item sidebar-list-item-end">
				<span className="header-logout">
					<i>
						<span class="material-symbols-outlined">Logout</span>
					</i>
					<span>Logout</span>
				</span>
			</div>
			
			
		</aside>
	);
};

export default UserSideBar;
