import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../shared/Message';
import Loading from '../shared/Loading';
import { updateUserProfile } from '../../actions/userActions';

const ProfileScreen = () => {
    const dispatch = useDispatch();

    const { userInfo, error, loading, updated } = useSelector(
        state => state.user
    );

    const [name, setName] = useState(userInfo?.name);
    const [email, setEmail] = useState(userInfo?.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            setMessage(null)
            dispatch(updateUserProfile({ id: userInfo._id, name, email, password }))
        }
    }

    if (!userInfo && !loading) {
        return <Redirect to='/login' />
    }

    if (loading) {
        return <Loading />
    }

    return (
    <Row>
        <Col md={4}>
            <Card className="my-3 p-3 rounded shadow">
                <h3 className="text-center">User Profile</h3>
                {error ? <Message variant='danger'>{error}</Message> : null}
                {message ? <Message variant='danger'>{message}</Message> : null}
                {updated ? <Message variant='success'>Profile updated!</Message> : null}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button type='submit' variant='primary' block>
                        Update Profile
                    </Button>
                </Form>

            </Card>
        </Col>
        <Col md={8}>
            <Card className="my-3 p-3 rounded shadow">
                <h3 className="text-center">My Orders</h3>
            </Card>
        </Col>
    </Row>
  );
};

ProfileScreen.propTypes = {
  location: PropTypes.object,
};

export default ProfileScreen;