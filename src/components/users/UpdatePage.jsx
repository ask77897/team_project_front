import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { InputGroup, Form, Button, Col, Row, Spinner, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModalPostCode from './ModalPostCode';
import { IoHomeSharp } from "react-icons/io5";

const UpdatePage = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const ref_file = useRef(null);
    const [user, setUser] = useState({
        uid: '',
        email:'',
        upass: '',
        uname: '',
        photo: '',
        phone: '',
        address1: '',
        address2: ''
    });
    const { uid,email, upass, uname, photo, phone, address1, address2 } = user;
    const [imageFile, setImageFile] = useState(null);

    const onChangeFile = (e) => {
        setUser({
            ...user,
            photo: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        });


        console.log(">>>>>>>>>" + user);
    }

    const getUser = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/users/read/${sessionStorage.getItem('uid')}`);
            console.log(res);
            setUser(res.data);
        } catch (error) {
            console.error('사용자 정보를 가져오는 중 에러 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const onImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };
    
    const onUpdate = async (e) => {
        e.preventDefault();
        if (window.confirm('정보를 수정하실래요?')) {
            const res = await axios.post('/users/update', user);
            if (res.data == 1) {
                alert("정보가 수정되었습니다.");
                navi('/users/mypage');
            } else {
                alert("정보수정이 실패했습니다.");
            }
        }
    }

    if (loading) return <div className='my-5 text-center'><Spinner variant='dark' /></div>;

    return (
        <div className='my-5'>
            <i class="bi bi-arrow-left"
                style={{ fontSize: '30px', cursor: 'pointer' }}
                onClick={() => navi('/users/mypage')}
            >
            </i>
            <i class="bi bi-house-door"
                style={{ marginLeft: '10px', fontSize: '30px', cursor: 'pointer' }}
                onClick={() => navi('/')}>
            </i>
            <h1 className='text-center mb-5'>정보수정</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <Card className='p-5'>
                        <div>
                            <img onClick={() => ref_file.current.click()}
                                src={photo || "http://via.placeholder.com/200x200"} width="100" className='photo' />
                            <input type="file" ref={ref_file} onChange={onChangeFile} style={{ display: 'none' }} />
                            <br />
                            <hr />
                        </div>
                        <form onSubmit={onUpdate}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>이름</InputGroup.Text>
                                <Form.Control value={uname} name="uname" onChange={onChange} />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>전화</InputGroup.Text>
                                <Form.Control value={phone} name="phone" onChange={onChange} />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>주소</InputGroup.Text>
                                <Form.Control value={address1} name="address1" onChange={onChange} readOnly />
                                <ModalPostCode user={user} setUser={setUser} />
                            </InputGroup>
                            <Form.Control placeholder='상세주소' name="address2" value={address2} onChange={onChange} />
                            <div className='text-center my-3'>
                                <Button style={{borderRadius:'20px'}} variant="warning" className='me-2' type="submit">저장</Button>
                                <Button style={{borderRadius:'20px',color:'black'}} variant="outline-warning" onClick={() => getUser()}>취소</Button>
                            </div>
                        </form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}


export default UpdatePage