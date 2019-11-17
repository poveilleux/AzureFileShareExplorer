import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/NavLink';
import authorizeService from './authorization/AuthorizeService';

const Layout: React.SFC = (props) => {
    const [name, setName] = useState("");

    // Subscribe to name updates.
    useEffect(() => {
        const subscriptionId = authorizeService.subscribe(() => setName(""))
        return function cleanup() {
            authorizeService.unsubscribe(subscriptionId);
        };
    });

    // Load the current user's name.
    useEffect(() => {
        const fetchName = async () => {
            const user = await authorizeService.getUser();
            if (user) {
                setName(user.name);
            }
        };

        fetchName();
    }, [name]);

    return (
        <div>
            <Navbar bg="light">
                <Navbar.Brand href="/">Azure File Share Explorer</Navbar.Brand>
                <Navbar.Toggle />
                {
                    name ?
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Dropdown alignRight>
                                    <Dropdown.Toggle id="user-dropdown" as={NavLink}>{name}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => authorizeService.signOut()}>Sign out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
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
