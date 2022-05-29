import React from 'react';
import Store from "../../store/Store";
import {Button, Card, Stack} from "react-bootstrap";
import {observer} from "mobx-react";
import './style.css';
import BuyButton from "./BuyButton";

const Item = observer(({name, price, count}) => {
    return (
        <Card border="primary" className="mb-2">
            <Stack direction="horizontal" gap={1} className='cart__stack'>
                <div>
                    <p>{name}</p>
                    <h6>{price} р</h6>
                </div>
                <div className="ms-auto cart__input">
                    <span onClick={() => {
                        Store.plus(name)
                    }}>
                        <svg width="19" height="11" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.9081 0.259789L0.225798 9.59441C0.080856 9.75016 0 9.95709 0 10.1723C0 10.3875 0.080856 10.5944 0.225798 10.7501L0.235608 10.7602C0.305873 10.836 0.39045 10.8963 0.484194 10.9375C0.577939 10.9787 0.678891 11 0.780909 11C0.882927 11 0.983879 10.9787 1.07762 10.9375C1.17137 10.8963 1.25594 10.836 1.32621 10.7602L9.50163 1.96993L17.6738 10.7602C17.7441 10.836 17.8286 10.8963 17.9224 10.9375C18.0161 10.9787 18.1171 11 18.2191 11C18.3211 11 18.4221 10.9787 18.5158 10.9375C18.6095 10.8963 18.6941 10.836 18.7644 10.7602L18.7742 10.7501C18.9191 10.5944 19 10.3875 19 10.1723C19 9.95709 18.9191 9.75016 18.7742 9.59441L10.0919 0.259789C10.0155 0.177694 9.92371 0.112338 9.82197 0.0676825C9.72023 0.0230265 9.61069 0 9.5 0C9.38931 0 9.27977 0.0230265 9.17803 0.0676825C9.07628 0.112338 8.98445 0.177694 8.9081 0.259789Z"
                                fill="#888888"/>
                        </svg>
                    </span>
                    <input type="number" min='1' className="form-control" value={count}
                           onChange={(e) => {
                               Store.changeCount(name, +e.target.value)
                           }}/>
                    <span onClick={() => {
                        Store.minus(name)
                    }}>
                        <svg width="19" height="11" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.0919 10.7402L18.7742 1.40559C18.9191 1.24984 19 1.04291 19 0.827729C19 0.612545 18.9191 0.405618 18.7742 0.249865L18.7644 0.239814C18.6941 0.164047 18.6095 0.103715 18.5158 0.0624879C18.4221 0.0212606 18.3211 1.35718e-07 18.2191 1.35718e-07C18.1171 1.35718e-07 18.0161 0.0212606 17.9224 0.0624879C17.8286 0.103715 17.7441 0.164047 17.6738 0.239814L9.49837 9.03007L1.32621 0.239814C1.25595 0.164047 1.17137 0.103715 1.07763 0.0624879C0.983881 0.0212606 0.882929 1.35718e-07 0.780911 1.35718e-07C0.678893 1.35718e-07 0.577941 0.0212606 0.484197 0.0624879C0.390453 0.103715 0.305875 0.164047 0.23561 0.239814L0.225799 0.249865C0.0808574 0.405618 6.00006e-07 0.612545 6.00006e-07 0.827729C6.00006e-07 1.04291 0.0808574 1.24984 0.225799 1.40559L8.9081 10.7402C8.98445 10.8223 9.07629 10.8877 9.17803 10.9323C9.27977 10.977 9.38931 11 9.5 11C9.61069 11 9.72023 10.977 9.82197 10.9323C9.92372 10.8877 10.0155 10.8223 10.0919 10.7402Z"
                                fill="#888888"/>
                        </svg>
                    </span>
                </div>
                <div>
                    <Button variant="secondary" size="sm" onClick={() => {
                        Store.deleteBookFromCart(name)
                    }}>x</Button>
                </div>
            </Stack>
        </Card>
    )
})

const CartList = observer(() => {
    return (
        <>
            <div className='cart__list'>
                {Store.cart.map(item => (
                    <Item key={item.name} name={item.name} price={item.price} count={item.count}/>
                ))}
            </div>
            <BuyButton/>
        </>
    )
})

const Cart = observer(() => {
    return (
        <>
            <h3>Корзина</h3>
            {Store.cart.length !== 0 ? <CartList/>
                : <div className='cart__empty'><p>нет добавленных книг</p></div>}
        </>
    )
})

export default Cart