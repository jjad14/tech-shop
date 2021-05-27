import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../shared/Meta';
import Message from '../shared/Message';
import Loading from '../shared/Loading';
import FormContainer from '../shared/Forms/FormContainer';
import { getProduct, updateProduct } from '../../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../constants/productTypes';

const ProductEdit = ({ match, history }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { loading, product, productUpdated } = useSelector(
    (state) => state.product
  );
  const { errorProduct } = useSelector((state) => state.error);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [inventory, setInventory] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);


    // not admin but logged in
    // not admin and not logged in

  useEffect(() => {
    if (!userInfo){
      history.push('/login');
    }
    else if (userInfo && !userInfo.isAdmin){
      history.push('/');
    }
    else {
      if (productUpdated) {
        history.push('/admin/products');
        dispatch({ type: PRODUCT_UPDATE_RESET });
      } else {
        if (!product || product._id !== productId) {
          dispatch(getProduct(productId));
        } else {
          setName(product.name);
          setPrice(product.price);
          setImage(product.image);
          setBrand(product.brand);
          setCategory(product.category);
          setInventory(product.inventory);
          setDescription(product.description);
        }
      }
    }
  }, [dispatch, history, productId, product, productUpdated, userInfo]);

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await api.post('/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        inventory,
      })
    );
  };


  return (
    <>
      <Meta title="TechShop Admin | Product Edit"/>
      <Link to='/admin/products' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h2 className='text-center'>Edit Product</h2>
        {/* {errorProduct && <Message variant='danger'>{errorProduct}</Message>} */}
        {loading ? (
          <Loading />
        ) : errorProduct ? (
          <Message variant='danger'>{errorProduct}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                as='input'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <InputGroup className='mb-2'>
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </InputGroup>
            </Form.Group>
            
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                as='input'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadImageHandler}
              ></Form.File>
              {uploading && <Loading />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                as='input'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='inventory'>
              <Form.Label>Inventory</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Inventory'
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='input'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={5}
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' block>
              Update Product
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEdit;
