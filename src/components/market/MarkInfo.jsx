import React, { useContext, useEffect, useState } from 'react'
import { BoxContext } from '../BoxContext'
import { useLocation, useNavigation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Col, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { BiMessageDetail } from 'react-icons/bi'
import CommentPage from './CommentPage';

const MarkInfo = () => {

    const { setBox } = useContext(BoxContext);
    const navi = useNavigation();
    const location = useLocation();

    const { sid } = useParams();
    const [market, setMarket] = useState('');
    const [loading, setLoadiog] = useState(false);

    const getMarket = async () => {
        setLoadiog(true);
        const res = await axios(`/market/info/${sid}?uid=${sessionStorage.getItem("uid")}`);
        console.log(getMarket);
        setMarket(res.data);
        setLoadiog(false);
    }

    useEffect(() => {
        getMarket();
    }, []);

    if (loading) return <div className='my-5 text-center'><Spinner variant='primary' /></div>

    return (
        <div>
            <h3 className='text-center'>게시물 정보</h3>
            <Card className='p-5'>
                <Row>
                    <Col lg={3} xs={5} md={4} className='align-self-center'>
                        <img src={market.image} width="100%" />
                    </Col>
                    <Col className='ms-3'>
                        <h5 className='ellipsis'>{market.title}</h5>
                        <hr />
                        <div className='mb-2'>가격: {market.fmtprice}원</div>
                        <div className='ellipsis'>내용: {market.contents}</div>
                        <div className='ellipsis'>가격: {market.fmtprice}</div>
                        <div className='ellipsis'>등록일: {market.fmtdate}</div>
                        <div className='ellipsis mb-2'>상태: {market.category}</div>
                        {market.rcnt === 0 ||
                            <span>
                                <span className='message'><BiMessageDetail /></span>
                                <span className='ms-1 rcnt'>{market.rcnt}</span>
                            </span>
                        }
                    </Col>
                </Row>
            </Card>
            {/*상세설명/ 리뷰 탭 */}
            <div className='my-5'>
                <Tabs
                    defaultActiveKey="review"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3">
                    <Tab eventKey="home" title="상세설명">
                        <div className='px-3'>{market.contents}</div>
                    </Tab>
                    <Tab eventKey="review" title="댓글">
                        <CommentPage location={location} setMarket={setMarket} market={market}/>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default MarkInfo