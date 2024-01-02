import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-bootstrap';

const HeaderPage = () => {


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink href="/" className="home">LOGO</NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 "
                        style={{ maxHeight: '100%' }}
                        navbarScroll>
                        <Nav.Link to={"/"}>홈페이지</Nav.Link>
                        <Nav.Link to={"/free/talk"} id='free'>자유게시판</Nav.Link>
                        <Nav.Link to={"/school/course"}>진로</Nav.Link>
                        <Nav.Link to={"/school/restaurant"}>맛집</Nav.Link>
                        <Nav.Link to={"/school/talk"}>소통</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderPage