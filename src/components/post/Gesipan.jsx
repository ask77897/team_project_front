import { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BoxContext } from '../BoxContext';
import { useNavigate } from 'react-router';
import { Button, Modal } from 'react-bootstrap';

const Gesipan = () => {
    const [content, setContent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
            ['clean']
        ],
    }

    const handleSave = () => {
        console.log('게시글이 업로드되었습니다.');
        console.log('내용:', content);
    }

    const handleCancel = () => {
        setShowModal(true); 
    }

    const handleConfirmCancel = () => {
        setShowModal(false); 
        navigate(-1);
    }

    const handleCancelModal = () => {
        setShowModal(false); 
    }

    return (
        <div>
            <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                style={{ height: '500px', padding: '55px' }}
                placeholder='내용을 입력해 주세요.'
            />
            <div className='text-end mt-3'>
                <Button
                    style={{ marginLeft: '5px', borderRadius: '20px', fontSize: '13px', color: 'black' }}
                    variant='warning me-2'
                    onClick={handleSave} // 저장 버튼 클릭 시 handleSave 함수 호출
                >
                    저장
                </Button>
                <Button
                    style={{ backgroundColor: 'dark', borderRadius: '20px', fontSize: '13px', color: 'black' }}
                    variant='outline-warning'
                    onClick={handleCancel} // 취소 버튼 클릭 시 handleCancel 함수 호출
                >
                    취소
                </Button>
            </div>

            {/* 취소 모달 */}
            <Modal show={showModal} onHide={handleCancelModal}>
                <Modal.Header closeButton>
                    <Modal.Title>게시글 작성 취소</Modal.Title>
                </Modal.Header>
                <Modal.Body>게시글 작성을 취소하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelModal}>
                        아니오
                    </Button>
                    <Button variant="primary" onClick={handleConfirmCancel}>
                        예
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Gesipan;