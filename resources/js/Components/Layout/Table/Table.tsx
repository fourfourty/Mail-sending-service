import React, { useState, useEffect }  from 'react';

export const Table = () => {

    return (
        <section className="table invisible">
        <h2 className="table__head">Список отправленных</h2>
        <div className="table__wrapper wrapper">
            <ol className="table__submit-list table__head-names js-send-name-list">
                <span className="table__list-item" />Учитель
            </ol>
            <ul className="table__submit-list table__head-mails js-send-mails-list">
                <span className="table__list-item">Почта</span>
            </ul>
            <ul className="table__submit-list table__head-result js-send-result-list">
                <span className="table__list-item">Результат</span>
            </ul>
            <ul className="table__submit-list table__head-sender js-send-sender-list">
                <span className="table__list-item">Отправитель</span>
            </ul>
            <ul className="table__submit-list table__head-title js-send-title-list">
                <span className="table__list-item">Текст</span>
            </ul>
            <ul className="table__submit-list table__head-date js-send-data-list">
                <span className="table__list-item">Дата</span>
            </ul>
        </div>
    </section>
    )
}