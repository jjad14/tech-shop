import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../shared/Meta';
import Message from '../shared/Message';
import Loading from '../shared/Loading';
import Paginate from '../shared/Paginate';

import {
  getProducts,
  deleteProduct,
  createProduct,
} from '../../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../constants/productTypes';

const ProductList = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const {
    product,
    products,
    productDeleted,
    productCreated,
    pages,
    page,
  } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.user);
  const { errorUser, errorProduct } = useSelector((state) => state.error);

  useEffect(() => {
    if (productCreated) {
      history.push(`/admin/product/${product._id}/edit`);
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
  });

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getProducts('', pageNumber));
    } else if (!userInfo.isAdmin) {
      history.push('/');
    } else {
      history.push('/login');
    }
  }, [
    dispatch,
    userInfo,
    userInfo.isAdmin,
    productDeleted,
    history,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (
      window.confirm(
        'This action is permanant. Are you sure you want to delete this product?'
      )
    ) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    // create product
    dispatch(createProduct());
  };

  return (
    <>
      <Meta title="TechShop Admin | Product List"/>
      <Row className='align-items-center'>
        <Col>
          <h2>Inventory</h2>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus fa-sm'></i>{' '}
            <span className='d-md-inline d-none'>Create</span>
          </Button>
        </Col>
      </Row>
      {errorProduct && <Message variant='danger'>{errorProduct}</Message>}
      {!products ? (
        <Loading />
      ) : errorUser || errorProduct ? (
        <>
          {errorUser && <Message variant='danger'>{errorUser}</Message>}
          {errorProduct && <Message variant='danger'>{errorProduct}</Message>}
        </>
      ) : (
        <>
          <Card className='my-3 p-1 rounded shadow'>
            {productDeleted && (
              <Message variant='info' exit>
                Product has been deleted
              </Message>
            )}
            <Table striped bordered hover responsive size='sm'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='info' size='sm'>
                          <i className='fas fa-edit fa-sm'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        size='sm'
                        onClick={() => deleteHandler(product._id)}
                        className='ml-lg-1 mt-2 mt-lg-0'
                      >
                        <i className='fas fa-trash fa-sm'></i>
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

export default ProductList;
