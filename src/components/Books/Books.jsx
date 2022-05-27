import React, {useEffect} from 'react';
import {observer} from "mobx-react";
import Store from "../../store/Store";
import {Button, Card} from "react-bootstrap";
import './style.css';


const Item = ({name, authorName, price, coverUrl}) => {
    return (
        <Card >
            <div style={{flex: 1}}>
            <Card.Img variant="top" src={coverUrl}/>
            </div>
            <Card.Body style={{flex: 'none'}}>
                <Card.Title>{price} р</Card.Title>
                <h6>{name}</h6>
                <Card.Text>
                    {authorName}
                </Card.Text>
                <Button variant="outline-primary">В корзину</Button>
            </Card.Body>
        </Card>
    )
}

const Books = observer(() => {
    useEffect(() => {
        Store.fetchBooksInfo({})
    }, [])

    return (
        <div style={{overflowY: 'scroll', height: '85vh'}}>
            <div className='band'>
                {Store.booksInfo !== null ? Store.booksInfo.map(item => (
                    <Item key={item.name} name={item.name} authorName={item.authorName} price={item.price}
                                 coverUrl={item.coverUrl} />
                )) : <p>книг нет</p>}
            </div>
        </div>
    );
});

export default Books;