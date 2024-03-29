import React from 'react';
import { Col, Container, Row } from 'reactstrap';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.handleCatalogView = this.handleCatalogView.bind(this);
  }
  handleCatalogView(e) {
    e.preventDefault();
    this.props.setView('catalog', {});
  }
  render() {
    return (
      <React.Fragment>
        <img className="banner-image" src="./media/thankyou.jpg" alt="Thank you banner image"/>
        <Container className="mt-3 mb-5">
          <Row>
            <Col sm={{ size: 8, offset: 2 }} className="mb-3">
              <div className="border border-secondary rounded p-2">
                <div className="h1 card-font">Me.</div>
                <hr/>
                <img className="billy-image" src="./media/billy.png" alt="Billy picture"/>
                <hr/>
                <div className="h5 description-font">Hi, my name&apos;s Billy, and thanks for stopping by size10.</div>
                <div className="h5 description-font">Since I was a kid, I&apos;ve always loved the feeling of opening a new box of shoes. I would wait with so much anticipation for the new Penny&apos;s or Jordan&apos;s to drop. Because every time I would slip on a new pair, it was a reminder to stay down to earth, and dream of running further.</div>
                <div className="h5 description-font">This app was made using JavaScript, React.js, Reactstrap for styling, and PHP & MySQL to connect to the back-end. And, of course, I wear size 10s.</div>
                <div className="h5 description-font">You can find my project on <a href="https://github.com/billyhkim/size10" rel="noopener noreferrer" target="_blank">GitHub</a> and please feel free to stop by my portfolio site at <a href="https://www.billyhkim.dev/" rel="noopener noreferrer" target="_blank">www.billyhkim.dev</a> to view my other projects.</div>
              </div>
            </Col>
          </Row>
          <button type="button" className="btn btn-lg btn-warning btn-block card-font" onClick={this.handleCatalogView}><i className="fas fa-shoe-prints fa-lg pointer-hover"></i> CATALOG</button>
        </Container>
      </React.Fragment>
    );
  }
}
