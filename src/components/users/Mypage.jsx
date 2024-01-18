import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Spinner, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const MyPage = () => {
    const navi = useNavigate();
    const location = useLocation();
    const ref_file = useRef(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        uid: '',
        email: '',
        phone: '',
        upass: '',
        uname: '',
        address1: '',
        address2: '',
        fmtdate: '',
        fmtmodi: '',
        image: '',
        file: null
    });

    const { uid, email, phone, uname, address1, address2, fmtdate, fmtmodi, image } = user;

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
            image: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        });
    }


    const formatDateTime = (datetimeString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const datetime = new Date(datetimeString);
        return datetime.toLocaleDateString(undefined, options);
    };

    const handleUpdate = async () => {
        try {
            const updatedUser = {
                ...user,
                fmtmodi: formatDateTime(new Date()), // 현재 시간으로 수정일 업데이트
            };

            const res = await axios.post('/users/update', user);

            if (res.data === 0) {
                console.log(res.data);
                alert('정보가 수정되었습니다.');
                getUser(); // 수정 후 다시 사용자 정보 가져오기
                navi('/users/mypage');
            } else {
                alert('정보수정이 실패했습니다.');
            }
        } catch (error) {
            console.error('정보 수정 중 에러 발생:', error);
            alert('정보 수정 중 에러가 발생했습니다.');
        }
    };
    useEffect(() => {
        getUser();
    }, []);


    if (loading) return <div className='my-5 text-center'><Spinner variant='dark' /></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>마이페이지</h1>
            <Row className='justify-content-center mx-3'>
                <Col md={8}>
                    <Card className='p-5'>
                        <div>
                            <label htmlFor="fileInput">
                                <img
                                    src={image || "http://via.placeholder.com/200x200"}
                                    width="300"
                                    className='image'
                                    style={{borderRadius:'20px'}}// 이미지 클릭 시 커서를 포인터로 변경
                                />
                            </label>
                            <input
                                id="fileInput"
                                onChange={onChangeFile}
                                style={{ display: 'none' }}
                            />
                            <br />
                            <hr />
                        </div>
                        <div>
                            <div className='mb-2'>이름: {uname}</div>
                            <div className='mb-2'>번호: {phone}</div>
                            <div className='mb-2'>주소: {address1} {address2}</div>
                            <div className='mb-2'>가입일: {fmtdate}</div>
                            <div className='mb-2'>수정일: {fmtmodi}</div>
                            <hr />
                            <Button style={{ borderRadius: '20px', color: 'black' }} variant="warning" size="sm" onClick={() => navi('/users/update')}>정보수정</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MyPage