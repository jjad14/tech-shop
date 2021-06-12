import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../shared/Meta';
import Message from '../shared/Message';
import Loading from '../shared/Loading';
import FormContainer from '../shared/Forms/FormContainer';
import { login } from '../../actions/userActions';

const Login = ({ location }) => {
  // local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();

  // redux state
  const { loading, userInfo } = useSelector((state) => state.user);
  const { errorAuthentication } = useSelector((state) => state.error);

  // redirect 
  const redirect = location.search ? location.search.split('=')[1] : null;

  const submitHandler = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      dispatch(login(email, password));
    }

    // setEmail('');
    // setPassword('');
    setValidated(true);

  };

  // redirect if user is logged in and has a redirection
  if (userInfo && redirect) {
    return <Redirect to={redirect} />;
  }

  // redirect if already logged in
  if (userInfo) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <Meta title="Welcome to TechShop | Login" />
      <FormContainer>
        <h2 className="text-center">Sign In</h2>
        {errorAuthentication ? <Message variant='danger' exit>{errorAuthentication}</Message> : null}
        {loading ? <Loading /> : null}
        <Form noValidate validated={validated} onSubmit={submitHandler}>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email Address"
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
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                />

              <Form.Control.Feedback>Valid</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                Please provide a valid password. (minimum 6 characters)
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button type='submit' variant='primary' block>
            Sign In
          </Button>
          <Button type='button' variant='danger' block>
            <i className='fab fa-google left'></i>
            {' '} Sign In With Google
          </Button>
      </Form>

        <Row className='py-3 text-center'>
          <Col>
            Don't Have an Account?{'  '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register Here
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

Login.propTypes = {
  location: PropTypes.object,
};

export default Login;
