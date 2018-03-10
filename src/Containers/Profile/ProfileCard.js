import React from 'react';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';

export const ProfileCard = ({ text, data }) => (
  <div className="ProfileCard">
    {console.log(data)}
    <div className="main-info">
      <div>{data.name}</div>
      <div>{data.email}</div>
      <div>{data.userAddress}</div>
    </div>
    <div className="driver-info">
      <div>{data.passenger.destination}</div>
      <div>{}</div>
    </div>
    <div className="passenger-info" />
  </div>
);
