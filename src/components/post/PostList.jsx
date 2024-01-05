import React, { useState, useEffect } from 'react';
import { Link, Routes, useNavigate } from 'react-router-dom';
import CommonTable from '../table/CommonTable';
import CommonTableColumn from '../table/CommonTableColumn';
import CommonTableRow from '../table/CommonTableRow';
import { postList } from '../../Data';
// import '../layout/Pagination.css';
import { Pagination } from 'react-bootstrap';

const PostList = ({ props, location }) => {
    const [dataList, setDataList] = useState([]);
    const navi = useNavigate();

    useEffect(() => {
        setDataList(postList);
    }, [])

    return (
        <>
            <CommonTable headersName={['글번호', '제목', '등록일', '조회수']}>
                {
                    dataList ? dataList.map((item, index) => {
                        return (
                            <CommonTableRow key={index}>
                                <CommonTableColumn>{item.total}</CommonTableColumn>
                                <CommonTableColumn>
                                    <Link to={`/post/${item.total}`}>{item.title}</Link>
                                </CommonTableColumn>
                                <CommonTableColumn>{item.createDate}</CommonTableColumn>
                                <CommonTableColumn>{item.readCount}</CommonTableColumn>
                            </CommonTableRow>
                        )
                    }) : ''
                }
            </CommonTable>
            <div className='text-end'>
                <button className='post-view-go-list-btn' onClick={() => navi('/post/write')}>게시글쓰기</button>
            </div>
            <Pagination
                activePage={1}
                itemsCountPerPage={10}
                totalItemsCount={100}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={0} />
        </>
    )

}

export default PostList; 