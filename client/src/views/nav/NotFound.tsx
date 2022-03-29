import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';
import "./NotFound.css"

export const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Card id="NotFound" color='red' >
      <Card.Content>
        <Card.Header content="Not Found" />
        <Card.Meta content={location.pathname} />
      </Card.Content>
      <Card.Content className='extra'>
        <Button onClick={() => navigate(-1)} >Back</Button>
      </Card.Content>
    </Card>
  )
}

export default NotFound;