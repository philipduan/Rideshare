import React from 'react';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';

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
);
