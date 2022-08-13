import React from 'react';
import { useEffect } from 'react';
import Header2 from '../header2/Header2';
import UserSideBar from '../userSideBar/UserSideBar';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import './landingPage.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
	const history = useHistory();
  const [arr, setArr] = useState([]);
  const [items, setItems] = useState({
		activity: '',
		status: 'pending',
		time: '',
		action: 'start',
		startTime: '',
		endTime: '',
	});
	useEffect(() => {
		if (!localStorage.getItem('token')) {
			history.push('/');
		}
    axios.get('http://localhost:3002/todoList',{
      headers: { authorization: localStorage.getItem("token") },
    })
    .then((res)=>{
		if(res.data.data){
			setArr(res.data.data)
		}
    })

	},[]);


 
	const [show, setShow] = useState(false);
	const [activeActivity, setActiveActivity] = useState(false);
	const activityHandler = (e) => {
		setItems((prev) => {
			return { ...prev, activity: e.target.value };
		});
	};







	const handleClose =() => {
		setArr((prev) => {
			const updatedActivities = [...prev];
			arr.push(items);
			return updatedActivities;
		});
   
    setShow(false)
  }
	const handleShow = () => setShow(true);

	const startHandler = (val) => {
		console.log(val);
		if (activeActivity === true) {
			alert('already running activity');
			return;
		} else {
			setActiveActivity(true);

			arr.forEach((data) => {
				if (data.activity === val) {
					data.status = 'ongoing';
					data.startTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
				}
			});
			console.log(arr);
		}
	};
	const endHandler = (val) => {
		setActiveActivity(false);
		arr.forEach((data) => {
			if (data.activity === val) {
				data.status = 'completed';
				data.endTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

				let hr = data.endTime.split(':')[0] - data.startTime.split(':')[0];
				if (hr < 10) {
					hr = `0${hr}`;
				}

				let min = Math.abs(
					data.endTime.split(':')[1] - data.startTime.split(':')[1]
				);
				
				if (min < 10) {
					min = `0${min}`;
				}

				let sec = Math.abs(
					data.endTime.split(':')[2] - data.startTime.split(':')[2]
				);
				
				if (sec < 10) {
					sec = `0${sec}`;
				}

				data.time = `${hr}:${min}:${sec}`;
			}

      axios.post('http://localhost:3002/todoList',{data:arr},{
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res)=>{
        console.log(res.data)
      })
		});

	};
	const pauseHandler = (val) => {
		setActiveActivity(false);
		arr.forEach((data) => {
			if (data.activity === val) {
				data.status = 'pause';
				data.endTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

				let hr = data.endTime.split(':')[0] - data.startTime.split(':')[0];
				if (hr < 10) {
					hr = `0${hr}`;
				}

				let min = Math.abs(
					data.endTime.split(':')[1] - data.startTime.split(':')[1]
				);

				if (min < 10) {
					min = `0${min}`;
				}

				let sec = Math.abs(
					data.endTime.split(':')[2] - data.startTime.split(':')[2]
				);

				if (sec < 10) {
					sec = `0${sec}`;
				}
				if (data.time.length === 0) {
					data.time = `${hr}:${min}:${sec}`;
				} else {
					let timearr = data.time.split(':').map(Number);
					hr = timearr[0] + parseInt(hr);
					min = timearr[1] + parseInt(min);
					sec = timearr[2] + parseInt(sec);
					if (hr < 10) {
						hr = `0${hr}`;
					}
					if (min < 10) {
						min = `0${min}`;
					}
					if (sec < 10) {
						sec = `0${sec}`;
					}
					data.time = `${hr}:${min}:${sec}`;
				}
			}
		});
	};

	const resumeHandler = (val) => {
		if (activeActivity === true) {
			alert('already running activity');
			return;
		} else {
			setActiveActivity(true);
			arr.forEach((data) => {
				if (data.activity === val) {
					data.status = 'ongoing';
					data.startTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
				}
			});
		}
	};

	return (
		<div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{' '}
					<input
						type="text"
						className="activity-input"
						onChange={activityHandler}
					/>{' '}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Add Activity
					</Button>
				</Modal.Footer>
			</Modal>

			<UserSideBar arr={arr}></UserSideBar>
			<Header2></Header2>

			<div className="landing-part-2">
				<div className="button-box">
					<button className="activity-btn" onClick={handleShow}>
						Add new Activity
					</button>
				</div>
				<div className="landing-table">
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Activity</th>
								<th>Status</th>
								<th>Time</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{arr && arr.map((data, idx) => (
								<tr key={idx}>
									<td>{data.activity}</td>
									<td>{data.status}</td>
									<td>{data.status === 'completed' && data.time}</td>
									<td>
										{data.status === 'pending' && (
											<button className='action-btn'
												onClick={() => {
													startHandler(data.activity);
												}}
											>
												start
											</button>
										)}
										{data.status === 'ongoing' && (
											<>
												<button
												className='action-btn'
													onClick={() => {
														endHandler(data.activity);
													}}
												>
													End
												</button>
												<button
												className='action-btn'
													onClick={() => {
														pauseHandler(data.activity);
													}}
												>
													Pause
												</button>
											</>
										)}
										{data.status === 'pause' && (
											<button
											className='action-btn'
												onClick={() => {
													resumeHandler(data.activity);
												}}
											>
												Resume
											</button>
										)}
										{data.status === 'completed'}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
