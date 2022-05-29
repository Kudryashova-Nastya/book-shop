import React from 'react';
import Store from "../../store/Store";
import {Button, Card, Stack} from "react-bootstrap";
import {observer} from "mobx-react";
import './style.css';

const Item = observer(({name, price}) => {
    return (
        <Card border="primary" className="mb-2">
            <Stack direction="horizontal" gap={1} style={{padding: '0.5rem'}}>
                <div>
                    <p style={{marginBottom: '0.5rem'}}>{name}</p>
                    <h6>{price} р</h6>
                </div>
                <div className="ms-auto">+/-</div>
                <div>
                    <Button variant="secondary" size="sm" onClick={() => {
                        Store.deleteBookFromCart(name)
                    }}>x</Button>
                </div>
            </Stack>
        </Card>
    )
})

const Cart = observer(() => {
    return (
        <>
            <h3>Корзина</h3>
            <div className='cart'>
                {Store.cart.length !== 0 ?
                    Store.cart.map(item => (
                        <Item key={item.name} name={item.name} price={item.price}/>
                    ))
                    : <p>нет добавленных книг</p>}
            </div>
        </>
    )
})

export default Cart