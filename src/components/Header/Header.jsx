import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import LOGO from './Icon.svg'
import Balance from "./Balance";
import './style.css';

const Header = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="https://github.com/Kudryashova-Nastya/book-shop" className='logo'>
                    <img
                        alt=""
                        src={LOGO}
                        width="30"
                        height="30"
                        className="d-inline-block align-top my-1 mx-2"
                    />{' '}
                    Магазин книг
                </Navbar.Brand>
                <Balance/>
            </Container>
        </Navbar>
    );
};

export default Header;