import React from 'react';
import { Button, Card, CardBody, CardImg, CardSubtitle, Col } from 'reactstrap';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fallbackImageError: true
    };
    this.handleSetView = this.handleSetView.bind(this);
    this.addFallbackSrc = this.addFallbackSrc.bind(this);
  }
  handleSetView(e) {
    e.preventDefault();
    this.props.setView('details', { id: this.props.item.id });
  }
  addFallbackSrc(e) {
    // prevents infinite callback loop if fallback also fails
    if (this.state.fallbackImageError) {
      this.setState({
        fallbackImageError: false
      });
      e.target.src = './media/fallback.png';
    }
  }
  render() {
    return (
      <Col xs="12" sm="6" md="4" lg="3" className="mt-2 mb-2 d-flex align-items-stretch">
        <Card className="card-font text-center shadow-sm">
          <CardImg top width="100%" src={this.props.item.image} alt={this.props.item.name} onError={this.addFallbackSrc} />
          <CardBody>
            <CardSubtitle className="h6 text-muted mb-1">{this.props.item.name}</CardSubtitle>
            <CardSubtitle className="h2 mb-1">{(this.props.item.colorway).toUpperCase()}</CardSubtitle>
            <CardSubtitle className="h5 text-muted mb-1">{'$' + (this.props.item.price / 100).toFixed(2)}</CardSubtitle>
            <Button className="btn-block" onClick={this.handleSetView}>MORE INFO</Button>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
