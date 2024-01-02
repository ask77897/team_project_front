import React from 'react'
import '../layout/main.css'
import NewsPage from './NewsPage';

const HomePage = () => {

    return (
<main>
    <div class="main-container">
        <div class="temp-box">
            <NewsPage/>
        </div>
        <div class="temp-box">행사</div>
        <div class="temp-box">홍보</div>
        <div class="temp-box">동아리</div>
    </div>
</main>
    )
}

export default HomePage