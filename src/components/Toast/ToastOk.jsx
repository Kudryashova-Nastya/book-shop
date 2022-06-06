import React from 'react';
import {observer} from "mobx-react";
import './style.css';
import Store from "../../store/Store";


const ToastOk = observer(() => {
    return (
        <div
            className={Store.ToastOkVisible ? "toast toast__block show toast__block--primary" :
                "toast hidden toast__block show toast__block--primary"}
            role="alert">
            <div className="toast-header">
                <strong className="me-auto">Спасибо за покупку</strong>
                <button onClick={() => {
                    Store.setToastOkVisible(false)
                }} type="button" className="btn-close ms-2 mb-1" aria-label="Close">
                    <span aria-hidden="true"/>
                </button>
            </div>
            <div className="toast-body">
                Покупка прошла успешно
            </div>
        </div>
    );
});

export default ToastOk;