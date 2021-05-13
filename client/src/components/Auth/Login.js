import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../shared/Message';
import Loading from '../shared/Loading';
import FormContainer from '../shared/Forms/FormContainer';
import { login } from '../../actions/userActions';

const Login = ({ location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector((state) => state.user);

  const redirect = location.search ? location.search.split('=')[1] : null;

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  if (userInfo && redirect) {
    return <Redirect to={redirect} />;
  }

  if (userInfo) {
    return <Redirect to='/' />;
  }

  return (
    <FormContainer>
      <h1 className="text-center">Sign In</h1>
      {error ? <Message variant='danger'>{error}</Message> : null}
      {loading ? <Loading /> : null}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' variant='primary' block>
          Sign In
        </Button>
      </Form>
      <Row className='py-3 text-center'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register Here
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

Login.propTypes = {
  location: PropTypes.object,
};

export default Login;
