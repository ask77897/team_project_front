import React from 'react'
import {Routes, Route} from 'react-router-dom'
import LoginPage from './users/LoginPage'
import MyPage from './users/MyPage'
import UpdatePage from './users/UpdatePage'
import HomePage from './HomePage'


const RouterPage = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="users/login" element={<LoginPage/>}/>
            <Route path="users/mypage" element={<MyPage/>}/>
            <Route path="users/update" element={<UpdatePage/>}/>
        </Routes>
    )
}

export default RouterPage