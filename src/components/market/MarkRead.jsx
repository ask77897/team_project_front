import React, { useContext, useEffect, useRef, useState } from 'react'
import { BoxContext } from '../BoxContext'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Col, NavLink, Row, Spinner } from 'react-bootstrap';

const MarkRead = () => {

    const { box, setBox } = useContext(BoxContext);
    const ref_file = useRef(null);
    const [loading, setLoading] = useState(false);
    const { sid } = useParams();
    const [market, setMarket] = useState({
        sid: '',
        image: '',
        photo: '',
        title: '',
        fmtprice: '',
        contents: '',
        price: '',
        fmtdate: '',
        regdate: '',
        photonum: '',
        category: '',
        file: null,
        rcnt: 0,
        vcnt: 0
    });
    console.log(setMarket);

    const { file, image, fmtdate, rcnt, vcnt, photo, title, 
        fmtprice, contents, price, regdate, photonum, category } = market;

    const getMarket = async () => {
        setLoading(true);
        const res = await axios.get('/market/read/' + sid);
        console.log(res.data);
        setMarket(res.data);
        setLoading(false);
    }

    useEffect(() => {
        getMarket();
    }, [])

    const onChangeFile = (e) => {
        getMarket({
            ...market,
            image: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })
    }

    const onUpdateImage = async () => {
        if (!file) {
            //alert("변경할 이미지를 선택하세요!");
            setMarket({
                show: true,
                message: "변경할 이미지를 선택하세요!"
            });
        } else {
            setBox({
                show: true,
                message: '새로운 이미지로 변경 하실래요?',
                action: async () => {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("sid", sid);
                    const res = await axios.post('/market/update/image', formData);
                    if (res.data === 0) {
                        //alert("이미지 변경실패!");
                        setBox({ show: true, message: '이미지 변경 실패!' })
                    } else {
                        //alert("이미지 변경 성공!");
                        setBox({ show: true, message: '이미지 변경 성공!' })
                        setMarket();
                    }
                }
            })
        }
    }

    if (loading) return <div className='text-center my-5'><Spinner variant='primary' /></div>

    return (
        <div>
            <Row className='justify-content-center'>
                <Col xs lg={10}>
                    <Card className='p-5'>
                        <Row>
                            <Col xs lg={4} className='mb-5'>
                                <div className='mt-1'>
                                    <img onClick={() => ref_file.current.click()}
                                        src={image || "http://via.placeholder.com/250x250"}
                                        width="100%" className='bookPhoto' />
                                    <input ref={ref_file}
                                        type="file" onChange={onChangeFile} style={{ display: 'none' }} />
                                </div>
                                <button onClick={onUpdateImage} height="100%"
                                    size='sm mt-2 w-100' variant='success'>이미지 수정</button>
                            </Col>
                            <Col className='px-3'>
                                <h3>{title}</h3>
                                <hr />
                                <div className='ellipsis'>유저아이디 : {category}</div>
                                <div className='ellipsis'>내용 : {contents}</div>
                                <div className='ellipsis'>가격 : {fmtprice}원</div>
                                <div className='ellipsis'>등록일 : {fmtdate}</div>
                                <hr />
                                <NavLink to={`/market/update/${sid}?uid=${sessionStorage.getItem("uid")}`}>
                                    <button className='mt-2 px-5' size='sm '>정보수정</button>
                                </NavLink>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                                <div>{contents}</div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MarkRead