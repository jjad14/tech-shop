import React from 'react';
import { useHistory } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../actions/userActions';

const Header = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo);

    const logoutHandler = () => {
		dispatch(logout(history));
    };
    
    return (
        <header style={{ width: '100vw'}}>
            <Navbar bg="primary" variant="primary" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className="text-light">
                            <i className="fas fa-desktop"></i>
                            &nbsp; TechShop
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

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="navbar-username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item
                                        onClick={logoutHandler}>
                                            Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                            <LinkContainer to="/login">
                                <Nav.Link
                                    className="text-light">
                                    <i className="fas fa-user"></i>
                                    &nbsp; Sign In
                                </Nav.Link>
                            </LinkContainer>
                            )}

                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
