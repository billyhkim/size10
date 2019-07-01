import React from 'react';
import { Container } from 'reactstrap';

export default class ThankYou extends React.Component {
  constructor(props) {
    super(props);
    this.handleHomeView = this.handleHomeView.bind(this);
  }
  handleHomeView() {
    this.props.setView('landing', {});
  }
  render() {
    return (
      <React.Fragment>
        <Container className="header-font text-center mb-4">
          <div className="h1 mt-4">Thank you for demoing size10!</div>
          <div className="h1 mt-3 mb-3">Hope you have a great one 🙌 🏀</div>
          <button type="button" className="btn btn-lg btn-warning btn-block card-font" onClick={this.handleHomeView}>BACK HOME</button>
        </Container>
        <img className="thankyou-image" src="/media/thankyoubanner.jpg" alt="Thank you banner image"/>
      </React.Fragment>
    );
  }
}
