import React from 'react';

interface IProps {
    textList?: object[]
}
export const EditTextItem = (props:IProps) => {
    console.log(props.textList)
    return (
        <>
            {/* <ul className="edit-text__list">
                {
                <li key={props.text.id}>{props.text.htmlText}
                    <div className="edit-text__submit send-content">
                        <button className="edit-text__btn content-btns">Редактировать</button>
                        <button className="edit-text__btn content-btns">Сохранить</button>
                        <button className="edit-text__btn content-btns">Удалить</button>
                        <span className="edit-text__error-msg" hidden></span>
                        <span className="edit-text__wait" hidden>/</span>
                    </div>
                </li>
                        // props.text.map((el:Iel) => {
                        //     return <li key={el.id}>{el.text}</li>
                        // })
                }
            </ul> */}
        </>
    )
}