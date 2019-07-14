import React from 'react';
import { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
    this.handleCatalogView = this.handleCatalogView.bind(this);
    this.handleAboutView = this.handleAboutView.bind(this);
    this.toggle = this.toggle.bind(this);
    this.userClickedUnderstandDisclaimer = this.userClickedUnderstandDisclaimer.bind(this);
  }
  componentDidMount() {
    // does not show disclaimer modal again once initially clicked by user
    !localStorage.clickedDisclaimer ? this.setState({ modal: true }) : this.setState({ modal: false });
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  userClickedUnderstandDisclaimer() {
    this.toggle();
    localStorage.clickedDisclaimer = true;
  }
  handleCatalogView(e) {
    e.preventDefault();
    this.props.setView('catalog', {});
  }
  handleAboutView(e) {
    e.preventDefault();
    this.props.setView('about', {});
  }
  render() {
    return (
      <div className="landing-background">
        <Container>
          <Row>
            <Col sm="4" className="h1 header-font pt-5">We&apos;re size10</Col>
          </Row>
          <Row>
            <Col sm="4" className="h3 card-font mb-3">Where all of our shoes are size 10.<br/></Col>
          </Row>
          <Row>
            <Col sm="6" className="h3 card-font pt-3 landing-quote">&quot;To wear dreams on one’s feet is to begin to give a reality to one’s dreams.&quot;<br/></Col>
          </Row>
          <Row>
            <Col sm="5" className="h4 card-font text-white">Roger Vivier</Col>
          </Row>
          <button type="button" className="col-sm-4 btn btn-lg btn-danger btn-block card-font mt-4 mb-3" onClick={this.handleCatalogView}><i className="fas fa-shoe-prints fa-lg pointer-hover"></i> CATALOG</button>
          <button type="button" className="col-sm-4 btn btn-lg btn-danger btn-block card-font mb-3" onClick={this.handleAboutView}>ABOUT</button>
          <button type="button" className="col-sm-4 btn btn-lg btn-danger btn-block card-font" onClick={this.toggle}>DISCLAIMER</button>
        </Container>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={'static'}>
          <ModalHeader className="card-font"><i className="fas fa-exclamation text-danger"></i> DISCLAIMER</ModalHeader>
          <ModalBody>
            <div className="container mt-1 mb-1 description-font">Thank you for visiting size10. Please note that this is simply a demo site and not a real e-commerce store. Please enjoy your time here! 😁</div>
            <div className="container mt-2 mb-1 description-font">Sincerely,</div>
            <div className="container mb-1 description-font">Billy</div>
          </ModalBody>
          <ModalFooter className="card-font">
            <Button color="success" onClick={this.userClickedUnderstandDisclaimer}>I UNDERSTAND</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
