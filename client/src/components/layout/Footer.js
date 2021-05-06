import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const Footer = () => {
    return (
        <footer className="bg-primary text-light">
            <Container>
                <Row>
                    <Col className="text-center py-3">
                    Copyright &copy; {new Date().getFullYear()} TechShop
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
