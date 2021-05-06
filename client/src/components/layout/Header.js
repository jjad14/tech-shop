import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar bg="primary" variant="primary" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand className="text-light" href="/">Tech Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link 
                                className="text-light" href="/cart">
                                <i className="fas fa-shopping-cart"></i>
                                &nbsp;Cart
                            </Nav.Link>
                            <Nav.Link 
                                className="text-light" href="/login">
                                <i className="fas fa-user"></i>
                                &nbsp;Sign In
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
