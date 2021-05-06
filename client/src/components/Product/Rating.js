import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ rating, text, color}) => {
    return (
        <div className="rating my-3">
            <span>
                {[...Array(5)].map((_, i) => {
                    const cls = rating >= i + 1
                        ? 'fas fa-star'                 //full star
                        : rating >= i + 0.5
                            ? 'fas fa-star-half-alt'    //half star
                            : 'far fa-star'             //empty star
                    
                    return <i key={'Star' + i}
                            style={{ color }}  
                            className={cls} />
                            
                })}
                &nbsp; {text}
            </span>
        </div>
    );
};

Rating.propTypes = {
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default Rating;
