import React, { useContext, useEffect, useState } from 'react'
import { BoxContext } from '../BoxContext'
import { useLocation, useNavigation, useParams } from 'react-router';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

const MarkInfo = () => {

    const {setBox} = useContext(BoxContext);
    const navi = useNavigation();
    const location = useLocation();

    const {sid} = useParams();
    const [market, setMarket] = useState('');
    const [loading, setLoadiog] = useState(false);

    const getMarket = async() => {
        setLoadiog(true);
        const res = await axios(`/market/info/${sid}?uid=${sessionStorage.getItem("uid")}`);
        console.log(getMarket);
        setMarket(res.data);
        setLoadiog(false);
    }

    useEffect(() =>{
        getMarket();
    }, []);

    if (loading) return <div className='my-5 text-center'><Spinner variant='primary' /></div>

    return (
        <div>게시물 정보</div>
    )
}

export default MarkInfo