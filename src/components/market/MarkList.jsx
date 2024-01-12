import React, { useContext, useEffect, useState } from 'react'
import { Col, InputGroup, Row, Form, Table, Spinner, Button, Badge } from 'react-bootstrap'
import { useLocation, useNavigate, NavLink, Link } from 'react-router-dom';
import { BoxContext } from '../BoxContext';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import '../Pagination.css';
import { IoMdSearch } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const MarkList = () => {

    const { box, setBox } = useContext(BoxContext);
    const size = 10;
    const location = useLocation();
    const navi = useNavigate();
    const path = location.pathname;
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "");
    //console.log(path, query, page, size);
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
    }, [location, query, page, size]);

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
        // 검색 버튼 클릭 시 페이지를 1로 초기화하여 새로운 데이터를 불러옴
        navi(`${path}?page=1&query=${query}&size=${size}`);
    };

    const onDelete = async (sid) => {
        if (!window.confirm(`${sid}번 도서를 삭제하실래요?`)) return;
        const res = await axios.get(`/market/delete`);
        if (res.data === 0) {
            alert("삭제 실패!");
        } else {
            alert("삭제되었습니다.");
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
                            const res = await axios.get(`/market/delete`, { sid: markets.sid });
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
        <div className='content_texts'><h3 className='my-4'>중고서적 장터</h3>
            <Row>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <label>검색수: {total}권</label>
                        <InputGroup>
                            <Form.Control value={query} onChange={(e) => setQuery(e.target.value)} />
                            <Button variant='light' style={{ color: 'black', borderRadius: '20px', fontSize: '13px', marginLeft: '10px' }}><IoMdSearch /> </Button>
                        </InputGroup>
                    </form>
                </Col>
                <div className='text-end'>
                    <Button variant='warning' style={{ color: 'black', borderRadius: '20px', fontSize: '13px' }} onClick={() => navi('/market/insert')}>게시글쓰기</Button>
                </div>
            </Row>
            <hr />
            <Table>
                <thead>
                    <tr className='text-center'>
                        <td><input checked={markets.length === chcnt}
                            type='checkbox' onChange={onChangeAll} /></td><th>글번호</th><th>제목</th><th>작성자</th><th>작성일</th><th>가격</th><th>상태</th>
                        <td>
                            <Button variant='light' style={{ color: 'black', borderRadius: '20px', fontSize: '13px' }}
                                onClick={onClickDelete}>선택삭제<MdDeleteForever /></Button>
                        </td>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {markets.map(market =>
                        <tr key={market.sid}>
                            <td><input onChange={(e) => onChangeSingle(e, market.sid)}
                                type='checkbox' checked={market.checked} /></td>
                            <td>{market.sid}</td>
                            <td width="30%">
                                <Link to={`/market/read/${market.sid}`}>
                                    <div className='ellipsis'>{market.title}<Badge bg="secondary" >New</Badge></div>
                                </Link>
                            </td>
                            <td>{market.uid}</td>
                            <td>{market.fmtdate}</td>
                            <td>{market.fmtprice}</td>
                            <td>{market.category}</td>
                            <td><Button variant='light' style={{ color: 'black', borderRadius: '20px', fontSize: '13px' }} onClick={() => onDelete(market.sid)}
                                size='sm'><RiDeleteBinLine /></Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
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