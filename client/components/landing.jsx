import React from 'react';
import { Container, Col, Row, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: true };
    this.handleCatalogView = this.handleCatalogView.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  handleCatalogView(e) {
    e.preventDefault();
    this.props.setView('catalog', {});
  }
  render() {
    return (
      <div className="landing-background">
        <Container>
          <Row>
            <Col sm="4" className="h1 header-font pt-5">We&apos;re size10</Col>
          </Row>
          <Row>
            <Col sm="5" className="h3 card-font pt-3 landing-quote">&quot;To wear dreams on one’s feet is to begin to give a reality to one’s dreams.&quot;<br/></Col>
          </Row>
          <Row>
            <Col sm="5" className="h4 card-font text-white">Roger Vivier</Col>
          </Row>
          <button type="button" className="col-sm-3 btn btn-lg btn-danger btn-block card-font mt-4" onClick={this.handleCatalogView}><i className="fas fa-shoe-prints fa-lg pointer-hover"></i>SHOES</button>
          <button type="button" className="col-sm-3 btn btn-lg btn-danger btn-block card-font">ABOUT</button>
        </Container>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="card-font" toggle={this.toggle}><i className="fas fa-exclamation text-danger"></i> DISCLAIMER</ModalHeader>
          <ModalBody>
            <div className="container mt-1 mb-1 description-font">Thank you for visiting size10. Please note that this is simply a demo site and not a real e-commerce store. Please enjoy your time here! 😁</div>
            <div className="container mt-2 mb-1 description-font">Sincerely,</div>
            <div className="container mb-1 description-font">Billy</div>
          </ModalBody>
          <ModalFooter className="card-font">
            <Button color="success" onClick={this.toggle}>I UNDERSTAND</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
