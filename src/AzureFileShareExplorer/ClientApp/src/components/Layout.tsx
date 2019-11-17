import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import authorizeService from './authorization/AuthorizeService';

const Layout: React.SFC = (props) => {
    const [name, setName] = useState("");

    return (
        <div>
            <Navbar bg="light">
                <Navbar.Brand>Azure File Share Explorer</Navbar.Brand>
                <Navbar.Toggle />
                {
                    name ?
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <NavDropdown title="Samichouette" id="user-dropdown">
                                    <NavDropdown.Item>Sign out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        : null
                }
            </Navbar>

            <Container className="mt-3">
                {props.children}
            </Container>
        </div>
    )
};

export default Layout;
