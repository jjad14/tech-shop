import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../shared/Message';
import Loading from '../shared/Loading';
import { updateUserProfile } from '../../actions/userActions';
import { getMyOrders } from '../../actions/orderActions';

const Profile = () => {
    const dispatch = useDispatch();

    // redux state for user
    const { userInfo, error, loading, updatedProfile } = useSelector(
        state => state.user
    );

    // redux state for orders
    const { orders, loading:loadingOrders, error:errorOrders } = useSelector(
        state => state.order
    );

    // local state, users profile data
    const [name, setName] = useState(userInfo?.name);
    const [email, setEmail] = useState(userInfo?.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);

    // submit updated form data
    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            setMessage(null)
            dispatch(updateUserProfile({ id: userInfo._id, name, email, password }))
        }
    }

    // check if loading
    if (loading) {
        return <Loading />
    }

    return (
      <Row>
        <Col md={4}>
          <Card className='my-3 p-3 rounded shadow'>
            <h3 className='text-center'>User Profile</h3>
            {error ? <Message variant='danger'>{error}</Message> : null}
            {message ? <Message variant='danger'>{message}</Message> : null}
            {updatedProfile ? (
              <Message variant='success'>Profile updated!</Message>
            ) : null}
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
          <Card className='my-3 p-3 rounded shadow'>
            <h3 className='text-center'>My Orders</h3>
            {loadingOrders ? (
              <Loading />
            ) : errorOrders ? (
              <Message variant='danger'>{errorOrders}</Message>
            ) : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Ship</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id.substring(0, 8)}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`} >
                            <Button variant="info" size="sm">
                                More
                            </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>
        </Col>
      </Row>
    );
};

export default Profile;