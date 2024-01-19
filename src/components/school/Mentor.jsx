import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const MentorMenteeChat = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentUser, setCommentUser] = useState('mentor'); // Default to mentor

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const addComment = () => {
        if (newComment.trim() !== '') {
            const comment = { text: newComment, user: commentUser };
            setComments([...comments, comment]);
            setNewComment('');
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', minHeight: '400px', marginBottom: '20px', borderRadius: '5px', overflowY: 'auto' }}>
                {comments.map((comment, index) => (
                    <div key={index} style={{ marginBottom: '15px', background: comment.user === 'mentor' ? '#e0e0e0' : '#c3e88d', padding: '12px', borderRadius: '5px' }}>
                        <strong>{comment.user === 'mentor' ? 'Mentor' : 'Mentee'}: </strong>{comment.text}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', marginBottom: '20px', borderRadius: '5px' }}>
                <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    style={{ flex: '1', marginRight: '10px', padding: '12px', borderRadius: '5px', fontSize: '16px' }}
                    placeholder={`${commentUser === 'mentor' ? '멘토' : '멘티'}의 댓글을 입력하세요...`}
                />
                <Button variant='warning' onClick={addComment} style={{ padding: '12px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>댓글 추가</Button>
            </div>
        </div>
    );
};

export default MentorMenteeChat;