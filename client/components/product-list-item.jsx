import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetView = this.handleSetView.bind(this);
  }
  handleSetView(e) {
    e.preventDefault();
    this.props.setView('details', { id: this.props.item.id });
  }
  render() {
    return (
      // <div className="col-sm-4 card-deck">
      //   <div className="card">
      //     <img src={this.props.item.image} alt={this.props.item.name} className="card-img-top item-image"/>
      //     <div className="card-body">
      //       <h4>{this.props.item.name}</h4>
      //       <h5 className="text-muted">${(this.props.item.price / 100).toFixed(2)}</h5>
      //       <div className="description">{this.props.item.price}</div>
      //     </div>
      //   </div>
      // </div>
      <Card>
        <CardImg top width="100%" src={this.props.item.image} alt={this.props.item.name} />
        <CardBody>
          <CardTitle>{this.props.items.brand} {this.props.items.name}</CardTitle>
          <CardSubtitle>{this.props.items.colorway}</CardSubtitle>
          <CardSubtitle>{(this.props.items.price / 100).toFixed(2)}</CardSubtitle>
          <Button>MORE INFO</Button>
        </CardBody>
      </Card>
    );
  }
}
