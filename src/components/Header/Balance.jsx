import React from 'react';
import Store from "../../store/Store";
import {observer} from "mobx-react";

const Balance = observer(() => {
    return (
        <span style={{fontSize: '1.2rem'}}>
            Баланс: <span style={{fontWeight: 500, fontSize: '1.3rem'}}>{Store.balance}</span> р
        </span>
    );
});

export default Balance;