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
          <NavbarBrand href="/" className="header-font">size10</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><i className="fas fa-home pointer-hover" onClick={this.handleLandingView}></i></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><i className="fas fa-shoe-prints pointer-hover" onClick={this.handleCatalogView}></i></NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="pointer-hover">Cart Items: {orderQuantities}</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>More</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="https://github.com/billyhkim/size10" target="_blank">GitHub</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>About</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
