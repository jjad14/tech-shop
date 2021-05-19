import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <Spinner 
            animation='border' 
            role='status'
            className="d-block py-3 m-auto text-center" 
            style={{ width: '100px', height: '100px'}}>
                <span className="sr-only">Loading...</span>
        </Spinner>
    );
};

export default Loading;
