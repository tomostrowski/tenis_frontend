import React, { Component } from "react";
import logo from "../logo.png";
import { Nav, Navbar } from "react-bootstrap";

export class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <Navbar expand="md">
            <Navbar.Brand href="/"><img src={logo} alt="Logo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                {/* <Nav.Item>
                  <Nav.Link href="/Login">Login</Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link href="/pricing">Cennik</Nav.Link>
                </Nav.Item> */}
                {/* <Nav.Item>
                  <Nav.Link href="/contact">Contact</Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link href="/addPlayer">Dodaj zawodnika</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
