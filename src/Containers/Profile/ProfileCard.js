import React from 'react';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';

<<<<<<< HEAD
export const ProfileCard = ({ text }) => (
  <div className="ProfileCard">
    <Card>
      <CardHeader
        title="URL Avatar"
        subtitle="Subtitle"
        avatar="images/jsa-128.jpg"
      />

      <CardTitle title="Card title" subtitle="Card subtitle" />
    </Card>
  </div>
=======
export const ProfileCard = ({ text, data }) => (
  <div className="ProfileCard">{text}</div>
>>>>>>> master
);
