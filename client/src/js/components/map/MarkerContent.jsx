import React from 'react';
import Fragment from 'render-fragment';

const MarkerContent = ({info}) => (
  <Fragment>
    <div className="loc-name">{info.Title}</div>
    <div>{info.Address}</div>
    {info.Address2 && <div>{info.Address2}</div>}
    <div>{info.City}, {info.State} {info.PostalCode}</div>
    {info.Phone && <div>
      <a href={`tel:${info.Phone}`}>{info.Phone}</a>
    </div>}
    {info.Website && <div>
      <a href={info.Website} target="_blank" rel="noopener noreferrer">{info.Website}</a>
    </div>}
  </Fragment>
);
export default MarkerContent;
