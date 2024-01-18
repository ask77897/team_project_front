import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navi = useNavigate();
	const [userid, setUserid] = useState('');
	const [password, setPassword] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const ref_uid = useRef(null);
	const refIDInput = useRef(null);
	const refPasswordInput = useRef(null);

	const onClickLogin = async (e) => {
		e.preventDefault();

		if (userid === '') {
			alert('아이디를 입력하세요!');
			refIDInput.current.focus();
			return;
		}

		if (password === '') {
			alert('비밀번호를 입력하세요!');
			refPasswordInput.current.focus();
			return;
		}

		try {
			const res = await axios.post('/users/login', {
			  uid: userid,
			  upass: password
			});

			if (res.data === 0) {
				alert('아이디가 존재하지 않습니다!');
				ref_uid.current.focus();
			} else if (res.data === 2) {
				alert('비밀번호가 일치하지 않습니다!');
			} else {
				sessionStorage.setItem('uid', userid);

				if (sessionStorage.getItem('target')) {
					navi('/mypage', { state: { userName: res.data } });
				} else {
					navi('/');
				}
			}
		} catch (error) {
			console.error('로그인 요청 중 오류 발생:', error.message);
		}
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
	};

	return (
		<div className='container'>
			<i
				style={{ fontSize: '30px', cursor: 'pointer' }}
				className="bi bi-house-fill"
				onClick={() => navi('/')}
			></i>
			<span className='text-center m-2'>
				<h1 style={{ marginTop: '100px' }}>
					프리타임<i style={{ marginLeft: '5px' }} className='bi bi-airplane-engines'></i>
				</h1>
			</span>
			<div className='d-flex justify-content-center'>
				<Form className='form'>
					<Form.Group controlId='formBasicId'>
						<Form.Label>아이디</Form.Label>
						<Form.Control
							ref={refIDInput}
							type='uid'
							placeholder='아이디를 입력하세요.'
							style={{ width: '450px' }}
							value={userid}
							onChange={(e) => setUserid(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId='formBasicPassword'>
						<Form.Label style={{ marginTop: '5px' }}>비밀번호</Form.Label>
						<Form.Control
							ref={refPasswordInput}
							type='password'
							placeholder='비밀번호를 입력하세요.'
							style={{ width: '450px' }}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Button style={{ marginTop: '10px', borderRadius:'20px' }} variant='warning' type='button' onClick={onClickLogin}>
						프리타임 로그인
					</Button>
				</Form>
			</div>
			<hr />
			<h3 className='text-center'>SNS로그인</h3>
			<div className='sns_login text-center'>
				<Button style={{ backgroundColor: 'white' }} className='kakao_login'>
					<img src='//static.011st.com/assets/img/svg/member/sns-kakao.svg' alt='카카오' />
				</Button>
				<Button style={{ backgroundColor: 'white' }} className='naver_login'>
					<img src='//static.011st.com/assets/img/svg/member/sns-naver.svg' alt='네이버' />
				</Button>
			</div>
		</div>
	);
};

export default Login;
