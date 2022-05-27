import React from 'react';
import Store from "../store/Store";
import {Button, Stack} from "react-bootstrap";

const Item = ({name, price}) => {
    return (
        <Stack direction="horizontal" gap={2}>
            <div className="bg-light border">{name} {price}</div>
            <div className="bg-light border ms-auto">+/-</div>
            <div className="bg-light border">
                <Button variant="outline-primary">X</Button>
            </div>
        </Stack>
    )
}

const CartList = () => {
    return (
        <>
            {Store.cart.map(item => (
                <Item key={item.name} name={item.name} price={item.price}/>
            ))}
        </>
    )
}

const Cart = () => {
    return (
        <div style={{background: 'lightgray'}}>
            <h3>Корзина</h3>
            <div style={{overflowY: 'scroll', height: '75vh'}}>
                {Store.cart.length !== 0 ?
                    <Stack gap={2}>
                        <CartList/>
                    </Stack>
                    : <p>нет добавленных книг</p>}
            </div>
        </div>
    );
};

export default Cart;