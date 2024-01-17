import Button from 'react-bootstrap/esm/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import '../index.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { IoIosSearch } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import MainCarousels from './MainCarousels';
import { PiCoffeeFill } from "react-icons/pi";


const HomePage = () => {
    const navi = useNavigate();
    const [dataSourse, setDataSource] = useState(Array.from({ length: 100 }));
    const [schoolNames, setSchoolNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const location = useLocation();
    const userInfo = { ...location.state };

    const handleGoHome = () => {
        navi('/home');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
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

    const handleMypage = () => {
        navi('/users/mypage');
    }

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
            <Row style={{ justifyContent: 'center' }} className="container text-center">
                <Col style={{ marginBottom: '100px', justifyContent: 'center' }} className='box'>
                    <div style={{ width: '100%' }} className='box-contents'>
                        <div>
                            <div className='image01'>
                                <PiCoffeeFill />
                            </div>
                        </div>
                        <div className='text-center'>
                            <div className='content_text'>
                                <div className='content_title'>
                                    <b>모두가 참여할 수 있는</b>
                                    <br />
                                    <b>프리타임</b>
                                </div>
                                <div style={{ marginTop: '20px', marginLeft: '270px', marginBottom: '10px' }} className='store_links'>
                                    <Button style={{ width: '150px', height: '50px', backgroundColor: 'black', marginLeft: '120px', borderRadius: '20px' }}><a href="https://apps.apple.com/kr/app/%EC%97%90%EB%B8%8C%EB%A6%AC%ED%83%80%EC%9E%84/id642416310" className="applestore"><img src='/images/Apple.png' width='30px' />App Store</a></Button>
                                    <Button style={{ width: '150px', height: '50px', marginLeft: '10px', backgroundColor: 'black', borderRadius: '20px' }}><a href="https://play.google.com/store/apps/details?id=com.everytime.v2&pli=1" className="googleplay"><img src='/images/google.webp' width='30px' style={{ marginRight: '5px' }} />Google Play</a></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginRight: '100px' }}>
                        <aside className='box-sidebar' style={{ position: 'fixed' }}>
                            <div>
                                <div className='freebox' style={{ width: '230px', position: 'absolute' }}>
                                    <div className='sidebox' style={{ backgroundColor: 'white' }}>
                                        <div style={{ marginTop: '30px' }} ><p style={{ fontSize: '60px' }}>프리타임</p>
                                            <div className='content_texts'>
                                                <div style={{ marginTop: '50px' }} className='store_links'>
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
                                                <div className='mt-5'>
                                                    <p><b>내 학교 찾아보기</b></p>
                                                </div>
                                                <input
                                                    className='content_texts'
                                                    style={{ borderRadius: '20px', marginBottom: '20px' }}
                                                    type='search'
                                                    placeholder=" 학교명 입력하세요."
                                                    value={searchTerm}
                                                    onChange={handleSearchChange} />
                                                <i onClick={handleSearchSubmit}
                                                    style={{ marginLeft: '5px' }}
                                                    type="button"><IoIosSearch /></i>
                                                <Button className='content_texts' style={{ marginLeft: '5px', borderRadius: '20px', color: 'black' }} variant="warning" onClick={handleSearchCancel}>검색취소</Button>
                                                <div style={{ marginTop: '5px' }} id="section-items" className='items'>
                                                    <InfiniteScroll
                                                        className='content_texts'
                                                        dataLength={dataSourse.length}
                                                        next={fetchMoreData}
                                                        hasMore={hasMore}
                                                        loader={<p>Loading...</p>}
                                                        endMessage={<p className='mt-3'>마지막입니다...</p>}
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
            <MainCarousels />
        </div>

    );
}

export default HomePage;