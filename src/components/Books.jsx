import React, {useEffect} from 'react';
import { observer } from "mobx-react";
import Store from "../store/Store";

const Books = observer(() => {
    useEffect(() =>{
        Store.fetchBooksInfo({})
    },[])
    return (
        <>
            {Store.booksInfo !== null ? Store.booksInfo.map((item) => {
                return <p>{item.name}</p>
            }) : <p>книг нет</p>}
        </>
    );
});

export default Books;