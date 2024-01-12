import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, InputGroup, Row, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';

const MarkInsert = () => {
    const { sid } = useParams();
    const [src, setSrc] = useState('http://via.placeholder.com/200x200');
    const [file, setFile] = useState(null);
    const [market, setMarket] = useState({
        sid: '',
        uid: '',
        title: '',
        price: '',
        photo: '',
        contents: '',
        photonum: '',
        category: 0
    });

    const { uid, title, price, contents, photonum, category, photo } = market;
    const navi = useNavigate();

    const getMarket = async () => {
        const res = await axios.post(`/market/insert`);
        console.log(res.data);
        setMarket(res.data);
    };

    useEffect(() => {
        if (sid) {
            getMarket();
        }
    }, [sid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMarket({ ...market, [name]: value });
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setSrc(URL.createObjectURL(selectedFile));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 이미지를 업로드할 API 엔드포인트로 POST 요청을 보냅니다.
            const formData = new FormData();
            formData.append('file', file);

            const imageResponse = await axios.post('/market/image/upload', formData);

            // 이미지 업로드 후, 이미지 경로를 상태에 저장합니다.
            setMarket({ ...market, photonum: imageResponse.data.imagePath });

            // 나머지 데이터와 함께 게시물을 서버에 전송합니다.
            const marketResponse = await axios.post('/market/insert', market);

            console.log('게시물이 성공적으로 등록되었습니다.', marketResponse.data);
        } catch (error) {
            console.error('게시물 등록에 실패했습니다.', error);
        }
    };

    return (

        <Row className='justify-content-center'>
            <Col md={8}>
                <form onSubmit={handleSubmit}>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>아이디</InputGroup.Text>
                        <Form.Control name='uid' onChange={handleInputChange} value={uid} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>제목</InputGroup.Text>
                        <Form.Control name='title' onChange={handleInputChange} value={title} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>가격</InputGroup.Text>
                        <Form.Control name='price' onChange={handleInputChange} value={price} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>내용</InputGroup.Text>
                        <Form.Control name='contents' onChange={handleInputChange} value={contents} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>이미지</InputGroup.Text>
                        <div>
                            <input type="file" onChange={handleImageChange} />
                        </div>
                        <img src={src} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }} />
                    </InputGroup>
                    <div className="text-end">
                        <button className="post-view-go-list-btn" type="submit">
                            게시글등록
                        </button>
                        <button className="post-view-go-list-btn" onClick={() => navi('/market/list')}>
                            취소
                        </button>
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