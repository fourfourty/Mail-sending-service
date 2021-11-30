import React, { useState, useEffect }  from 'react';
import { useHistory  } from "react-router-dom";

export const Header = () => {

    let [navigate, setNavigate] = useState(false);
    let history = useHistory();

    const onLogoutHandler = () => {
        localStorage.clear();
        setNavigate(navigate = true);
      };

      useEffect(() => {
          if(navigate) {
            history.push('/');
          }
      },[navigate]);
      
    return (
        <header className="header">
            <div className="header__wrapper wrapper">
                <div className="header__logo">
                    <img className="header__img" src="assets/img/letter-white-2.png" alt="logo" />
                    <h1 className="header__title">Сервис почтовой отправки</h1>
                </div>
                <div className="header__tools">
                    <svg className="icons js-view-table">
                        <use xlinkHref="assets/img/icons.svg#list"></use>
                        </svg>
                        <svg className="icons js-xls">
                            <use xlinkHref="assets/img/icons.svg#xls"></use>
                        </svg>
                        <a href="#" className="js-download-xls invisible" download="">
                            <svg className="icons" >
                                <use xlinkHref="assets/img/icons.svg#download"></use>
                            </svg>
                        </a>
                    <svg className="icons js-logout" onClick={onLogoutHandler}>
                    <use  xlinkHref="assets/img/icons.svg#logout"></use>
                    </svg>
                </div>
            </div>
        </header>
    )
}