import React from 'react';
import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { PiCoffeeFill } from 'react-icons/pi';
import { LuSchool } from "react-icons/lu";
import { GiBlackBook } from "react-icons/gi";
import { BsCalculator } from "react-icons/bs";
import { GrSchedule } from "react-icons/gr";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoPersonSharp } from 'react-icons/io5';
import { FaListAlt } from "react-icons/fa";


const HeaderPage = () => {

    return (
        <Navbar className="bg-body-tertiary">
            <Container className='content_texts'>
                <Navbar.Brand href="/" title='홈페이지로 이동' type='logo'><PiCoffeeFill style={{color:'chocolate',marginRight:'5px'}}/>프리타임</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink href="/home" title='A학점을 위하여!'><LuSchool style={{ marginRight: '5px' }} />대학교</NavLink>
                        <NavLink href="/posts/list" title='나만의 생각을 펼쳐라!'><HiOutlineClipboardList style={{ marginRight: '5px' }} />자유게시판</NavLink>
                        <NavLink href="/users/calender" title='계획은 철저하게!'><GrSchedule style={{ marginRight: '5px' }} />일정관리</NavLink>
                        <NavLink href="/school/talk" title='낮게 나오면 한강각!'><BsCalculator style={{ marginRight: '5px' }} />학점계산기</NavLink>
                        <NavLink href="/market/list" title='필요없는 전공책 쌓지 말고 팔자!'><GiBlackBook style={{ marginRight: '5px' }} />책방</NavLink>
                        <NavLink href="/school/mentor" title='공부대화 나누자!!'><IoPersonSharp style={{ marginRight: '5px' }} />멘토</NavLink>
                        <NavLink href="/school/mentor" title='할 일을 미루지 말자!'><FaListAlt style={{ marginRight: '5px' }} />할일</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderPage