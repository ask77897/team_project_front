import React, { useContext, useEffect, useState } from 'react';
import { Col, InputGroup, Row, Form, Table, Spinner, Button, Modal } from 'react-bootstrap';
import { useLocation, useNavigate, NavLink, Link } from 'react-router-dom';
import { BoxContext } from '../BoxContext';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import '../Pagination.css';
import { IoMdSearch } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const PostList = () => {
    const { box, setBox } = useContext(BoxContext);
    const size = 5;
    const location = useLocation();
    const navi = useNavigate();
    const path = location.pathname;
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState(search.get("query") || "");
    const [content, setContent] = useState("");
    const [postlists, setPostLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [chcnt, setChcnt] = useState(0);
    const [selectedPost, setSelectedPost] = useState(null);

    const getPostLists = async () => {
        const url = `/posts/list.json?query=${query}&page=${page}&size=${size}`;
        setLoading(true);

        try {
            const res = await axios(url);
            if (res.data && res.data.list) {
                let list = res.data.list;
                list = list.map(postist => postist && { ...postist, checked: false });
                setPostLists(list);
                setTotal(res.data.total);
            } else {
                console.error("잘못된 응답 데이터 형식");
            }
        } catch (error) {
            console.error("데이터 가져오기 오류:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPostLists();
    }, [location]);

    useEffect(() => {
        let cnt = 0;
        postlists.forEach(postlist => postlist.checked && cnt++);
        setChcnt(cnt);
    }, [postlists]);

    const onChangePage = (page) => {
        navi(`${path}?page=${page}&query=${query}&size=${size}`);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`${path}?page=1&query=${query}&size=${size}`);
    };

    const onDelete = async (pid) => {
        if (window.confirm(`${pid}번 게시판을 삭제하실래요?`)) {
            const res = await axios.get(`/posts/delete/${pid}`);
            if (res.data === 0) {
                alert("삭제 실패!");
            } else {
                alert("삭제 성공!");
                getPostLists();
            }
        }
    };

    const onChangeAll = (e) => {
        const list = postlists.map(postlist => postlist && { ...postlist, checked: e.target.checked });
        setPostLists(list);
    };

    const onChangeSingle = (e, pid) => {
        const list = postlists.map(postlist => postlist.pid === pid ? { ...postlist, checked: e.target.checked } : postlist);
        setPostLists(list);
    };

    const onClickDelete = async () => {
        if (chcnt === 0) {
            setBox({
                show: true,
                message: '삭제할 게시판을 선택하세요!'
            });
        } else {
            let count = 0;
            setBox({
                show: true,
                message: `${chcnt}게시판을 삭제 하실래요?`,
                action: async () => {
                    for (const postlist of postlists) {
                        if (postlist.checked) {
                            const res = await axios.post('/posts/delete', { pid: postlist.pid });
                            if (res.data === 1) count++;
                        }
                    }
                    setPostLists({ show: true, message: `${count}삭제 되었습니다!` });
                    navi(`${path}?page=1&query=${query}&size=${size}`);
                }
            });
        }
    };

    // 추가: 게시글 선택 시 모달에 정보 표시
    const onPostSelect = (post) => {
        setSelectedPost(post);
    };

    // 추가: 모달 닫기
    const closeModal = () => {
        setSelectedPost(null);
    };

    if (loading) return <div className='my-5 text-center'><Spinner variant='primary' /></div>;

    return (
        <div className='content_texts'>
            <h3 className='my-4'>자유게시판</h3>
            <Row>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <label>검색수: {total}건</label>
                        <InputGroup>
                            <Form.Control value={query} onChange={(e) => setQuery(e.target.value)} />
                            <Button variant='warning' style={{ borderRadius: '20px', fontSize: '15px', marginLeft: '10px' }}>검색 <IoMdSearch /></Button>
                        </InputGroup>
                    </form>
                </Col>
                <div className='text-end'>
                    {/* 추가: 게시글쓰기 페이지로 이동하는 버튼 */}
                    <Button variant='warning' style={{ borderRadius: '20px', fontSize: '13px' }} onClick={() => navi('/posts/write')}>게시글쓰기</Button>
                </div>
            </Row>
            <hr />
            <Table>
                <thead>
                    <tr className='text-center'>
                        <td><input checked={postlists.length === chcnt}
                            type='checkbox' onChange={onChangeAll} /></td>
                        <th>글번호</th><th>글제목</th><th>작성자</th><th>작성일</th>
                        <th>
                            <Button variant='light'
                                style={{ borderRadius: '20px', fontSize: '13px' }}
                                onClick={onClickDelete}>선택삭제 <RiDeleteBinLine /></Button>
                        </th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {postlists.map(postlists =>
                        <tr key={postlists.pid}>
                            <td><input onChange={(e) => onChangeSingle(e, postlists.pid)}
                                type='checkbox' checked={postlists.checked} /></td>
                            <td>{postlists.pid}</td>
                            <td width="30%">
                                <div className='ellipsis'>
                                    {/* 추가: 게시글 클릭 시 모달에 정보 표시 */}
                                    <Link to="#" onClick={() => onPostSelect(postlists)}>{postlists.title}</Link>
                                </div>
                            </td>
                            <td>{postlists.writer}</td>
                            <td>{postlists.regdate}</td>
                            <td><Button variant='warning' style={{ borderRadius: '20px', fontSize: '13px' }} onClick={() => onDelete(postlists.pid)}
                                size='sm'><RiDeleteBinLine /></Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* 추가: 게시글 정보를 표시하는 모달 */}
            <Modal show={selectedPost !== null} onHide={closeModal}>
                <Modal.Header closeButton className="d-flex justify-content-between">
                    <Modal.Title>게시글 정보</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* 추가: 선택한 게시글 정보 표시 */}
                    {selectedPost && (
                        <>
                            <p>글번호: {selectedPost.pid}</p>
                            <p>제목: {selectedPost.title}</p>
                            <p>작성자: {selectedPost.writer}</p>
                            <p>내용: {selectedPost.contents}</p>
                            {/* 추가: 닫기 버튼 */}
                            <Button variant="warning" onClick={closeModal}>닫기</Button>
                        </>
                    )}
                </Modal.Body>
            </Modal>

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