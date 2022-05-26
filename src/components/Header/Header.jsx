import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import LOGO from './Icon.svg'

const Header = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home" style={{fontSize: '1.5em'}}>
                    <img
                        alt=""
                        src={LOGO}
                        width="30"
                        height="30"
                        className="d-inline-block align-top my-1 mx-2"
                    />{' '}
                    Магазин книг
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Header;