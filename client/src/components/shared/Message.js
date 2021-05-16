import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

const Message = ({ variant = 'info', children, exit = false }) => {
    const [show, setShow] = useState(true);

    if (!exit) {
        return (
            <Alert variant={variant}>
                {children}
            </Alert>
        );
    }

    return (
        <Alert show={show} variant={variant}>
            <div className="d-flex flex-row">
                <div className="mr-2">
                    <Button onClick={() => setShow(false)} variant={`outline-${variant}`} style={{color: "white"}}>
                        <i class="fas fa-times fa-sm"></i>
                    </Button>
                </div>
                <div className="flex-grow-1 pt-1">
                    <span class="align-middle m-auto">{children}</span>
                </div>

            </div>
      </Alert>
    );
};

export default Message;


