import React from 'react';
import {observer} from "mobx-react";
import './style.css';
import Store from "../../store/Store";


const ToastCookie = observer(() => {
    return (
        <div className={Store.ToastCookieVisible ? "toast toast__block show" : "toast hidden toast__block show"} role="alert">
            <div className="toast-header">
                <strong className="me-auto">Предупреждение о Cookie</strong>
                <button onClick={() => {
                    Store.setToastCookieVisible(false)
                }} type="button" className="btn-close ms-2 mb-1" aria-label="Close">
                    <span aria-hidden="true"/>
                </button>
            </div>
            <div className="toast-body">
                Данный сайт использует файлы куки. Продолжая пользоваться сайтом, вы соглашаетесь на их использование.
            </div>
        </div>
    );
});

export default ToastCookie;