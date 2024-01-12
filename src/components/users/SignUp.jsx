import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import UniversityList from '../UniversityList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Post.css';
import Modal from 'react-bootstrap/Modal';
import DaumPostcodeEmbed from 'react-daum-postcode';

const SignUp = () => {
    const [dataSourse, setDataSource] = useState(Array.from({ length: 100 }));
    const [hasMore, setHasMore] = useState(true);
    const [schoolNames, setSchoolNames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSchools, setFilteredSchools] = useState([]);
    const navi = useNavigate();
    const [zonecode, setZonecode] = useState('');
    const [address, setAddress] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({
        uid: '',
        upass: '',
        uname: '',
        photo: '',  // Added 'photo' field for storing the image file
        phone: '',
        zonecode: ''
    });

    const handlePostcodeClick = () => {
        setIsOpen(true);
    };

    const handleComplete = (data) => {
        const { address, zonecode } = data;
        setZonecode(zonecode);
        setAddress(address);
        setFormData({
            ...formData,
            address1:address,
            zonecode:zonecode
        })
        handleClose();
    };

    const handleClose = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    const [formData, setFormData] = useState({
        uid: '',
        upass: '',
        uname: '',
        zonecode: '',
        address1: '',
        address2: ''
    });

    const handleSearchSubmit = () => {
        console.log('검색어:', searchTerm);

        const filteredResults = schoolNames.filter((name) =>
            name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSchools(filteredResults);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = async () => {
        try {
            const response = await axios.post('/users/signup', formData);
            
            if (response.status == 200) {
                alert('회원가입이 성공했습니다.');
                navi('/users/login');
            } else {
                alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('에러:', error.message);
        }
    };

    const fetchMoreData = () => {
        if (dataSourse.length < 100) {
            setTimeout(() => {
                setDataSource(dataSourse.concat(Array.from({ length: 100 })));
            }, 100);
        } else {
            setHasMore(false);
        }
    };


    return (
        <div>
            <i class="bi bi-house-door"
                style={{ marginLeft: '10px', fontSize: '30px', cursor: 'pointer' }}
                onClick={() => navi('/')}
            >
            </i>
            <div style={{ fontSize: '20px' }} className="text-center mt-5">
                <h1>회원가입</h1>
                <div class="my-5 row justify-content-center mx-3">
                    <div class="col-md-6 card p-3">
                        <form>
                            <div className="input-group mb-3">
                                <span className="input-group-text">이메일</span>
                                <input
                                    name="uid"
                                    className="form-control"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">비밀번호</span>
                                <input
                                    name="upass"
                                    type="password"
                                    className="form-control"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">이름</span>
                                <input
                                    name="uname"
                                    className="form-control"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">우편번호</span>
                                <input
                                    name="zonecode"
                                    className="form-control"
                                    onChange={handleInputChange}
                                    value={zonecode}
                                />
                                <br />
                                <div>
                                    <Button style={{borderRadius:'20px', marginLeft:'5px'}} type="button" variant="warning" onClick={handlePostcodeClick}>
                                        검색
                                    </Button>
                                    <Modal show={isOpen} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>주소찾기</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <DaumPostcodeEmbed 
                                                onComplete={handleComplete} 
                                            />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                닫기
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">주소</span>
                                <input
                                    name="address1"
                                    className="form-control"
                                    onChange={handleInputChange}
                                    value={address}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">상세주소</span>
                                <input
                                    name="address2"
                                    className="form-control"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form><br />
                    </div>
                </div>
                <div className="text-center">
                    <div id="wrap">
                        <br />
                        <UniversityList />
                        <InfiniteScroll
                            dataLength={dataSourse.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={<p>Loading...</p>}
                            endMessage={<p className="mt-3">마지막입니다...</p>}
                            height={200}>
                            <Button
                                variant="warning"
                                style={{borderRadius: '20px', fontSize: '20px', color: 'black'}}
                                onClick={handleSignUp}
                            >
                                회원가입
                            </Button>
                            {filteredSchools.map((name, index) => (
                                <div key={index} className="container">
                                    <div className="mt-2">
                                        <Button variant="light">{name}</Button>{' '}
                                        <br />
                                    </div>
                                </div>
                            ))}
                            <div className="container">
                                <div
                                    className="mt-2"
                                    style={{ color: 'black' }}
                                ></div>
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;