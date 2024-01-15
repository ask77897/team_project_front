import React from 'react'
import '../layout/main.css'
import NewsPage from './NewsPage';
import PostList from './post/PostList';
import MarkList from './market/MarkList';
import Lotto from './Lotto';

const HomePage = () => {

    return (
<main>
    <div class="main-container">
        <div class="temp-box">
            <NewsPage/>
        </div>
        <div class="temp-box">로또
            <Lotto />
        </div>
        <div class="temp-box">중고서적 장터
        </div>
        <div class="temp-box">동아리</div>
    </div>
</main>
    )
}

export default HomePage