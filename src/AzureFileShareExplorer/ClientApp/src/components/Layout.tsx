import React from 'react';
import Container from 'react-bootstrap/Container';

const Layout: React.SFC = (props) => {
    return (
        <Container>
            {props.children}
        </Container>
    )
};

export default Layout;
