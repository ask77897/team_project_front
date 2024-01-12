import React from 'react';
import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const HeaderPage = () => {

    return (
        <Navbar className="bg-body-tertiary">
            <Container className='content_texts'>
                <Navbar.Brand href="/" title='홈페이지로 이동' type='logo'>프리타임</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink href="/home" title='A학점을 위하여!'>대학교</NavLink>
                        <NavLink href="/posts/list" title='나만의 생각을 펼쳐라!'>자유게시판</NavLink>
                        <NavLink href="/users/calender" title='계획은 철저하게!'>일정관리</NavLink>
                        <NavLink href="/school/restaurant">멘토</NavLink>
                        <NavLink href="/school/talk" title='낮게 나오면 한강각!'>학점계산기</NavLink>
                        <NavLink href="/market/list" title='필요없는 전공책 쌓지 말고 팔자!'>책방</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderPage