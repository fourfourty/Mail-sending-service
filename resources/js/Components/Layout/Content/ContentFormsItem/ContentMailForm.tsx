import React,{useEffect, useState} from 'react';
import {validateEmail, validateName, checkSendResult, replacedForms} from '../../../Utils/Utils';

interface IProps {
    status?: string[] | null,
    setList: Function
}

export const ContentMailForm = (props:IProps) => {
    let [teachers, setTeachers] = useState<string[]>([]);
    let [teachersMails, setTeacherMails] = useState<string[]>([]);
    let [errorMsg, setErrorMsg] = useState('');
    let [checked, setChecked] = useState(false);
    
    useEffect(() => {
        const errorEl = Array.from(document.querySelectorAll('.error-send-list'));
        setChecked(checked = false);

        if (errorEl.length === 0 && teachers.length === teachersMails.length && teachers.length > 0 && teachersMails.length > 0) {
            setChecked(checked = true);
        }
        if (teachers.length !== teachersMails.length) {
            setErrorMsg(errorMsg = 'Значения полей должны быть равны');
        } 
        if (errorEl.length > 0) {
            setErrorMsg(errorMsg = 'Проверьте список отправки');
        }

    },[teachers,teachersMails]);

    useEffect(() => {checked ? setErrorMsg(errorMsg = 'Успешно') : ''},[checked])

    return (
        <>
        <div className="main__form content">
            <form className="send-form__form content-forms" id="main-form" onSubmit={(ev) => {
                ev.preventDefault();
                if (checked) {
                    props.setList([{'name': teachers, 'email' :teachersMails}]);
                    setTeachers(teachers = []);
                    setTeacherMails(teachersMails = []);
                    setChecked(checked = false);
                    setErrorMsg(errorMsg = '');
                } 
                }}>
                    
                <div className="send-form__to">
                    <div className="send-form__teachers send-content">
                        <label className="send-form__label label" htmlFor="#teachers-list">Список учителей</label>
                        <textarea id="teachers-list" name="teacher" minLength={3}
                        
                        onChange={(ev) => setTeachers(teachers = replacedForms(ev.currentTarget.value))} 
                        
                        className="send-form__textarea" required></textarea>
                    </div>
                <div className="send-form__mails send-content">
                    <label className="send-form__label label" htmlFor="#mail-list">Список адресов</label>
                    <textarea id="mail-list" name="mail" minLength={3} 

                    onChange={(ev) => setTeacherMails(teachersMails = replacedForms(ev.currentTarget.value))} 

                    className="send-form__textarea js-main-send-email" required></textarea>
                </div>
            </div>
            <div className="send-form__submit send-content">
                <button className="send-form__submit__btn content-btns" disabled={checked ? false : true}>Отправить</button>
                <span className={
                    checked 
                    ? "send-form__error-msg js-error-msg success-result" 
                    : "send-form__error-msg js-error-msg error-result"
                }
                hidden={errorMsg.length === 0 ? true : false}>{errorMsg}</span>

                <span className="send-form__wait js-wait" hidden>/</span>
                <span className="send-form__count js-count-send"hidden >/</span>
            </div>
            <div className="send-form__result js-temporary-result">
                
                <h3 className="send-form__result-head">Список отправки</h3>

                <div className="send-form__result-list result-list js-result-list">

                    <ul className="result-list__list-name js-temporary-result-name">
                        {
                            (teachers.length > 0) ? teachers.map((el:string,i:number)=> (<li key={i} className={!validateName(el) ? 'error-send-list' : 'success-result '}>{el}</li>)) : ''
                        }
                    </ul>

                    <ul className="result-list__list-email js-temporary-result-email">
                        {
                            (teachersMails.length > 0) ? teachersMails.map((el:string,i:number) => (<li key={i} className={!validateEmail(el) ? 'error-send-list' : 'success-result '}>{el}</li>)) : ''
                        }
                    </ul>
                    <ul className="result-list__list-status js-temporary-result-status">
                        {
                             ( props.status !== undefined && props.status !== null) ? props.status.map((el:string,i:number) => (<li key={i} className={!checkSendResult(el) ? 'error-send-list' : 'success-result '}>{el}</li>)) : ''
                        }
                    </ul>
                </div>
            </div>
        </form>
    </div>
    </>
    )
}