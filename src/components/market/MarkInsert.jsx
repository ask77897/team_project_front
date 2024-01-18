import { isVisible } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Col, InputGroup, Row, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';

const MarkInsert = () => {
    const { sid } = useParams();
    const ref_file = useRef(null);
    const [src, setSrc] = useState('http://via.placeholder.com/200x200');
    const [file, setFile] = useState(null);
    const [market, setMarket] = useState({
        sid: '',
        uid: sessionStorage.getItem("uid"),
        title: '',
        price: '',
        photo: '',
        contents: '',
        photonum: '',
        category: 0
    });

    const { uid, title, price, contents, photonum, category, photo } = market;
    const navi = useNavigate();

    const handleInputChange = (e) => {
        setMarket({ ...market, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setSrc(URL.createObjectURL(selectedFile));
    };

    const handleSubmit = async () => {
        if (window.confirm("상품을 등록하시겠습니까?")) {
            await axios.post("/market/insert", market);
            alert("등록 완료");
            window.location.href = '/market/list';
        }
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         // 이미지를 업로드할 API 엔드포인트로 POST 요청을 보냅니다.
    //         const formData = new FormData();
    //         formData.append('file', file);

    //         const imageResponse = await axios.post('/market/image/upload', formData);

    //         // 이미지 업로드 후, 이미지 경로를 상태에 저장합니다.
    //         setMarket({ ...market, photonum: imageResponse.data.imagePath });

    //         // 나머지 데이터와 함께 게시물을 서버에 전송합니다.
    //         const marketResponse = await axios.post('/market/insert', market);

    //         console.log('게시물이 성공적으로 등록되었습니다.', marketResponse.data);
    //     } catch (error) {
    //         console.error('게시물 등록에 실패했습니다.', error);
    //     }
    // };

    return (

        <Row className='justify-content-center'>
            <Col md={8}>
                <form onSubmit={handleSubmit}>
                    <InputGroup className='my-2' style={{display:'none'}}>
                        <InputGroup.Text>아이디</InputGroup.Text>
                        <Form.Control name='uid' onChange={handleInputChange} value={sessionStorage.getItem("uid")} readOnly/>
                    </InputGroup>
                    <InputGroup className='my-2'>
                        <InputGroup.Text>제목</InputGroup.Text>
                        <Form.Control name='title' onChange={handleInputChange} value={title} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>가격</InputGroup.Text>
                        <Form.Control name='price' onChange={handleInputChange} value={price} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>내용</InputGroup.Text>
                        <Form.Control name='contents' as="textarea" rows={10}
                            onChange={handleInputChange} value={contents} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>이미지</InputGroup.Text>
                        <div>
                            <img src={src} alt='' style={{cursor:'pointer'}} width="150px" onClick={()=>ref_file.current.click()}/>
                            <input type="file" ref={ref_file} onChange={handleImageChange} style={{display:'none'}}/>
                        </div>
                    </InputGroup>
                    <div className="text-end">
                        <Button className="post-view-go-list-btn me-2" type="submit">
                            게시글등록
                        </Button>
                        <Button className="post-view-go-list-btn" onClick={() => navi('/market/list')}>
                            취소
                        </Button>
                    </div>
                </form>
            </Col>
        </Row>
    );
};

export default MarkInsert;





// const formData = new FormData();
// formData.append('image', file);

// 이미지를 업로드할 API 엔드포인트로 POST 요청을 보냅니다.
// const imageResponse = await axios.post('/market/insert', formData);

// 이미지 업로드 후, 이미지 경로를 상태에 저장합니다.
// setMarket({ ...market, photonum: imageResponse.data.imagePath });

// // 나머지 데이터와 함께 게시물을 서버에 전송합니다.
// const marketResponse = await axios.post('/market/insert', market);