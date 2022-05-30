import React, {useEffect} from 'react';
import Store from "../store/Store";
import {observer} from "mobx-react";

const Filter = observer(() => {
    useEffect(() => {
        Store.fetchCategories()
    }, [])

    return (
        <>
            Фильтры
        </>
    );
});

export default Filter;