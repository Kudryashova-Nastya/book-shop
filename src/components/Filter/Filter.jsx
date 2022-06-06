import React, {useEffect} from 'react';
import Store from "../../store/Store";
import {observer} from "mobx-react";
import './style.css';
import {DropdownButton, Dropdown} from "react-bootstrap";

const Filter = observer(() => {
    useEffect(() => {
        void Store.fetchCategories()
    }, [])

    return (
        <>
            <ul className="nav nav-pills">
                <li className="nav-item sort" onClick={Store.toggleSort}>
                    <span>По цене</span>
                    <div className='arrows'>
                        <button className='btn'>
                            <svg className={Store.filters.sortPrice === "DESC" ? 'down' : 'up'} width="19" height="11"
                                 viewBox="0 0 19 11" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.9081 0.259789L0.225798 9.59441C0.080856 9.75016 0 9.95709 0 10.1723C0 10.3875 0.080856 10.5944 0.225798 10.7501L0.235608 10.7602C0.305873 10.836 0.39045 10.8963 0.484194 10.9375C0.577939 10.9787 0.678891 11 0.780909 11C0.882927 11 0.983879 10.9787 1.07762 10.9375C1.17137 10.8963 1.25594 10.836 1.32621 10.7602L9.50163 1.96993L17.6738 10.7602C17.7441 10.836 17.8286 10.8963 17.9224 10.9375C18.0161 10.9787 18.1171 11 18.2191 11C18.3211 11 18.4221 10.9787 18.5158 10.9375C18.6095 10.8963 18.6941 10.836 18.7644 10.7602L18.7742 10.7501C18.9191 10.5944 19 10.3875 19 10.1723C19 9.95709 18.9191 9.75016 18.7742 9.59441L10.0919 0.259789C10.0155 0.177694 9.92371 0.112338 9.82197 0.0676825C9.72023 0.0230265 9.61069 0 9.5 0C9.38931 0 9.27977 0.0230265 9.17803 0.0676825C9.07628 0.112338 8.98445 0.177694 8.9081 0.259789Z"
                                />
                            </svg>
                        </button>
                    </div>
                </li>
                <li className="nav-item categories">
                    <DropdownButton
                        variant="link"
                        className="category"
                        title={Store.categoryName || "Категория"}
                    >
                        <Dropdown.Item onClick={() => {Store.setCategory(0)}}>Все</Dropdown.Item>
                        {Store.categories?.map(item => (
                            <Dropdown.Item onClick={() => {Store.setCategory(item.id)}} key={item.id}>{item.name}</Dropdown.Item>
                        ))}

                    </DropdownButton>
                </li>
                <li className="nav-item search">
                    <input className="form-control me-sm-2" onChange={(e) => {
                        Store.setSearchReq(e.target.value)
                    }} type="text" placeholder="Поиск" value={Store.searchValue}/>
                    <span className='clear-filter' onClick={Store.clearFilters} title="Сбросить фильтры">Сбросить</span>
                </li>
            </ul>

        </>
    );
});

export default Filter;