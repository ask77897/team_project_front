import { useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BoxContext } from '../BoxContext';
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';


const Gesipan = () => {


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

    return (
        <div>
            <ReactQuill modules={modules}
                style={{ height: '500px', padding: '55px' }}
                placeholder='내용을 입력해 주세요.' />
            <div className='text-end mt-3'>
                <Button style={{ marginLeft: '5px', borderRadius: '20px',  fontSize: '13px', color: 'black' }} variant='warning me-2'>저장</Button>
                <Button style={{ backgroundColor: 'dark', borderRadius: '20px', fontSize: '13px', color: 'black' }} variant='outline-warning'>취소</Button>
            </div>
        </div>
    )
}

export default Gesipan