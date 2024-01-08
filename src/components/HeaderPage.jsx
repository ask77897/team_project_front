import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-bootstrap';

const HeaderPage = () => {

    return (
        <Container>
            <Navbar expand="lg" className="nav justify-content-center">
                <NavLink href="/home" className="home">LOGO</NavLink>
                <Nav>
                    <Nav.Link href={"/home"}>홈페이지</Nav.Link>
                    <Nav.Link href={"/posts/list"}>자유게시판</Nav.Link>
                    <Nav.Link href={"/users/calender"}>일정관리</Nav.Link>
                    <Nav.Link to={"/school/restaurant"}>맛집</Nav.Link>
                    <Nav.Link to={"/school/talk"}>소통</Nav.Link>
                    <Nav.Link href={"/market/list"}>책방</Nav.Link>
                </Nav>
            </Navbar>
        </Container>
    );
}

export default HeaderPage