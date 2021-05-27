import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../shared/Meta';
import Message from '../shared/Message';
import Loading from '../shared/Loading';
import { register } from '../../actions/userActions';
import FormContainer from '../shared/Forms/FormContainer';

const RegisterScreen = ({ location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();

  const { loading, userInfo } = useSelector((state) => state.user);
  const { errorAuthentication } = useSelector((state) => state.error);

  const redirect = location.search ? location.search.split('=')[1] : null;

  const submitHandler = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    else {
      setValidated(true);
      if (password === confirmPassword) {
        dispatch(register(name, email, password, confirmPassword));
      }
    }
  };

  // redirect if user is already authenticated
  if (userInfo) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <Meta title="Welcome to TechShop | Register" />
      <FormContainer>
        <h2 className='text-center'>Sign Up</h2>
        {errorAuthentication ? <Message variant='danger' exit>{errorAuthentication}</Message> : null}
        {loading ? <Loading /> : null}
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Form.Row>
            <Form.Group as={Col} md='12' controlId='validationCustom01'>
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control.Feedback>Valid</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                Please provide a valid Name
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md='12' controlId='validationCustom03'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control 
                type='email' 
                placeholder='Email' 
                required 
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                />

              <Form.Control.Feedback>Valid</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                Please provide a valid email address
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md='12' controlId='validationCustom04'>
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type='password' 
                placeholder='Password' 
                required 
                minLength="6"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                />

              <Form.Control.Feedback>Valid</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                Please provide a valid password. (minimum 6 characters)
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md='12' controlId='validationCustom05'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type='password'
                placeholder='Confirm Password' 
                isInvalid={password !== confirmPassword} 
                required
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                />

              <Form.Control.Feedback type='invalid'>
                Please make sure both passwords match
                </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button type='submit' block>
            Register
          </Button>
        </Form>
        <Row className='py-3'>
          <Col className='text-center'>
            Have an Account Already?&nbsp;
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
}

RegisterScreen.propTypes = {
  location: PropTypes.object,
};

export default RegisterScreen;
