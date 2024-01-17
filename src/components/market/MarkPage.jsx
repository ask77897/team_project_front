import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import Comments from '../comment/Comments';

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
            <div className='ellipsis'><h2>아이디: {markets.uid}</h2></div>
            <Card className='p-5'>
                <Row>
                    <Col lg={3} xs={3} md={3} className='align-self-center'>
                        <img src={markets.image || "http://via.placeholder.com/200x200"} width="100%" />
                    </Col>
                    <Col className='ms-3'>
                        <h2 className='ellipsis'>{markets.title}</h2>
                        <h3 className='ellipsis'>가격: {markets.fmtprice}원</h3>
                        <hr />
                        <h4 className='ellipsis'>등록일: {markets.fmtdate}</h4>
                        <h4 className='ellipsis'>상품 상태: {markets.category}</h4>
                        <h4 className='ellipsis'>내용: {markets.contents}</h4>
                        <div>
                            <Comments />
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default MarkPage;
