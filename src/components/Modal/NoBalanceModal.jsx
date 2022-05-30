import React from 'react';
import {observer} from "mobx-react";
import './style.css';
import Store from "../../store/Store";
import Modal from "./Modal";


const NoBalanceModal = observer(() => {
    return (
        <Modal>
            <div className="modal-header">
                <h5 className="modal-title">Покупка невозможна</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        onClick={Store.closeModal}>
                    <span aria-hidden="true"/>
                </button>
            </div>
            <div className="modal-body">
                <h6>На вашем балансе недостаточно средств для покупки</h6>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={Store.closeModal}>Закрыть</button>
            </div>
        </Modal>
    );
});

export default NoBalanceModal;