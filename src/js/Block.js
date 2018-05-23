import React from 'react'
import {Card,
        CardBody,
        CardText
        } from 'reactstrap';

class Block extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          <CardText> <b>{this.props.header}</b>: {this.props.body}</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default Block
