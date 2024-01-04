import Button from 'react-bootstrap/esm/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';

const HomePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [dataSourse, setDataSource] = useState(Array.from({ length: 100 }));
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
    const fetchMoreData = () => {
        if (dataSourse.length < 100) {
            setTimeout(() => {
                setDataSource(dataSourse.concat(Array.from({ length: 100 })));
            }, 200)
        } else {
            setHasMore(false);
        }
    }

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
                                <div style={{marginTop:'50px'}} className='store_links'>
                                    <Button style={{width:'150px', height:'50px', backgroundColor:'black', marginLeft:'120px', borderRadius: '20px'}}><a href="https://apps.apple.com/kr/app/%EC%97%90%EB%B8%8C%EB%A6%AC%ED%83%80%EC%9E%84/id642416310" className="applestore"><img src='/images/Apple.png' width='30px' />App Store</a></Button>
                                    <Button style={{width:'150px', height:'50px', marginLeft:'10px', backgroundColor:'black', borderRadius: '20px'}}><a href="https://play.google.com/store/apps/details?id=com.everytime.v2&pli=1" className="googleplay"><img src='/images/google.webp' width='30px'style={{marginRight:'5px'}} />Google Play</a></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{marginRight:'100px'}}>
                        <aside className='box-sidebar' style={{ position: 'fixed' }}>
                            <div className='mt-4'>
                                <div style={{ width: '220px',  position: 'absolute' }}>
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
                                                    dataLength={dataSourse.length}
                                                    next={fetchMoreData}
                                                    hasMore={hasMore}
                                                    loader={<p>Loading...</p>}
                                                    endMessage={<p className='mt-3'>마지막입니다...</p>}
                                                    height={250}>
                                                    {dataSourse.map((item, index) => {
                                                        return (
                                                            <div className='container'>
                                                                <div className='mt-2' style={{ color: 'black' }}><i class="bi bi-chevron-right"><Button style={{ borderRadius: '20px' }} variant='outline-dark mt-1'>서울대학교</Button></i><br />
                                                                </div>
                                                            </div>
                                                        )
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
