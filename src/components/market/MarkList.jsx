import React, { useContext, useEffect, useState } from 'react'
import { Col, InputGroup, Row, Form, Table, Spinner, Button } from 'react-bootstrap'
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { BoxContext } from '../BoxContext';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import '../Pagination.css';

const MarkList = () => {

    const { box, setBox } = useContext(BoxContext);
    const size = 5;
    const location = useLocation();
    const navi = useNavigate();
    const path = location.pathname;
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "");
    console.log(path, query, page, size);
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [chcnt, setChcnt] = useState(0);

    const getMarkets = async () => {
        const url = `/market/list.json?query=${query}&page=${page}&size=${size}`;
        setLoading(true);
        const res = await axios(url);
        let list = res.data.list;
        list = list.map(market => market && { ...market, checked: false });
        setMarkets(list);
        setTotal(res.data.total);
        console.log(setMarkets);
        setLoading(false);
    }

    useEffect(() => {
        getMarkets();
    }, [location]);

    useEffect(() => {
        let cnt = 0;
        markets.forEach(market => market.checked && cnt++);
        setChcnt(cnt);
    }, [markets]);

    const onChangePage = (page) => {
        navi(`${path}?page=${page}&query=${query}&size=${size}`);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`${path}?page=1&query=${query}&size=${size}`);
    };

    const onDelete = async (sid) => {
        if (!window.confirm(`${sid}번 도서를 삭제하실래요?`)) return;
        const res = await axios.get(`/market/delete/${sid}`);
        if (res.data === 0) {
            alert("삭제 실패!");
        } else {
            alert("삭제 성공!");
            getMarkets();
        }
    };

    const onChangeAll = (e) => {
        const list = markets.map(market => market && { ...market, checked: e.target.checked });
        setMarkets(list);
    };

    const onChangeSingle = (e, sid) => {
        const list = markets.map(market => market.sid === sid ? { ...market, checked: e.target.checked } : market);
        setMarkets(list);
    };

    const onClickDelete = async (sid) => {
        if (chcnt == 0) {
            setBox({
                show: true,
                message: '삭제할 도서를 선택하세요!'
            })
        } else {
            let count = 0;
            setBox({
                show: true,
                message: `${chcnt}권 도서를 삭제 하실래요?`,
                action: async () => {
                    for (const market of markets) {
                        if (market.checked) {
                            const res = await axios.post(`/market/delete`, { sid: markets.sid });
                            if (res.data === 1) count++;
                        }
                    }
                    setMarkets({ show: true, message: `${count}권 삭제 되었습니다!` });
                    navi(`${path}?page=1&query=${query}&size=${size}`);
                }
            });
        }
    };

    if (loading) return <div className='my-5 text-center'><Spinner variant='primary' /></div>

    return (
        <div><h3 className='my-4'>중고서적 장터</h3>
            <Row>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <label>검색수: {total}권</label>
                        <InputGroup>
                            <Form.Control value={query} onChange={(e) => setQuery(e.target.value)} />
                            <button className='post-view-go-list-btn'>검색</button>
                        </InputGroup>
                    </form>
                </Col>
                <div className='text-end'>
                    <button className='post-view-go-list-btn' onClick={() => navi('/market/write')}>게시글쓰기</button>
                </div>
            </Row>
            <hr />
            <Table>
                <thead>
                    <tr className='text-center'>
                        <th>글번호</th><th>제목</th><th>작성자</th><th>작성일</th><th>가격</th><th>상태</th>
                        <td><input checked={markets.length === chcnt}
                            type='checkbox' onChange={onChangeAll} /></td>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {markets.map(market =>
                        <tr key={market.sid}>
                            <td>{market.sid}</td>
                            <td width="30%">
                                <div className='ellipsis'>
                                    <NavLink to={`/market/read/${market.sid}`}>{market.title}</NavLink>
                                </div>
                            </td>
                            <td>{market.uid}</td>
                            <td>{market.fmtdate}</td>
                            <td>{market.fmtprice}</td>
                            <td>{market.category}</td>
                            <td><input onChange={(e) => onChangeSingle(e, market.sid)}
                                type='checkbox' checked={market.checked} /></td>
                            <td><Button onClick={() => onDelete(market.sid)}
                                size='sm' variant="info">삭제</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='text-end'>
                <button className='post-view-go-list-btn'
                    onClick={onClickDelete}>선택삭제</button>
            </div>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={onChangePage} />
            }
        </div>
    );
}

export default MarkList;