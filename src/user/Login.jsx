import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'


const Login = () => {

	const [useremail, setUseremail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const onClickLogin = () => {
		if (!useremail || !password) {
			alert("아이디와 비밀번호가 틀렸습니다.")
		  } else {
			console.log('로그인 성공!');
			setUseremail('');
			setPassword('');
		  }
	};

	return (
		<div className='container'>
			<span className='text-center m-2'><h1>로그인</h1></span>
			{isLoggedIn ? (
				// 로그인 성공 시 표시할 내용
				<p>로그인되었습니다!</p>
			) : (
				// 로그인 실패 또는 로그인 전에 표시할 내용
				<>
					<div className='text-center'>
						<div>
							<label className='email' for="email"></label>
							이메일: <input type="email" id="email" name="email" value={useremail} onChange={(e) => setUseremail(e.target.value)} placeholder="이메일을 입력하세요." required />
						</div>
						<div>
							<label className='password' for="password"></label>
							비밀번호: <input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요." required value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>
						<Button className='text-center' style={{ backgroundColor: "skyblue", marginTop: '20px' }} onClick={onClickLogin}>로그인</Button>
					</div>
				</>
			)}
			<hr />
			<h3 className='text-center'>SNS로그인</h3>
			<div className='sns_login text-center'>
				<Button style={{ backgroundColor: 'white' }} className='kakao_login' >
					<img src="//static.011st.com/assets/img/svg/member/sns-kakao.svg" alt="카카오" />
				</Button>
				<Button style={{ backgroundColor: 'white' }} className='naver_login'>
					<img src="//static.011st.com/assets/img/svg/member/sns-naver.svg" alt="네이버" />
				</Button>
			</div>
		</div >
	)
}

export default Login