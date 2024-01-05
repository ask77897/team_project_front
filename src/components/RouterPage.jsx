import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PostMain from './post/PostMain';
import PostView from './post/PostView';
import Gesipan from './post/Gesipan';
import TimetableMonth from './TimetableMonth';
import MarkInfo from './market/MarkInfo';
import MarkList from './market/MarkList';
import HeaderPage from './HeaderPage';
import MarkRead from './market/MarkRead';


const RouterPage = () => {

    return (
        <Routes>
            <Route path='/home' element={<HeaderPage />} />
            <Route path='/post/:total' element={<PostView />} />
            <Route path='/post/list' element={<PostMain />} />
            <Route path='/post/write' element={<Gesipan />} />

            <Route path='/users/calender' element={<TimetableMonth />} />

            <Route path='/market/list' element={<MarkList />} />
            <Route path='/market/info/:sid' element={<MarkInfo />} />
            <Route path='/market/read/:sid' element={<MarkRead />} />
        </Routes>
    )
}

export default RouterPage