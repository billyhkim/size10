import React from 'react';
import { Container } from 'reactstrap';

export default class Landing extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="landing-background">
          <Container>
            <div className="h1 header-font pt-5 pl-1">Welcome to size10</div>
            <div className="h3 card-font pt-3 pl-1">&quot;To wear dreams on one’s feet is to begin to give a reality to one’s dreams.&quot;</div>
            <div className="h4 card-font pl-1">Roger Vivier</div>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
