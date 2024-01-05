import React, { useContext, useEffect, useRef, useState } from 'react'
import { BoxContext } from '../BoxContext'
import { useParams } from 'react-router';
import axios from 'axios';

const MarkRead = () => {

    const {box, setBox} = useContext(BoxContext);
    const ref_file = useRef(null);
    const [loading, setLoading] = useState(false);
    const { sid } = useParams();
    const [markets, setMarkets] = useState({
        sid: '',
        title: '',
        photo: '',
        contents: '',
        price: '',
        category: '',
        regdate: '',
        photonum: '',
        fmtdate: '',
        fmtprice: '',
        image:'',
        file: null,
        vcnt: 0,
        rcnt: 0,
        fcnt: 0

    });
    const {file, title, price, fmtdate, category, fmtprice, contents, photo,
            vcnt, rcnt, fcnt, photonum, regdate, image} = markets;

    const getMarket = async() => {
        setLoading(true);
        const res = await axios.get('/market/read/' + sid);
        console.log(res.data);
        setMarkets(res.data);
        setLoading(false);
    }

    useEffect(()=> {
        getMarket();
    }, [])

    return (
        <div>MarkRead</div>
    )
}

export default MarkRead