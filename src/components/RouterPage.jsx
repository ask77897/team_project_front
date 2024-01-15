import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Gesipan from './post/Gesipan';
import TimetableMonth from './TimetableMonth';
import MarkList from './market/MarkList';
import MarkInsert from './market/MarkInsert';
import PostList from './post/PostList';
import SubHomePage from './SubHomePage';
import Gradcalc from './gradcal/GradCalc';
import MarkPage from './market/MarkPage';
import CommentList from './comment/CommentList';
import Comments from './comment/Comments';
import HomePage from './HomePage';
import Login from './users/Login';
import SignUp from './users/SignUp';
import MyPage from './users/Mypage';
import UpdatePage from './users/UpdatePage';


const RouterPage = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/home' element={<SubHomePage />} />
            <Route path='/posts/list' element={<PostList />} />
            <Route path='/posts/write' element={<Gesipan />} />

            <Route path='/users/calender' element={<TimetableMonth />} />
            <Route path="/users/login/" element={<Login />} />
            <Route path="/users/signup/" element={<SignUp />} />
            <Route path="/users/mypage/" element={<MyPage />} />
            <Route path="/users/update/" element={<UpdatePage />} />
            <Route path='/school/talk' element={<Gradcalc />} />

            <Route path='/market/list' element={<MarkList />} />
            <Route path='/market/read/:sid' element={<MarkPage />} />
            {/* <Route path="/market/update" element={<MarketUpdate/>}/> */}
            <Route path="/market/insert" element={<MarkInsert />} />

            {/* <Route path="/market/comment/list" element={<CommentList />} />
            <Route path="/market/comment/insert" element={<Comments />} /> */}
        </Routes>
    )
}

export default RouterPage