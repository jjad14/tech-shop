import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <header style={{ width: '100vw'}}>
            <Navbar bg="primary" variant="primary" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className="text-light">TechShop
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{color: 'white'}}>
                        <span>
                        <i className="fas fa-bars"></i>
                        </span>
                    </Navbar.Toggle>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link 
                                    className="text-light">
                                    <i className="fas fa-shopping-cart"></i>
                                    &nbsp; Cart
                                </Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/login">
                                <Nav.Link 
                                    className="text-light">
                                    <i className="fas fa-user"></i>
                                    &nbsp; Sign In
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
