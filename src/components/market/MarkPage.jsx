import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import CommentList from '../comment/CommentList';

const MarkPage = () => {
    const { sid } = useParams();
    const [markets, setMarkets] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getMarket = async () => {
        try {
            const res = await axios(`/market/read/${sid}`);
            setMarkets(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching market:', error);
            setError(`Failed to fetch market data. ${error.message}`);
            setLoading(false);
        }

    };

    useEffect(() => {
        getMarket();
    }, [sid]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <Row>
                <Col md={6} className='align-self-center my-3'>
                    <img src={`/display?file=${markets.photo}` || "http://via.placeholder.com/200x200"} width="50%" />
                </Col>
                <Col className='ms-3 mt-5 text-start'>
                    <h2 className='ellipsis'>{markets.title}</h2>
                    <h3 className='ellipsis'>가격: {markets.fmtprice}원</h3>
                    <hr />
                    <p className='ellipsis my-2'>판매자 : {markets.uid}</p>
                    <p className='ellipsis my-2'>상품 상태 : {markets.str_category}</p>
                    <p className='ellipsis my-2'>등록일 : {markets.fmtdate}</p>
                </Col>
                <hr />
                <div>
                    <h3 className='ellipsis'>내용: {markets.contents}</h3>
                </div>
            </Row>
            <div>
                <CommentList sid={sid} />
            </div>
        </div>
    );
};

export default MarkPage;
