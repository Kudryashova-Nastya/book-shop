import React, {useEffect} from 'react';
import {observer} from "mobx-react";
import Store from "../../store/Store";
import {Button, Card} from "react-bootstrap";
import DotLoader from "react-spinners/DotLoader";
import './style.css';
import ToastCookie from "../Toast/ToastCookie";
import ToastOk from "../Toast/ToastOk";


const Item = ({name, authorName, price, coverUrl}) => {
    return (
        <Card>
            <div className='card__img' style={{backgroundImage: `url(${coverUrl})`}}>
                {/*<Card.Img variant="top" src={coverUrl}/>*/}
            </div>
            <Card.Body className='card__body'>
                <div>
                <Card.Title>{price} р</Card.Title>
                <h6>{name}</h6>
                <Card.Text>
                    {authorName}
                </Card.Text>
                </div>
                <div className='card__footer'>
                    <Button variant="outline-primary" onClick={() => {
                        Store.addBookToCart(name, price)
                    }}>
                        В корзину
                    </Button>
                </div>

            </Card.Body>

        </Card>
    )
}

const Books = observer(() => {
    useEffect(() => {
        void Store.fetchBooksInfo()
    }, [])

    return (
        <div className="books">
            <div className={(Store.isLoading || Store.booksInfo.length === 0) ? 'band-empty' : 'band'}>

                {Store.isLoading ?
                    <DotLoader color={'rgb(120, 194, 173)'} size={70}/> :

                    (Store.booksInfo.length > 0) ? Store.booksInfo.map(item => (
                        <Item key={item.name} name={item.name} authorName={item.authorName} price={item.price}
                              coverUrl={item.coverUrl}/>
                    )) : <p>книг нет</p>
                }

            </div>
            <ToastCookie/>
            <ToastOk/>
        </div>
    );
});

export default Books;