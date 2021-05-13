import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container fluid>
        <Card className="my-3 p-3 rounded shadow">
        <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
            {children}
            </Col>
        </Row>
        </Card>
    </Container>
  );
};

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormContainer;