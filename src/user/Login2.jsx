import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component';
import UniversityList from '../mainpage/UniversityList';


const Login2 = () => {

    const [dataSourse, setDataSource] = useState(Array.from({ length: 100 }));
    const [hasMore, setHasMore] = useState(true)
    const [schoolNames, setSchoolNames] = useState([]);
    const [loading, setLoading] = useState(true);
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
            }, 100)
        } else {
            setHasMore(false);
        }
    }
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
        <div style={{ fontSize: '20px' }} className='text-center mt-5'><h1>회원가입</h1>
            <div className="registration-form mt-5">
                <div style={{ marginRight: '100px' }}>
                    <p>
                        <label className='m-3' for="email"></label>
                        이메일 : <input type="email" id="email" name="email" placeholder="이메일을 입력하세요." required />
                    </p>
                    <span>
                        <label className='m-2' for="password"></label>
                        비밀번호: <input style={{ marginTop: '10%' }} className='mt-2' type="password" id="password" name="password" placeholder="비밀번호를 입력하세요." required />
                    </span>
                    <p>
                        <label className='m-4 ' for="username"></label>
                        이름 : <input style={{ marginLeft: '6px' }} type="text" id="username" name="username" placeholder="이름을 입력하세요." required />
                    </p>
                    <span>
                        <label className='m-4 ' for="username"></label>
                        <input style={{ marginLeft: '92px', backgroundColor: "EDEDED" }}
                            type="search"
                            placeholder='학교명을 입력하세요.'
                            onChange={handleSearchChange} />
                        <i onClick={handleSearchSubmit} style={{ marginLeft: '5px' }} type="button" className="bi bi-search"></i>
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
                            <div className='container'>
                                <div className='mt-2' style={{ color: 'black' }}>
                                </div>
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
            <Button style={{ backgroundColor: "skyblue" }}>회원가입</Button>
        </div>
    );
}

export default Login2