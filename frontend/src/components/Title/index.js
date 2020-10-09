import React from 'react';

function PageHeader({ title, subtitle }) {
  return (
    <h2> {title} <small>{subtitle}</small> </h2>
  );
}

export default PageHeader;
