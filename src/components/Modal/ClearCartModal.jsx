import React from 'react';
import {observer} from "mobx-react";
import './style.css';
import Store from "../../store/Store";
import Modal from "./Modal";


const ClearCartModal = observer(() => {
    return (
        <Modal>
            <div className="modal-header">
                <h5 className="modal-title">Подтверждение очистки</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        onClick={Store.closeModal}>
                    <span aria-hidden="true"/>
                </button>
            </div>
            <div className="modal-body">
                Удалить все книги из корзины?
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={Store.clearCart}>Удалить</button>
            </div>
        </Modal>
    );
});

export default ClearCartModal;