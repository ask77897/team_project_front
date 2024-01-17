import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Spinner, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";

const MyPage = () => {
    const navi = useNavigate();
    const location = useLocation();
    const ref_file = useRef(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        uid: '',
        email:'',
        upass: '',
        uname: '',
        address1: '',
        address2: '',
        fmtdate: '',
        fmtmodi: '',
        photo: '',
        file: null
    });

    const {uid,email, uname, address1, address2, fmtdate, fmtmodi, photo } = user;

    const getUser = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`/users/read?uid=${sessionStorage.getItem("uid")}`);
            setUser(response.data);
        } catch (error) {
            console.error('사용자 정보를 불러오는 중 오류가 발생했습니다.', error);
        } finally {
            setLoading(false);
        }
    }

    const onChangeFile = (e) => {
        setUser({
            ...user,
            photo: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        });
    }

    useEffect(() => {
        getUser();
    }, []);

    if (loading) return <div className='my-5 text-center'><Spinner variant='dark' /></div>
    return (
        <div className='my-5'>
            <i class="bi bi-house-door"
                style={{ marginLeft: '10px', fontSize: '30px', cursor: 'pointer' }}
                onClick={() => navi('/')}></i>
            <h1 className='text-center mb-5'>마이페이지</h1>
            <Row className='justify-content-center mx-3'>
                <Col md={8}>
                    <Card className='p-5'>
                        <div>
                            <img onClick={() => ref_file.current.click()}
                                src={photo || "http://via.placeholder.com/200x200"} width="100" className='photo' />
                            <input type="file" ref={ref_file} onChange={onChangeFile} style={{ display: 'none' }} />
                            <br />
                            <hr />
                        </div>
                        <div>
                            <div className='mb-2'>이름: {uname}</div>
                            <div className='mb-2'>주소: {address1} {address2}</div>
                            <div className='mb-2'>가입일: {fmtdate}</div>
                            <div className='mb-2'>수정일: {fmtmodi}</div>
                            <hr />
                            <Button style={{ borderRadius: '20px', color:'black' }} variant="warning" size="sm" onClick={() => navi('/users/update')}>정보수정</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MyPage