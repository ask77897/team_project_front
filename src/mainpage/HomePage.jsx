import Button from 'react-bootstrap/esm/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useState, useEffect } from 'react';

const HomePage = () => {
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);

    // const [dataSourse, setDataSource] = useState([]);
    const [schoolNames, setSchoolNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true)
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        // 여기에서 검색어(searchTerm)를 이용하여 API 호출 또는 검색 로직을 구현할 수 있습니다.
        console.log('검색어:', searchTerm);

        // 예를 들어, 여기에서 API 호출하거나 검색 로직을 실행할 수 있습니다.
        // fetchData(searchTerm);
    };

    useEffect(() => {
        const apiUrl = 'https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=182d16ae47f512d7f7416deff20ed926&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list&perPage=475';

        fetch(apiUrl)
            .then(response => response.json())
            .then(resultData => {
                // "content" 배열에서 "schoolName" 속성만을 추출하여 새로운 배열 생성
                const extractedSchoolNames = resultData.dataSearch.content.map(item => item.schoolName);

                setSchoolNames(extractedSchoolNames);
                setLoading(false);
                setHasMore(false);
            })
            .catch(error => {
                console.error('데이터를 불러오는 중 오류가 발생했습니다.', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='wrap'>
            <div className="container text-center">
                <section className='box'>
                    <div style={{ width: '100%' }} className='box-contents'>
                        <div>
                            <div className='image01'>
                                <i className="bi bi-airplane-engines"></i>
                            </div>
                        </div>
                        <div className='text-center'>
                            <div className='content_text'>
                                <div className='content_title'>
                                    <b>모두가 참여할 수 있는</b>
                                    <br />
                                    <b>프리타임</b>
                                </div>
                                <div style={{ marginTop: '50px' }} className='store_links'>
                                    <Button style={{ width: '150px', height: '50px', backgroundColor: 'black', marginLeft: '120px', borderRadius: '20px' }}><a href="https://apps.apple.com/kr/app/%EC%97%90%EB%B8%8C%EB%A6%AC%ED%83%80%EC%9E%84/id642416310" className="applestore"><img src='/images/Apple.png' width='30px' />App Store</a></Button>
                                    <Button style={{ width: '150px', height: '50px', marginLeft: '10px', backgroundColor: 'black', borderRadius: '20px' }}><a href="https://play.google.com/store/apps/details?id=com.everytime.v2&pli=1" className="googleplay"><img src='/images/google.webp' width='30px' style={{ marginRight: '5px' }} />Google Play</a></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginRight: '100px' }}>
                        <aside className='box-sidebar' style={{ position: 'fixed' }}>
                            <div className='mt-4'>
                                <div style={{ width: '220px', position: 'absolute' }}>
                                    <div style={{ backgroundColor: 'white' }}>
                                        <div style={{ marginTop: '30px' }} ><a style={{ fontSize: '35px' }}><b>프리타임</b></a>
                                            <div className='text-center mt-5'>
                                                <Button style={{ borderRadius: '20px' }} className='m-2' variant="outline-dark"><a href='../user/login'>로그인</a></Button>
                                                <Button style={{ backgroundColor: 'skyblue', borderRadius: '20px' }} variant="outline-dark"><a href='../user/login2'>회원가입</a></Button>
                                            </div>
                                            <hr />
                                            <div className='mt-5'>
                                                <p><b>내 학교 찾아보기</b></p>
                                            </div>
                                            <input
                                                style={{ borderRadius: '20px', marginBottom: '20px' }}
                                                type='search'
                                                placeholder=" 학교명 입력하세요."
                                                value={searchTerm}
                                                onChange={handleSearchChange} />
                                            <i onClick={handleSearchSubmit} style={{ marginLeft: '5px' }} type="button" className="bi bi-search"></i>

                                            <div id="section-items" className='items'>
                                                <InfiniteScroll
                                                    dataLength={schoolNames.length}
                                                    hasMore={hasMore}
                                                    loader={<p>Loading...</p>}
                                                    endMessage={<p className='mt-3'>마지막입니다...</p>}
                                                    height={250}>
                                                    {schoolNames.map(name => {
                                                        if (loading) {
                                                            return <p>Loading...</p>;
                                                        } else {
                                                            return (
                                                                <div className='container'>
                                                                    <div className='mt-2'>
                                                                        <Button variant="light">{name}</Button>{' '}<br />
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </InfiniteScroll>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default HomePage;
