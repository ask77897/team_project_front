import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosSearch, IoMdMenu } from 'react-icons/io';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import '../index.css';

const HomePage = () => {
    const navi = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [dataSourse, setDataSource] = useState(Array.from({ length: 100 }));
    const [schoolNames, setSchoolNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userImage, setUserImage] = useState('');
    const [userName, setUserName] = useState('');

    const handleHamburgerClick = () => {
        setShowSidebar(!showSidebar);
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`/users/read?uid=${sessionStorage.getItem("uid")}`);
            const userData = response.data;

            setUserImage(userData.image || "http://via.placeholder.com/50x50"); // 사용자 이미지가 없을 경우 기본 이미지 설정
            setUserName(userData.uname);
        } catch (error) {
            console.error('사용자 데이터를 불러오는 데 실패했습니다:', error);
        }
    };

    useEffect(() => {
        api();
        if (sessionStorage.getItem("uid") != null) {
            setIsLoggedIn(true);
            fetchUserData();
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleGoHome = () => {
        navi('/home');
    };

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        if (newSearchTerm === '') {
            setFilteredSchools(schoolNames);
        } else {
            const filteredResults = schoolNames.filter(name =>
                name.toLowerCase().includes(newSearchTerm.toLowerCase())
            );
            setFilteredSchools(filteredResults);
        }
    };

    const handleSearchSubmit = () => {
        console.log('검색어:', searchTerm);
        const filteredResults = schoolNames.filter(name =>
            name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSchools(filteredResults);
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

    const handleLogout = () => {
        sessionStorage.removeItem('uid');
        setIsLoggedIn(false);
    };

    const handleSearchCancel = () => {
        setSearchTerm('');
        setFilteredSchools(schoolNames);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };
    function api() {
        const apiUrl = 'https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=182d16ae47f512d7f7416deff20ed926&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list&perPage=475';

        fetch(apiUrl)
            .then((response) => response.json())
            .then((resultData) => {
                const extractedSchoolNames = resultData.dataSearch.content.map(
                    (item) => item.schoolName
                );

                setSchoolNames(extractedSchoolNames);
                setFilteredSchools(extractedSchoolNames); // 검색 전에는 전체 대학교 정보를 보여줌
                setLoading(false);
                setHasMore(false);
            })
            .catch((error) => {
                console.error('데이터를 불러오는 중 오류가 발생했습니다.', error);
                setLoading(false);
            });
    }

    useEffect(() => {
        api();
        if (sessionStorage.getItem("uid") != null) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

    }, []);

    return (
        <div className='wrap'>
            {/* 모바일 화면에서만 햄버거 아이콘을 보여줌 */}
            <div className={`hamburger-icon ${showSidebar ? 'hide-on-mobile' : ''}`} onClick={handleHamburgerClick}>
                <GiHamburgerMenu style={{ fontSize: '40px', position: 'fixed', top: '90px', right: '10px'}}/>
            </div>
            <Row style={{ justifyContent: 'center', marginRight: '400px' }} className="container text-center">
                <Col className='box'>
                    <div style={{ width: '1000px' }} className='box-contents'>
                        <div style={{ marginLeft: '500px' }}>
                            <img style={{ width: '900px', borderRadius: '15px', marginTop: '15px' }} src='https://img.freepik.com/free-photo/coffee-ai-generated_23-2150691619.jpg' alt='Coffee' />
                        </div>
                    </div>
                    <div>
                        {/* PC 화면에서 사이드바를 보여주지 않음 */}
                        <aside className={`box-sidebar ${showSidebar ? 'show' : ''}`}>
                            <div>
                                <div className='freebox' style={{ width: '230px', position: 'absolute', marginTop: '0px' }}>
                                    <div className='sidebox' style={{ backgroundColor: 'white' }}>
                                        <div style={{ marginTop: '30px' }}>
                                            <p style={{ fontSize: '45px' }}><b>프리타임</b></p>
                                            <div className='content_texts'>
                                                {isLoggedIn && (
                                                    <div>
                                                        <img style={{ borderRadius: '15px' }} src={userImage} alt="사용자" width="150" className='user-photo' />
                                                        <div className='user-name'>{userName}님</div>
                                                    </div>
                                                )}
                                                <div className='store_links'>
                                                    {isLoggedIn ? (
                                                        <Button style={{ borderRadius: '20px', fontSize: '13px' }} className='m-2' variant="warning" onClick={handleLogout}>로그아웃</Button>
                                                    ) : (
                                                        <>
                                                            <Button style={{ borderRadius: '20px', fontSize: '13px', color: 'black' }} className='m-2' variant="warning" onClick={() => navi('../users/login')}>
                                                                로그인
                                                            </Button>
                                                            <Button style={{ backgroundColor: 'dark', borderRadius: '20px', fontSize: '13px', color: 'black' }} variant="outline-warning" onClick={() => navi('../users/signup')}>
                                                                회원가입
                                                            </Button>
                                                        </>
                                                    )}
                                                    {isLoggedIn && (
                                                        <Button style={{ borderRadius: '20px', fontSize: '13px', color: 'black' }} className='m-2' variant="outline-warning" onClick={() => navi('../users/mypage')}>마이페이지</Button>
                                                    )}
                                                </div>
                                                <hr />
                                                <div>
                                                    <p><b>내 대학교 찾아보기</b></p>
                                                </div>
                                                <input
                                                    className='content_texts'
                                                    style={{ borderRadius: '20px', marginBottom: '20px' }}
                                                    type='search'
                                                    placeholder=" 학교명 입력하세요."
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                    onKeyDown={handleSearchKeyDown} />
                                                <i onClick={handleSearchSubmit}
                                                    style={{ fontSize: '25px', marginLeft: '5px' }}
                                                    type="button"
                                                ><IoIosSearch /></i>
                                                <Button className='content_texts' style={{ marginLeft: '5px', borderRadius: '20px', color: 'black' }} variant="warning" onClick={handleSearchCancel}>검색취소</Button>
                                                <div style={{ marginTop: '5px' }} id="section-items" className='items'>
                                                    <InfiniteScroll
                                                        className='content_texts'
                                                        dataLength={dataSourse.length}
                                                        next={fetchMoreData}
                                                        hasMore={hasMore}
                                                        loader={<p>Loading...</p>}
                                                        height={200}>
                                                        {filteredSchools.map((name, index) => (
                                                            <div key={index} className='container'>
                                                                <div className='mt-2'>
                                                                    <Button variant='light' onClick={handleGoHome}>{name}</Button>{' '}
                                                                    <br />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </InfiniteScroll>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default HomePage;