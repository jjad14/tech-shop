import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../shared/Message';
import Loading from '../shared/Loading';
import FormContainer from '../shared/Forms/FormContainer';
import { getUserById, updateUser } from '../../actions/userActions';
import { USER_UPDATE_RESET } from '../../constants/userTypes';

const UserEdit = ({ match, history }) => {
  const userId = match.params.id;
  
  const dispatch = useDispatch();

  const { loading, selectedUser, userInfo, userUpdated } = useSelector(
    (state) => state.user
  );
  const { errorUser } = useSelector((state) => state.error);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!userInfo){
      history.push('/login');
    }
    else if (userInfo && !userInfo.isAdmin){
      history.push('/');
    }
    else {
      if (userUpdated) {
        history.push('/admin/users');
        dispatch({ type: USER_UPDATE_RESET })
      } else {
        if (!selectedUser || selectedUser._id !== userId) {
            dispatch(getUserById(userId));
        } 
        else {
            setName(selectedUser.name);
            setEmail(selectedUser.email);
            setIsAdmin(selectedUser.isAdmin);
        }
      }
    }
  }, [dispatch, history, userId, selectedUser, userUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/users' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h2 className="text-center">Edit User</h2>
        {/* {errorUser && <Message variant='danger'>{errorUser}</Message>} */}
        {loading ? (
          <Loading />
        ) : errorUser ? (
          <Message variant='danger'>{errorUser}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is an Admin?'
                checked={isAdmin}
                disabled={userInfo._id === selectedUser?._id}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary' block>
              Update User
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEdit;