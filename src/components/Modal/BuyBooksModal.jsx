import React from 'react';
import {observer} from "mobx-react";
import './style.css';
import Store from "../../store/Store";
import Modal from "./Modal";


const BuyBooksModal = observer(() => {
    return (
        <Modal>
            <div className="modal-header">
                <h5 className="modal-title">Подтверждение покупки</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        onClick={Store.closeModal}>
                    <span aria-hidden="true"/>
                </button>
            </div>
            <div className="modal-body modal__body">
                <ul className="list-group">
                    {Store.cart.map(item => (
                        <li key={item.name}
                            className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <span>{item.name}</span><br/>
                                <span className='bold'>{item.price} р</span>
                            </div>
                            <span className="badge bg-primary rounded-pill modal__count">{item.count} шт</span>
                        </li>
                    ))}
                </ul>

            </div>
            <div className="modal-footer modal__footer">
                <span className='modal__total'>Итого: <span className='bold'>{Store.totalPriceCart}</span> р</span>
                <button type="button" className="btn btn-primary" onClick={Store.buyBooks}>Купить</button>
            </div>
        </Modal>
    );
});

export default BuyBooksModal;