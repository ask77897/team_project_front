// import React, { useContext, useEffect, useState } from 'react'
// import { Col, InputGroup, Row, Form, Table, Spinner, Button } from 'react-bootstrap'
// import { useLocation, useNavigate, NavLink, Link, useParams } from 'react-router-dom';
// import { BoxContext } from '../BoxContext';
// import axios from 'axios';
// import Pagination from 'react-js-pagination';
// import '../Pagination.css';

// const CommentList = () => {

//     const { box, setBox } = useContext(BoxContext);
//     const { sid } = useParams();
//     const size = 10;
//     const location = useLocation();
//     const navi = useNavigate();
//     const path = location.pathname;
//     const search = new URLSearchParams(location.search);
//     const page = search.get("page") ? parseInt(search.get("page")) : 1;
//     console.log(path, sid, page, size);
//     const [comments, setComments] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [total, setTotal] = useState(0);
//     const [chcnt, setChcnt] = useState(0);

//     const getComment = async () => {
//         const url = `/market/comment/list.json?sid=${sid}&page=${page}&size=${size}`;
//         setLoading(true);
//         const res = await axios(url);
//         let list = res.data.list;
//         list = list.map(comment => comment && { ...comment, checked: false });
//         setComments(list);
//         setTotal(res.data.total);
//         console.log(setComments);
//         setLoading(false);
//     }

//     useEffect(() => {
//         getComment();
//     }, [location, sid, page, size]);

//     useEffect(() => {
//         let cnt = 0;
//         comments.forEach(market => market.checked && cnt++);
//         setChcnt(cnt);
//     }, [comments]);

//     const onDelete = async (sid) => {
//         if (!window.confirm(`${sid}번 댓글을 삭제하실래요?`)) return;
//         const res = await axios.get(`/comment/delete/${sid}`);
//         if (res.data === 0) {
//             alert("삭제 실패!");
//         } else {
//             alert("삭제되었습니다.");
//             getComment();
//         }
//     };

//     const onChangeAll = (e) => {
//         const list = comments.map(comment => comment && { ...comment, checked: e.target.checked });
//         setComments(list);
//     };

//     const onChangeSingle = (e, sid) => {
//         const list = comments.map(comment => comment.sid === sid ? { ...comment, checked: e.target.checked } : comment);
//         setComments(list);
//     };

//     const onClickDelete = async (sid) => {
//         if (chcnt == 0) {
//             setBox({
//                 show: true,
//                 message: '삭제할 댓글을 선택하세요!'
//             })
//         } else {
//             let count = 0;
//             setBox({
//                 show: true,
//                 message: `${chcnt}개의 댓글을 삭제 하실래요?`,
//                 action: async () => {
//                     for (const comment of comments) {
//                         if (comment.checked) {
//                             const res = await axios.post(`/comment/delete`, { sid: comment.sid });
//                             if (res.data === 1) count++;
//                         }
//                     }
//                     setComments({ show: true, message: `${count}개의 댓글이 삭제 되었습니다!` });
//                     navi(`${path}?page=1&sid=${sid}&size=${size}`);
//                 }
//             });
//         }
//     };

//     if (loading) return <div className='my-5 text-center'><Spinner variant='primary' /></div>
//     return (
//         <div className='content_texts'>
//             <Row>
//                 <div className='text-end'>
//                     <button className='post-view-go-list-btn' onClick={() => navi('/market/insert')}>게시글쓰기</button>
//                 </div>
//             </Row>
//             <hr />
//             <Table>
//                 <thead>
//                     <tr className='text-center'>
//                         <th>작성자</th><th>내용</th><th>작성일</th>
//                         <td><input checked={markets.length === chcnt}
//                             type='checkbox' onChange={onChangeAll} /></td>
//                     </tr>
//                 </thead>
//                 <tbody className='text-center'>
//                     {markets.map(market =>
//                         <tr key={market.sid}>
//                             <td>{market.sid}</td>
//                             <td width="30%">
//                                 <Link to={`/market/read/${market.sid}`}>
//                                     <div className='ellipsis'>{market.title}</div>
//                                 </Link>
//                             </td>
//                             <td>{market.uid}</td>
//                             <td>{market.fmtdate}</td>
//                             <td>{market.fmtprice}</td>
//                             <td>{market.category}</td>
//                             <td><input onChange={(e) => onChangeSingle(e, market.sid)}
//                                 type='checkbox' checked={market.checked} /></td>
//                             <td><Button onClick={() => onDelete(market.sid)}
//                                 size='sm' variant="info">삭제</Button></td>
//                         </tr>
//                     )}
//                 </tbody>
//             </Table>
//             <div className='text-end'>
//                 <button className='post-view-go-list-btn'
//                     onClick={onClickDelete}>선택삭제</button>
//             </div>
//             {total > size &&
//                 <Pagination
//                     activePage={page}
//                     itemsCountPerPage={size}
//                     totalItemsCount={total}
//                     pageRangeDisplayed={10}
//                     prevPageText={"‹"}
//                     nextPageText={"›"}
//                     onChange={onChangePage} />
//             }
//         </div>
//     )
// }

// export default CommentList