import React from 'react';
import Fragment from 'render-fragment';

const ListLocationContent = ({location}) => (
  <Fragment>
    <div className="list-label">{location.Number}</div>
    <div className="list-details">
      <div className="list-content">
        <div className="loc-name">{location.Title}</div>
        <div className="loc-addr">{location.Address}</div>
        {location.Address2 && <div className="loc-addr2">{location.Address2}</div>}
        <div className="loc-addr3">{location.City}, {location.State} {location.PostalCode}</div>
        {location.Phone && <div className="loc-phone">{location.Phone}</div>}
        {location.Website && <div className="loc-web">
          <a href={location.Website} target="_blank">{location.WebsiteText}</a>
        </div>}
        {location.Email && <div className="loc-email">
          <a href={`mailto:${location.Email}`}>{location.EmailText}</a>
        </div>}
        {location.Distance && <div className="loc-dist">
          {location.Distance} {location.Unit} | <a href={location.DirectionsLink}
                                                   target="_blank">{location.DirectionsText}</a>
        </div>}
      </div>
    </div>
  </Fragment>
);

export default ListLocationContent;
