import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Gesipan from './post/Gesipan';
import TimetableMonth from './TimetableMonth';
import MarkInfo from './market/MarkInfo';
import MarkList from './market/MarkList';
import HeaderPage from './HeaderPage';
import MarkRead from './market/MarkRead';
import MarketUpdate from './market/MarkUpdate';
import MarkGesipan from './market/MarkGesipan';
import PostList from './post/PostList';


const RouterPage = () => {

    return (
        <Routes>
            <Route path='/home' element={<HeaderPage />} />
            <Route path='/posts/list' element={<PostList />} />
            <Route path='/posts/write' element={<Gesipan />} />

            <Route path='/users/calender' element={<TimetableMonth />} />

            <Route path='/market/list' element={<MarkList />} />
            <Route path='/market/info/:sid' element={<MarkInfo />} />
            <Route path='/market/read/:sid' element={<MarkRead />} />
            <Route path="/market/update/:sid" element={<MarketUpdate/>}/>
            <Route path="/market/write" element={<MarkGesipan/>}/>
        </Routes>
    )
}

export default RouterPage