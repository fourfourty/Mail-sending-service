import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory } from "react-router-dom";

interface AuthStatus {
    validateEmail: Function,
    validatePassword: Function,
}
 
export const AuthFormItem = (props:AuthStatus) => {
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [checked,setChecked] = useState(false);
    let [checkedResult,setCheckedResult] = useState('');
    let [redirect,setRedirect] = useState(false);
    let history = useHistory();

    const validateData = () => {
            if (props.validateEmail(email) && props.validatePassword(password)) {
                setChecked(checked = true);
            }
    }
    useEffect(() => {
        if (checked) {
            try {
                const request = async () => {
                    const result = await axios.post('/api/auth', {
                        'email': email,
                        'password': password
                    });
                    // window.location.reload();
                    if (result.data.success) {
                        setCheckedResult(checkedResult = result.data.message);
                        setTimeout(() => {
                            setRedirect(redirect = result.data.success);
                            localStorage.setItem('isAuth', result.data.success);
                            localStorage.setItem('userData', JSON.stringify(result.data.data));  
                        })
                    }
                    // else {

                    // }
                    console.log(result)
                    
                    setEmail(email = '');
                    setPassword(password = '');
                    setCheckedResult(checkedResult = result.data.message);
                    setChecked(checked = false);
                    setTimeout(() => {setCheckedResult(checkedResult = '');},3000)
                };
                request();
            } catch(err) {
                console.log(err);
            }
        }
    }, [checked])

    useEffect(() => {
        if (redirect) {
            history.push('/home');
            // <Redirect to="/home" />;
        }
        const login = localStorage.getItem('isAuth');
        if (login) {
            history.push('/home');
            // <Redirect to="/home" />;
        }
        return () => {};
    }, [redirect])

    return (
        <>
        <section className="auth">
            <div className="auth__wrapper wrapper">
                <div className="auth__container">
                    <div className="auth__logo">
                        <img className="auth__img" src="assets/img/logo.png" alt="logo" />
                    </div>
                    <div className="auth__content">
                        <div className="auth__register-head">
                            <h3 className="auth__register-h3">Авторизация</h3>
                        </div>
                        <form id="auth-form" className="auth__register-form register-form" onSubmit={(ev) => {
                                    ev.preventDefault();
                                    validateData();
                                }}>
                            <div className="register-form__login-content register-content">
                                <label className=" register-form__login-label label" >Логин</label>
                                <input id="auth-login" type="email" value={email} required onChange={(ev) => setEmail(email = ev.target.value)}/>
                            </div>
                            <div className="register-form__password-content register-content">
                                <label className=" register-form__password-label label" >Пароль</label>
                                <input id="auth-password" type="password" value={password} required autoComplete="" onChange={(ev) => setPassword(password = ev.target.value)}/>
                            </div>
                            <div className="register-form__send-content register-content">
                                <button className="register-form__btn content-btns" >Войти</button>
                                <span className="register-form__status">{checkedResult}</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
