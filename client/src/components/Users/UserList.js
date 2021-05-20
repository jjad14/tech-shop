import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../shared/Message';
import Loading from '../shared/Loading';

import { listUsers } from '../../actions/userActions';

const UserList = () => {
  const dispatch = useDispatch();

  const { userInfo, users } = useSelector((state) => state.user);
  const { errorUser } = useSelector(state => state.error);

  useEffect(() => {
      if (userInfo.isAdmin) {
          dispatch(listUsers());
      }
      else {
        // redirect to home
      }
  }, [dispatch, userInfo.isAdmin]);

  const deleteHandler = () => {

  };

  return (
    <>
      <h2>Users</h2>
      {!users ? (
        <Loading />
      ) : errorUser ? (
        <Message variant='danger'>{errorUser}</Message>
      ) : (
        <Table striped bordered hover responsive size='sm'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`malito:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                    <LinkContainer to={`/user/${user._id}/edit`}>
                        <Button variant="info" size="sm">
                            <i className="fas fa-edit fa-sm"></i>
                        </Button>
                    </LinkContainer>
                    <Button variant="danger" size="sm" onClick={() => deleteHandler(user._id)}className="ml-md-1 mt-1 mt-md-0">
                        <i className="fas fa-trash fa-sm"></i>
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserList;
