import React from 'react';
import {Router,NavLink} from 'react-router-dom'
interface IProps {
    role: {} | string
}
export const ContentTabs = ({role}:IProps) => {

    return (
        <>
        {
            role === 'admin' ? (
                <div className="main__taps-wrapper">
                    <ul className="main__taps-list js-tab-list">
                        <NavLink exact to="/edit-text" activeClassName="active-tab--bck-clr" className="main__taps-item">Редактировать текст</NavLink>
                        <NavLink to="/add-user" activeClassName="active-tab--bck-clr" className="main__taps-item">Новый пользователь</NavLink>
                    </ul>
                </div>
            ): (
                <div className="main__taps-wrapper">
                    <ul className="main__taps-list js-tab-list">
                        <NavLink exact to="/send" activeClassName="active-tab--bck-clr" className="main__taps-item">Рассылка индивидуальная</NavLink>
                        <NavLink to="/send-copy" activeClassName="active-tab--bck-clr" className="main__taps-item">Рассылка скрытая копия</NavLink>
                        {/* <li className="main__taps-item js-toggle-headers active-tab--bck-clr" data-type="individual">Рассылка индивидуальная</li>
                        <li className="main__taps-item js-toggle-headers" data-type="all">Рассылка скрытая копия</li> */}
                    </ul>
                </div> 
            )

        }
        </>
    )
}