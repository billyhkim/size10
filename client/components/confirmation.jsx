import React from 'react';
import { Container } from 'reactstrap';

export default class Confirmation extends React.Component {
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
          <div className="h2 mt-4">🙌 Thank you for demoing size10! 🏀</div>
          <div className="h2 mt-3 mb-3">Confirmation</div>
          <i className="fas fa-check-circle fa-8x mb-3 text-success"></i>
          <button type="button" className="btn btn-lg btn-warning btn-block card-font" onClick={this.handleHomeView}>BACK HOME</button>
        </Container>
        <img className="thankyou-image" src="./media/thankyoubanner.jpg" alt="Thank you banner image"/>
      </React.Fragment>
    );
  }
}
