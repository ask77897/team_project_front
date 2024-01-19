import React, { useContext, useEffect, useState } from 'react'
import { Col, InputGroup, Row, Form, Table, Spinner, Button } from 'react-bootstrap'
import { useLocation, useNavigate, NavLink, Link, useParams } from 'react-router-dom';
import { BoxContext } from '../BoxContext';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import '../Pagination.css';

const CommentList = ({sid}) => {
    const { box, setBox } = useContext(BoxContext);
    const size = 5;
    const location = useLocation();
    const navi = useNavigate();
    const path = location.pathname;
    const search = new URLSearchParams(location.search);
    const [page, setPage] = useState(1);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [body, setBody] = useState("");

    const getComment = async () => {
        const url = `/market/comment/list.json?sid=${sid}&page=${page}&size=${size}`;
        setLoading(true);
        const res = await axios(url);
        let list = res.data.list.map(c => c && { ...c, ellipsis: true, view: true, text: c.body});
        setComments(list);
        setTotal(res.data.total);
        console.log(res.data);
        setLoading(false);
    }

    const onRegister = async () => {
        if(body==""){
            alert("내용을 입력해주세요.")
        }else{
            const data = {sid, uid:sessionStorage.getItem("uid"), body}
            await axios.post(`/market/comment/insert`, data);
            setBody('');
            getComment();
        }
    }

    useEffect(() => {
        getComment();
    }, [page]);

    const onClickLogin = () => {
        sessionStorage.setItem("target", `/market/read/${sid}`);
        window.location.href = "/users/login"
    }
    const onClickBody = (mcid) => {
        const data = comments.map(c => c.mcid === mcid ? { ...c, ellipsis: !c.ellipsis } : c);
        setComments(data);
    }
    const onDelete = async (mcid) => {
        if (window.confirm(`${mcid}번 리뷰를 삭제하시겠습니까?`)) {
            await axios.post(`/market/comment/delete/${mcid}`);
            getComment();
        }
    }
    const onClickUpdate = (mcid) => {
        const data = comments.map(c => c.mcid === mcid ? { ...c, view: false } : c);
        setComments(data);
    }
    const onClickCancel = (mcid) => {
        const data = comments.map(c => c.mcid === mcid ? { ...c, view: true, body:c.text } : c);
        setComments(data);
    }
    const onChangeBody = (e, mcid) => {
        const data = comments.map(c => c.mcid === mcid ? { ...c, body: e.target.value } : c);
        setComments(data);
    }
    const onClickSave = async (mcid, body, text) => {
        if(body===text){
            onClickCancel(mcid);
        }else{
            if(window.confirm(`댓글을 수정하시겠습니까?`)){
                await axios.post(`/market/comment/update`, {mcid, body});
                alert("수정되었습니다.");
                getComment();
            }
        }
    }


    if (loading) return <div className='my-5 text-center'><Spinner variant='primary' /></div>
    return (
        <div>
            <hr/>
            {sessionStorage.getItem("uid") ?
                <div>
                    <Form.Control as="textarea" rows={5} placeholder='내용를 입력해주세요' onChange={(e) => setBody(e.target.value)} value={body} />
                    <div className='text-end mt-2'>
                        <Button variant='warning btn-sm px-3 me-2' style={{ marginLeft: '5px', borderRadius: '20px',  fontSize: '13px', color: 'black' }} onClick={onRegister}>등록</Button>
                        <Button variant='outline-warning btn-sm px-3' style={{ backgroundColor: 'dark', borderRadius: '20px', fontSize: '13px', color: 'black' }} type='reset'>취소</Button>
                    </div>
                </div>
                :
                <div className='mb-5'>
                    <Button className='w-100' onClick={onClickLogin}>로그인</Button>
                </div>
            }
            <div className='text-end mt-2'><span>댓글수:{total}</span></div>
            <hr />
            <div className='my-5'>
                {comments.map(c =>
                    <div key={c.mcid}>
                        <div className='text-start'>
                            <small>{c.uid}</small>
                            <small>({c.regdate})</small>
                        </div>
                        {c.view ?
                            <>
                                <div className={c.ellipsis && "ellipsis2"}  onClick={() => onClickBody(c.mcid)} style={{ cursor: 'pointer' , textAlign: 'start' }}>[{c.mcid}] {c.text}</div>
                                {sessionStorage.getItem("uid") === c.uid &&
                                    <div className='text-end'>
                                        <Button onClick={() => onClickUpdate(c.mcid)} variant='warning btn-sm' style={{ marginLeft: '5px', borderRadius: '20px',  fontSize: '13px', color: 'black' }}>수정</Button>
                                        <Button onClick={() => onDelete(c.mcid)} variant='outline-warning btn-sm ms-2' style={{ backgroundColor: 'dark', borderRadius: '20px', fontSize: '13px', color: 'black' }}>삭제</Button>
                                    </div>
                                }
                            </>
                            :
                            <div>
                                <Form.Control as="textarea" rows={5} value={c.body} onChange={(e)=>onChangeBody(e, c.mcid)} />
                                <div className='text-end mt-2'>
                                    <Button variant='warning btn-sm'  onClick={()=>onClickSave(c.mcid, c.body, c.text)} style={{ backgroundColor: 'dark', borderRadius: '20px', fontSize: '13px', color: 'black' }}>저장</Button>
                                    <Button variant='outline-warning btn-sm ms-2' style={{ backgroundColor: 'dark', borderRadius: '20px', fontSize: '13px', color: 'black' }} onClick={() => onClickCancel(c.mcid)}>취소</Button>
                                </div>
                            </div>
                        }
                        <hr />
                    </div>
                )}
            </div>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page)=>setPage(page)} />
            }
        </div>
    )
}

export default CommentList