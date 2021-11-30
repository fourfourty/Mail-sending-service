import React from 'react';
import { EditTextItem } from './EditTextItem/EditTextItem';

interface IProps {
    text?:any
}

interface Iel {
    id:number,
    text:string
}

export const ContentEditText = (props:IProps) => {

    return (
        <>
        <div className="edit-text content">
        <form className="edit-text__form content-forms" id="edit-text-form" onSubmit={(ev) => {
            ev.preventDefault();
        }}>
            <div className="edit-text__to">
                <EditTextItem textList={props.text}/>
            </div>
        </form>
    </div>
    </>
    )
}