import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../shared/Meta';
import Message from '../shared/Message';
import Loading from '../shared/Loading';
import Paginate from '../shared/Paginate';

import { listAllOrders} from '../../actions/orderActions';

const OrderList = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const { orders, pages, page } = useSelector(state => state.order);
  const { userInfo } = useSelector((state) => state.user);
  const { errorUser, errorOrder } = useSelector((state) => state.error);

  useEffect(() => {
    if (!userInfo) {
        history.push('/login');
    }
    else if (userInfo && !userInfo.isAdmin) {
        history.push('/');
    }
    else {
        dispatch(listAllOrders(pageNumber));
    }
  }, [dispatch, userInfo, history, pageNumber ]);

  return (
    <>
      <Meta title="TechShop Admin | Order List"/>
      <h2 className="text-center text-md-left">Confirmed Orders</h2>
      {!orders ? (
        <Loading />
      ) : errorUser ? (
        <>
            {errorUser && <Message variant='danger'>{errorUser}</Message>}
        </>
    ) : (
      <>
        <Card className="my-3 p-1 rounded shadow">
          {errorOrder && <Message variant='danger' exit>{errorOrder}</Message>}
          <Table striped bordered hover responsive size='sm'>
            <thead>
              <tr>
                <th>Id</th>
                <th>User</th>
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
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                    {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                    ) : (
                        <i className='fas fa-times fa-sm' style={{ color: 'red' }}></i>
                    )}
                    </td>
                    <td>
                    {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                    ) : (
                        <i className='fas fa-times fa-sm' style={{ color: 'red' }}></i>
                    )}
                    </td>
                    <td>
                    <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='info' size='sm'>
                            Details
                        </Button>
                    </LinkContainer>
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

export default OrderList;
