import React from 'react';
import Store from "../../store/Store";
import {observer} from "mobx-react";
import './style.css';

const Balance = observer(() => {
    return (
        <span className='balance'>
            Баланс: <span>{Store.balance}</span> р
        </span>
    );
});

export default Balance;