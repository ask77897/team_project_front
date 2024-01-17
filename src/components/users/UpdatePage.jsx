import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { InputGroup, Form, Button, Col, Row, Spinner, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModalPostCode from './ModalPostCode';

const UpdatePage = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const ref_file = useRef(null);
    const [file, setFile] = useState(null);
    const [user, setUser] = useState({
        uid: '',
        email: '',
        upass: '',
        uname: '',
        photo: '',
        phone: '',
        address1: '',
        address2: ''
    });

    const { uid, uname, phone, address1, address2, photo } = user;

    const onChangeFile = (e) => {
        setFile(e.target.files[0]);
        setUser({
            ...user,
            photo: URL.createObjectURL(e.target.files[0]),
        });
    };

    const onSaveImage = async () => {
        if (!file) {
            return;
        }

        if (window.confirm("이미지를 변경하실래요?")) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("uid", uid);
            formData.append("uname", uname);
            formData.append("phone", phone);
            formData.append("address1", address1);
            formData.append("address2", address2);

            try {
                // 이미지 업로드 후 최신 사용자 정보를 가져오기
                const response = await axios.post("/users/upload", formData);
                alert("변경완료");
                setFile(null);
                setUser(response.data);
            } catch (error) {
                console.error('이미지 업로드 중 에러 발생:', error);
                alert('이미지 업로드 중 에러가 발생했습니다.');
            }
        }
    };

    const getUser = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/users/read?uid=${sessionStorage.getItem('uid')}`);
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

    const onUpdate = async (e) => {
        e.preventDefault();
        try {
            if (window.confirm('정보를 수정하실래요?')) {
                setUser({
                    ...user,
                    uid: sessionStorage.getItem('uid'),
                });

                const res = await axios.post('/users/update', user);
                if (res.data) {
                    alert("정보가 수정되었습니다.");
                    getUser();
                    navi('/users/mypage');
                } else {
                    alert("정보수정이 실패했습니다.");
                }
            }
        } catch (error) {
            console.error('정보 수정 중 에러 발생:', error);
            alert('정보 수정 중 에러가 발생했습니다.');
        }
    };

    if (loading) return <div className='my-5 text-center'><Spinner variant='dark' /></div>;

    return (
        <div className='my-5'>
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
                                <Button style={{ borderRadius: '20px' }} variant="warning" className='me-2' type="submit" onClick={onSaveImage}>저장</Button>
                                <Button style={{ borderRadius: '20px', color: 'black' }} variant="outline-warning" onClick={() => navi('/users/mypage')}>취소</Button>
                            </div>
                        </form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default UpdatePage;
