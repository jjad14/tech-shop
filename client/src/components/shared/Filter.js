import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import Loading from './Loading';
import Message from './Message';

import { getBrands, getCategories } from '../../actions/productActions';

const Filter = ({ brandParam, categoryParam }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { products, categories, brands, loadingFilter } = useSelector(
    (state) => state.product
  );
  const { errorFilter } = useSelector((state) => state.error);

  const [brand, setBrand] = useState(brandParam ?? '');
  const [brandSelected, setBrandSelected] = useState(brands.indexOf(brandParam) ?? '');

  const [category, setCategory] = useState(categoryParam ?? '');
  const [categorySelected, setCategorySelected] = useState(categories.indexOf(categoryParam) ?? '');

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);

  const selectCategory = (e, i) => {
    setCategory(e.target.value);
    setCategorySelected(i);
  };

  const selectBrand = (e ,i) => {
    setBrand(e.target.value);
    setBrandSelected(i); 
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (brand === '' && category !== '') {
      history.push(`/category/${category}`);
    }
    else if (brand !== '' && category === '') {
      history.push(`/brand/${brand}`);
    }
    else if ( brand !== '' || category !== '') {
      history.push(`/brand/${brand}/category/${category}`);
    }

    setBrand('');
    setCategory('');
  };

  return loadingFilter ? (
    <Loading />
  ) : (
      <>
        {/* {errorFilter && <Message variant="danger">{errorFilter}</Message>} */}
        {products && (
          <Card className='my-3 p-3 rounded shadow'>
            <Row>
              <Col>
                <Link to='/' className='btn btn-outline-dark btn-sm float-right'>
                  Reset
                </Link>
              </Col>
            </Row>
            <Row className='justify-content-center my-2'>
                <h5>Filter Products</h5>
            </Row>
            <hr />
            <Row className='justify-content-center mt-1'>
                <h6>
                    <strong>Categories</strong>
                </h6>
            </Row>
            <hr />
            <Form onSubmit={submitHandler} className="my-2">
                {categories.map((category, i) => (
                <Form.Check 
                    key={i} 
                    id={`category-${category}`} 
                    label={category} 
                    value={category}
                    checked={categorySelected === i}
                    onChange={(e) => selectCategory(e, i)}/>
                ))}
                <Button type='submit' variant='outline-info' className='p-2 my-2 float-right' size="sm">
                <i className="fas fa-filter"></i>
                </Button>
            </Form>

            <Row className='justify-content-center mt-2'>
                <h6>
                    <strong>Brands</strong>
                </h6>
            </Row>
            <hr />
            <Form onSubmit={submitHandler} className="mb-4">
                {brands.map((brand, i) => (
                <Form.Check 
                    key={i} 
                    id={`brand-${brand}`} 
                    label={brand} 
                    value={brand}
                    checked={brandSelected === i}
                    onChange={(e) => selectBrand(e, i)}/>
                ))}
                <Button type='submit' variant='outline-info' className='p-2 my-3 float-right' size="sm">
                <i className="fas fa-filter"></i>
                </Button>
            </Form>
          </Card>
        )}
      </>
  );
};

export default Filter;
