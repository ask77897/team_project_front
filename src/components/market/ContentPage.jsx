import React, { useState } from 'react'
import { Button, Tab, Tabs, Form } from 'react-bootstrap';
import axios from 'axios';


const ContentPage = ({ sid, market, setMarket, getMarket }) => {

    const onClickSave = async () => {
        if (market.contents === "") {
            alert("내용을 입력해주세요");
        } else {
            if (window.confirm("저장하시겠습니까?")) {
                const data = { sid, contents: market.contents };
                console.log(data);
                await axios.get("/market/read/content", data);
                alert("수정되었습니다.");
                getMarket();
            }
        }
    }

    const onClickSaveHtml = async () => {
        if (market.html === "") {
            alert("내용을 입력해주세요");
        } else {
            if (window.confirm("저장하시겠습니까?")) {
                const data = { sid, contents: market.html };
                console.log(data);
                await axios.get("/market/read/content", data);
                alert("수정되었습니다.");
                getMarket();
            }
        }
    }

    return (
        <>
            <tr>
                <th eventKey="home" title="에디터"
                    className='text-end mb-2'>
                    <Button variant='warning' style={{ borderRadius: '20px', fontSize: '13px' }} onClick={onClickSave}>저장</Button>
                </th>
            </tr>
        </>
    )
}

export default ContentPage