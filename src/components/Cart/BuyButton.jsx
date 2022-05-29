import React from 'react';
import {observer} from "mobx-react";
import Store from "../../store/Store";
import {Button} from "react-bootstrap";

const BuyButton = observer(() => {
    return (
        <div className='buy'>
            <span className='buy__text'>Итого: <span>{Store.totalPriceCart}</span> р</span>
            <Button variant="outline-secondary" size="lg" onClick={Store.buyBooks}>
                Купить
            </Button>
        </div>
    );
});

export default BuyButton;