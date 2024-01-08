import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router'

const MarketUpdate = () => {

    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const { sid } = useParams();
    const [market, setMarket] = useState({
        sid: '',
        uid: '',
        title: '',
        price: '',
        fmtprice: '',
        contents: '',
        publisher: '',
        image: '',
        regdate: '',
        photonum: '',
        fmtdate: ''
    });

    const { title, price, fmtprice, contents, publisher, image, isbn, regdate, fmtdate, uid, photonum } = market;

    const getMarket = async () => {
        setLoading(true);
        const res = await axios.get('/market/read/' + sid);
        //console.log(res.data);
        setMarket(res.data);
        setLoading(false);
    }

    useEffect(() => {
        getMarket();
    }, []);

    const onChange = (e) => {
        setMarket({
            ...market,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm("수정된 내용을 저장하실래요?")) {
            //수정하기
            const res = await axios.post('/market/update', market);
            if (res.data === 0) {
                alert("수정 실패!");
            } else {
                alert("수정 완료!");
                navi(`/market/read/${sid}`);
            }
        }
    }

    if (loading) return <div className='text-center my-5'><Spinner variant='primary' /></div>

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>게시물정보수정</h1>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <Card className='p-3'>
                        <form onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>게시글 번호</InputGroup.Text>
                                <Form.Control value={sid} name="sid" readOnly />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>게시글 제목</InputGroup.Text>
                                <Form.Control onChange={onChange}
                                    value={title} name="title" />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>책 가격</InputGroup.Text>
                                <Form.Control onChange={onChange}
                                    value={price} name="price" />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>유저아이디</InputGroup.Text>
                                <Form.Control onChange={onChange}
                                    value={uid} name="uid" />
                            </InputGroup>
                            <Form.Control onChange={onChange}
                                as="textarea" rows={10} name="contents">{contents}</Form.Control>
                            <div className='text-center my-3'>
                                <button type="submit" className='me-2'>정보수정</button>
                                <button variant='secondary' onClick={() => getMarket()}>수정취소</button>
                            </div>
                        </form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MarketUpdate