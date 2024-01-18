import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Comments = ({ mcid }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // 게시글의 댓글을 불러오는 API 호출
        const fetchComments = async () => {
            try {
                const response = await axios.post(`/comments/insert`);
                setComments(response.data);
            } catch (error) {
                console.error('댓글을 불러오는데 실패했습니다.', error);
            }
        };

        fetchComments();
    }, [mcid]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = async () => {
        try {
            // 새 댓글을 추가하는 API 호출
            const response = await axios.get(`/comments/update/${mcid}`, {
                comments: newComment,
                // 기타 필요한 필드들을 여기에 추가
            });

            // 새 댓글을 댓글 목록에 추가
            setComments((prevComments) => [...prevComments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('댓글을 추가하는데 실패했습니다.', error);
        }
    };

    return (
        <div>
            <hr />
            <ul>
                {comments.map((comment) => (
                    <li key={comment.cid}>
                        <strong>{comment.uid}</strong>: {comment.comments}
                    </li>
                ))}
            </ul>
            <div>
                <textarea
                    placeholder="댓글을 입력하세요."
                    value={newComment}
                    onChange={handleCommentChange}
                />
                <Button variant='warning' style={{ borderRadius: '20px', fontSize: '13px' }} onClick={handleAddComment}>댓글 추가</Button>
            </div>
        </div>
    );
};

export default Comments;
