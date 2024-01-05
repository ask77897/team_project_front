import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Form } from 'react-bootstrap';


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
			<span className='text-center m-2'><h1 style={{marginTop:'100px'}}>프리타임<i style={{marginLeft:'5px'}} className="bi bi-airplane-engines"></i></h1></span>
			{isLoggedIn ? (
				// 로그인 성공 시 표시할 내용
				<p>로그인되었습니다!</p>
			) : (
				// 로그인 실패 또는 로그인 전에 표시할 내용
				<>
					<div className="d-flex justify-content-center">
						<Form className='form'>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Email 주소</Form.Label>
								<Form.Control type="email" placeholder="이메일을 입력하세요." style={{ width: '450px' }} />
							</Form.Group>
							<Form.Group controlId="formBasicPassword">
								<Form.Label style={{marginTop:'5px'}}>비밀번호</Form.Label>
								<Form.Control type="password" placeholder="비밀번호를 입력하세요." style={{ width: '450px' }} />
							</Form.Group>
							<Form.Group style={{marginTop:'10px'}} controlId="formBasicCheckbox">
								<Form.Check type="checkbox" label="자동 로그인" />
							</Form.Group>
							<Button style={{marginTop:'10px'}} variant="outline-dark" type="submit">
								프리타임 로그인
							</Button>
						</Form>
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