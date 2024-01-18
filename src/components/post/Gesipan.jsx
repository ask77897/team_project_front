import { useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BoxContext } from '../BoxContext';
import { useNavigate } from 'react-router';


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
            <div className='text-end'>
                <button className="post-view-go-list-btn me-2">게시글 작성</button>
                <button className="post-view-go-list-btn">취소</button>
            </div>
        </div>
    )
}

export default Gesipan