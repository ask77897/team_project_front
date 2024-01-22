import React from 'react';
import { Link } from 'react-router-dom';
import '../layout/main.css';
import NewsPage from './NewsPage';
import MentorMenteeChat from './school/Mentor';

const HomePage = () => {
    return (
        <main>
            <div className="main-container">
                <div className="temp-box" ><NewsPage /></div>
                <div className="temp-box" style={{ position: 'relative' }}>
                    <h4 style={{ fontSize: '40px', marginTop: '30px' }} ><b>멘토링</b></h4><br />
                    <h5>멘토 멘티의 대화 서비스!!</h5>
                    <p>부담갖지 말고 이용해보세요.</p>
                    {/* 수정: 멘토&멘티 이용하기 링크를 오른쪽 하단에 위치시킴 */}
                    <div style={{ position: 'absolute', bottom: '20px', right: '20px', borderRadius:'20px' }}>
                        <Link to='/school/mentor' style={{ fontSize: '16px', color: 'white', background: '#f57c00', padding: '10px', borderRadius: '20px', textDecoration: 'none' }}>
                            멘토&멘티 이용하기
                        </Link>
                    </div>
                </div>
                <div className="temp-box" style={{ fontSize: '40px' }}>책방</div>
                <div className="temp-box" style={{ fontSize: '40px' }}>할일</div>
            </div>
        </main>
    );
}

export default HomePage;