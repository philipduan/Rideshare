import React from 'react';

export const ProfileCard = ({ data }) => {
  return (
    <div className="ProfileCard">
      {console.log(data)}
      <div className="main-info">
        <div>{data.name}</div>
        <div>{data.email}</div>
        <div>{data.userAddress}</div>
      </div>
      {/* { data ?  <div className="driver-info">
        <div>{data.passenger.destination}</div>
        <div>{}</div>
      </div> : 
      <div className="passenger-info" />} */}
    </div>
  );
};
