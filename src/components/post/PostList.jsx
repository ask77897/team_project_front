import React, { useContext, useEffect, useState } from 'react'
import { Col, InputGroup, Row, Form, Table, Spinner, Button } from 'react-bootstrap'
import { useLocation, useNavigate, NavLink, Link } from 'react-router-dom';
import { BoxContext } from '../BoxContext';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import '../Pagination.css';
import MarkList from '../market/MarkList';

const PostList = () => {

    const { box, setBox } = useContext(BoxContext);
    const size = 5;
    const location = useLocation();
    const navi = useNavigate();
    const path = location.pathname;
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "");
    console.log(path, query, page, size);
    const [postists, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [chcnt, setChcnt] = useState(0);

    const getPostList = async () => {
        const url = `/posts/list.json?query=${query}&page=${page}&size=${size}`;
        setLoading(true);
        const res = await axios(url);
        let list = res.data.list;
        list = list.map(postist => postist && { ...postist, checked: false });
        setPostList(list);
        setTotal(res.data.total);
        console.log(setPostList);
        setLoading(false);
    }

    useEffect(() => {
        getPostList();
    }, [location]);

    useEffect(() => {
        let cnt = 0;
        postists.forEach(postlist => postlist.checked && cnt++);
        setChcnt(cnt);
    }, [postists]);

    const onChangePage = (page) => {
        navi(`${path}?page=${page}&query=${query}&size=${size}`);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`${path}?page=1&query=${query}&size=${size}`);
    };

    const onDelete = async (pid) => {
        if (!window.confirm(`${pid}번 게시판을 삭제하실래요?`)) return;
        const res = await axios.get(`/posts/delete/${pid}` );
        if (res.data === 0) {
            alert("삭제 실패!");
        } else {
            alert("삭제 성공!");
            getPostList();
        }
    };

    const onChangeAll = (e) => {
        const list = postists.map(postlist => postlist && { ...postlist, checked: e.target.checked });
        setPostList(list);
    };

    const onChangeSingle = (e, pid) => {
        const list = postists.map(postlist => postlist.pid === pid ? { ...postlist, checked: e.target.checked } : postlist);
        setPostList(list);
    };

    const onClickDelete = async () => {
        if (chcnt == 0) {
            setBox({
                show: true,
                message: '삭제할 게시판을 선택하세요!'
            })
        } else {
            let count = 0;
            setBox({
                show: true,
                message: `${chcnt}게시판을 삭제 하실래요?`,
                action: async () => {
                    for (const postlist of postists) {
                        if (postlist.checked) {
                            const res = await axios.post('/posts/delete', { pid: postlist.pid });
                            if (res.data === 1) count++;
                        }
                    }
                    setPostList({ show: true, message: `${count}삭제 되었습니다!` });
                    navi(`${path}?page=1&query=${query}&size=${size}`);
                }
            });
        }
    };

    if (loading) return <div className='my-5 text-center'><Spinner variant='primary' /></div>

    return (
        <div><h3 className='my-4'>자유게시판</h3>
        <Row>
            <Col md={4}>
                <form onSubmit={onSubmit}>
                    <label>검색수: {total}건</label>
                    <InputGroup>
                        <Form.Control value={query} onChange={(e) => setQuery(e.target.value)} />
                        <button className='post-view-go-list-btn'>검색</button>
                    </InputGroup>
                </form>
            </Col>
            <div className='text-end'>
                <button className='post-view-go-list-btn' onClick={() => navi('/posts/write')}>게시글쓰기</button>
            </div>
        </Row>
        <hr />
        <Table>
            <thead>
                <tr className='text-center'>
                    <th>글번호</th><th>글제목</th><th>작성자</th><th>작성일</th>
                    <td><input checked={postists.length === chcnt}
                        type='checkbox' onChange={onChangeAll} /></td>
                </tr>
            </thead>
            <tbody className='text-center'>
                {postists.map(postlist =>
                    <tr key={postlist.pid}>
                        <td>{postlist.pid}</td>
                        <td width="30%">
                            <div className='ellipsis'>
                                <NavLink to={`/posts/read/${postlist.pid}`}>{postlist.title}</NavLink>
                            </div>
                        </td>
                        <td>{postlist.writer}</td>
                        <td>{postlist.regdate}</td>
                        <td><input onChange={(e) => onChangeSingle(e, postlist.pid)}
                            type='checkbox' checked={postlist.checked} /></td>
                        <td><Button onClick={() => onDelete(postlist.pid)}
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
    )

}

export default PostList; 