import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../shared/Message';
import Loading from '../shared/Loading';
import Paginate from '../shared/Paginate';

import { listUsers, deleteUser } from '../../actions/userActions';

const UserList = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const { userInfo, users, userDeleted,  pages, page } = useSelector((state) => state.user);
  const { errorUser } = useSelector(state => state.error);

  useEffect(() => {
      if (userInfo && userInfo.isAdmin) {
          dispatch(listUsers(pageNumber));
      }
      else if (!userInfo.isAdmin){
        history.push('/');
      }
      else {
        history.push('/login');
      }
  }, [dispatch, userInfo, userInfo.isAdmin, userDeleted, history, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm("This action is permanant. Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h2 className="text-center text-md-left">User Accounts</h2>
      {!users ? (
        <Loading />
      ) : errorUser ? (
        <Message variant='danger'>{errorUser}</Message>
      ) : (
        <>
          <Card className="my-3 p-1 rounded shadow">
            {errorUser && <Message variant='danger'>{errorUser}</Message>}
            {userDeleted && <Message variant='info' exit>User has been deleted</Message>}
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
                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                            <Button variant="info" size="sm">
                                <i className="fas fa-edit fa-sm"></i>
                            </Button>
                        </LinkContainer>
                        <Button variant="danger" size="sm" onClick={() => deleteHandler(user._id)}className="ml-md-1 mt-1 mt-md-0" disabled={userInfo._id === user._id}>
                            <i className="fas fa-trash fa-sm"></i>
                        </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
          <Paginate total={pages} page={page} />
        </>
      )}
    </>
  );
};

export default UserList;
