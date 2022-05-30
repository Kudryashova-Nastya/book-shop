import React from 'react';
import {observer} from "mobx-react";
import './style.css';
import Store from "../../store/Store";


const Modal = observer(({children}) => {
    return (
        <div className="modal__background" onClick={Store.closeModal}>
            <div className="modal__window" role="document">
                    <div className="modal-content modal__content" onClick={e => e.stopPropagation()}>
                        {children}
                    </div>
            </div>
        </div>
    );
});

export default Modal;