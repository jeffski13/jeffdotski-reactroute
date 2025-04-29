import React, { Component } from 'react';
import { Navbar, NavItem, NavDropdown, Nav } from 'react-bootstrap'
import ROUTES from '../consts/ROUTES';
import './styles.css';

class NavigationBar extends Component {
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark" fixed="top" collapseOnSelect expand="sm">
                    <Nav.Link href="/">
                        <Navbar.Brand className="brand">jeff.ski</Navbar.Brand>
                    </Nav.Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <NavDropdown title="Software Engineering" id="navigationbar-softwareengineering">
                                <NavDropdown.Item href="https://s3.us-east-2.amazonaws.com/jeff.ski/resume/JeffSzcinski_Resume2021_08_14_SoftwareEng.pdf" >Resume</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav >
                            <Nav.Link href="/aboutme/bio">Bio</Nav.Link>
                            <Nav.Link href={ROUTES.travelTrailsHome}>Travel Trails</Nav.Link>
                            <Nav.Link href="/aboutme/hobbies">Hobbies</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        );
    }

}

export default NavigationBar;