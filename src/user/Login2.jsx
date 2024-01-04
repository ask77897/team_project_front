import React from 'react'
import { Button } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import UniversityList from '../mainpage/UniversityList';
import Form from 'react-bootstrap/Form';


const Login2 = () => {

    const [dataSourse, setDataSource] = useState(Array.from({ length: 100 }));
    const [hasMore, setHasMore] = useState(true)
    const fetchMoreData = () => {
        if (dataSourse.length < 100) {
            setTimeout(() => {
                setDataSource(dataSourse.concat(Array.from({ length: 100 })));
            }, 100)
        } else {
            setHasMore(false);
        }
    }
    return (
        <div style={{ fontSize: '20px'}} className='text-center mt-5'><h1>회원가입</h1>
            <div className="registration-form mt-5">
                <div style={{ marginRight: '100px' }}>
                    <p>
                        <label className='m-3' for="email"></label>
                        이메일: <input type="email" id="email" name="email" placeholder="이메일을 입력하세요." required />
                    </p>
                    <span>
                        <label className='m-2' for="password"></label>
                        비밀번호: <input style={{ marginTop: '10%' }} className='mt-2' type="password" id="password" name="password" placeholder="비밀번호를 입력하세요." required />
                    </span>
                    <p>
                        <label className='m-4 ' for="username"></label>
                        이름: <input style={{ marginLeft: '6px' }} type="text" id="username" name="username" placeholder="이름을 입력하세요." required />
                    </p>
                    <span>
                        <label className='m-4 ' for="username"></label>
                        <input style={{ marginLeft: '92px', backgroundColor: "EDEDED" }} type="search" placeholder='학교명을 입력하세요.' /><i type="button" className="bi bi-search m-2"></i>
                    </span>
                </div>
                <div className='text-center'>
                    <div id="wrap">
                        <br />
                        <UniversityList />
                        <InfiniteScroll
                            dataLength={dataSourse.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={<p>Loading...</p>}
                            endMessage={<p className='mt-3'>마지막입니다...</p>}
                            height={200}>
                            <div className='container'>
                                <div className='mt-2' style={{ color: 'black' }}>
                                </div>
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
            <Button style={{ backgroundColor: "skyblue"}}>회원가입</Button>
        </div>
    );
}

export default Login2