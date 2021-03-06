import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const Footer = () => {
    return (
        <footer className="bg-primary text-light" style={{minHeight: "100px"}}>
            <Container>
                <Row>
                    <Col className="text-center pt-3">
                    Copyright &copy; {new Date().getFullYear()} TechShop
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
