import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    this.handleLandingView = this.handleLandingView.bind(this);
    this.handleCatalogView = this.handleCatalogView.bind(this);
    this.handleCartView = this.handleCartView.bind(this);
    this.handleAboutView = this.handleAboutView.bind(this);
  }
  handleLandingView(e) {
    e.preventDefault();
    this.props.setView('landing', {});
  }
  handleCatalogView(e) {
    e.preventDefault();
    this.props.setView('catalog', {});
  }
  handleCartView(e) {
    e.preventDefault();
    this.props.setView('cart', {});
  }
  handleAboutView(e) {
    e.preventDefault();
    this.props.setView('about', {});
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    let orderQuantities = this.props.cart.reduce((total, product) => {
      total += product.quantity;
      return total;
    }, 0);
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" className="header-font noselect">size10</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><i className="fas fa-home fa-lg pointer-hover" onClick={this.handleLandingView}></i></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><i className="fas fa-shoe-prints fa-lg pointer-hover" onClick={this.handleCatalogView}></i></NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="pointer-hover" onClick={this.handleCartView}><i className="fas fa-shopping-cart fa-lg d-inline-block"></i><div className="cart-quantity d-inline-block pl-1 pr-1">{orderQuantities}</div></NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="noselect">More</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="https://github.com/billyhkim/size10" target="_blank">GitHub</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.handleAboutView}>About</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
