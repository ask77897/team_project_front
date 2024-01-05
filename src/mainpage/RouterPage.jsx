import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './HomePage';
import Login from '../user/Login';
import Login2 from '../user/Login2';

const RouterPage = () => {
    return (
        <Routes>
            <Route path="/"  element={<HomePage/>} />
            <Route path="/user/login/"  element={<Login/>} />
            <Route path="/user/login2/"  element={<Login2/>} />
        </Routes>
    )
}

export default RouterPage