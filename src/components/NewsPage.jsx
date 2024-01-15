import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap'
import { BoxContext } from './BoxContext';
import '../App.css';


const NewsPage = () => {

    const { box, setBox } = useContext(BoxContext);
    const location = useLocation();
    const path = location.pathname;
    const navi = useNavigate();
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 2;
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "뉴스");
    const [loading, setLoading] = useState(false);
    const [nowss, setNowss] = useState([]);
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);
    const [chcnt, setChcnt] = useState(0);

    const getNows = async () => {
        const url = `https://dapi.kakao.com/v2/search/web.json?target=title&query=${query}&size=6&page=${page}`
        const config = {
            headers: { "Authorization": "KakaoAK cbaf2f9ffd3cdd1b46419f9fea013135" }
        }

        setLoading(true);
        const res = await axios(url, config);
        console.log(res.data);
        let docs = res.data.documents;
        docs = docs.map(doc => doc && { ...doc, checked: false });
        setNowss(docs);
        setTotal(res.data.meta.pageable_count);
        setEnd(res.data.meta.is_end);
        setLoading(false);
    }

    useEffect(() => {
        getNows();
    }, [location]);

    useEffect(() => {
        let cnt = 0;
        nowss.forEach(nows => nows.checked && cnt++);
        //console.log('.............', cnt)
        setChcnt(cnt);
    }, [nowss]);

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`${path}?query=${query}&page=${page}`);
    }

    function createMarkup() {
        return { __html: 'First &middot; Second' };
    }

    function MyComponent() {
        return <div dangerouslySetInnerHTML={createMarkup()} />;
    }

    const onChangeEllipsis = (url) => {
        const list=nowss.map(u=>u.url===url ? {...u, ellipsis:!u.ellipsis} : u);
        setNowss(list);
    }

    return (
        <div className='card'>
            <div onClick={() => onChangeEllipsis(nowss.url)} style={{ cursor: 'pointer' }}>
                <Table striped>
                    <thead onSubmit={onSubmit}>
                        <h5 className='text-center' style={{fontSize: '50px'}}><b>오늘의 뉴스</b></h5>
                        {nowss.map(nows =>
                            <tr className='board' key={nows.url}>
                                <td>
                                    <Link to={nows.url}
                                        style={{ textDecoration: "none", color: 'black' }}>
                                        <div dangerouslySetInnerHTML={{ __html: nows.title }} />
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </thead>
                </Table>
            </div>
            <div className='text-end'>
                <Link to={"https://news.daum.net/"} className="moer"
                    style={{ textDecoration: "none", color: 'black' }}>
                    <h5>...더보기</h5>
                </Link>
            </div>
        </div>
    )
}

export default NewsPage