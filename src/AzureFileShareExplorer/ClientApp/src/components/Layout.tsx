import React from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/NavLink';

import authorizeService from 'src/components/authorization/AuthorizeService';

const Layout: React.FC = (props) => {
    const [name, setName] = React.useState("");

    // Subscribe to name updates.
    React.useEffect(() => {
        const subscriptionId = authorizeService.subscribe(() => setName(""))
        return function cleanup() {
            authorizeService.unsubscribe(subscriptionId);
        };
    });

    // Load the current user's name.
    React.useEffect(() => {
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
