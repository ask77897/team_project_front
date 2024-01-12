import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-bootstrap';

const HeaderPage = () => {

    return (
        <Container className='content_texts'>
            <Navbar expand="lg" className="nav justify-content-center">
                <NavLink href="/" className="home">프리타임</NavLink>
                <Nav>
                    <Nav.Link href={"/home"}>홈</Nav.Link>
                    <Nav.Link href={"/posts/list"}>자유게시판</Nav.Link>
                    <Nav.Link href={"/users/calender"}>일정관리</Nav.Link>
                    <Nav.Link href={"/school/restaurant"}>멘토</Nav.Link>
                    <Nav.Link href={"/school/talk"}>학점계산기</Nav.Link>
                    <Nav.Link href={"/market/list"}>책방</Nav.Link>
                </Nav>
            </Navbar>
        </Container>
    );
}

export default HeaderPage