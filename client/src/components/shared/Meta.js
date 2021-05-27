import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ 
    title="Welcome to TechShop", 
    description="Modern Tech, Great Prices", 
    keywords="Electronics, Technology"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta
        name='keyword'
        content={keywords}
      />
    </Helmet>
  );
};

export default Meta;
