import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, useFormState } from 'react-hook-form';

interface IProps {
    errMsg?: string| undefined,
    setUserData: Function
};

interface IFields {
    name: string,
    email: string,
    password: string | number,
    password2: string | number,
    phone: string | number,
    role: number,
};

type Inputs = {
    name: string,
    email: string,
    password: string | number,
    password2: string | number,
    phone: string | number,
    role: number
  };

enum SuccessName {
    Success = 'success-border',
    Error = 'error-border',
}

export const ContentAddUser = (props:IProps) => {
    const { register, handleSubmit, formState:{errors}} = useForm<Inputs>();
    const [isValid,setValid] = useState<boolean>(false);
    const onSubmit: SubmitHandler<Inputs> = data => {
        props.setUserData(data);
        setNewUserData({
            name: '',
            email: '',
            password: '',
            password2: '',
            phone: '',
            role: 0,
        })
    }
    let [newUserData, setNewUserData] = useState<IFields>({
        name: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
        role: 0,
    });

    const onChangeHandaller = (e:React.FormEvent<HTMLInputElement>) => {
        setNewUserData({ ...newUserData, [e.currentTarget.id]: e.currentTarget.value });
    };
    const onChangeSelectFormHandaller = (e:React.FormEvent<HTMLSelectElement>) => {
        setNewUserData({ ...newUserData, [e.currentTarget.id]: e.currentTarget.value });
    };

    useEffect(() => {
        if (typeof props.errMsg !== 'undefined' && props.errMsg.length > 0) {
            setValid(true)
            setTimeout(() => {setValid(false), props.errMsg = ''}, 4000);
        }
    },[props.errMsg])

    return (
        <>
        <div className="add-user-form content">
        <form className="add-user-form__form content-forms" id="add-user-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="add-user-form__inputs register-content">
            <div className="register-form__login-content register-content">
                <label className=" register-form__login-label label" htmlFor="name">??????</label>
                <input id="name" type="text" 
                    className={!errors.name && newUserData.name.length >= 5 ? SuccessName.Success : ''}
                    {...register("name", { required: true, minLength: 5, maxLength: 50 })} 
                    value={newUserData.name} 
                    onChange={(e) => onChangeHandaller(e)}
                />
                    {errors.name  && errors.name.type === "required" && (
                        <div className="error-result">?????????????? ??????.</div>
                    )}
                    {errors.name  && errors.name.type === "minLength" && (
                        <div className="error-result">?????????????? 5 ????????????????.</div>
                    )}
                    {errors.name  && errors.name.type === "maxLength" && (
                        <div className="error-result">???????????????? 50 ????????????????.</div>
                    )}
            </div>
            <div className="register-form__login-content register-content">
                <label className=" register-form__login-label label" htmlFor="email">??????????\??????????</label>
                <input id="email" type="email" 
                    className={!errors.email  && newUserData.email.search(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/) === 0 ? SuccessName.Success : ''} 
                    {...register("email" , { required: true, maxLength: 100, pattern:/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ })} value={newUserData.email} onChange={(e) => onChangeHandaller(e)}
                />
                {errors.email  && errors.email.type === "pattern" && (
                    <div className="error-result">???????????????? ?????????? ??????????.</div>
                )}
                {errors.email  && errors.email.type === "required" && (
                    <div className="error-result">???????????????????????? ????????.</div>
                )}
            </div>
                <div className="register-form__password-content register-content">
                    <label className=" register-form__password-label label" htmlFor="password"> ????????????</label>
                    <input id="password" type="password"
                        className={!errors.password  && newUserData.password.toString().length > 8 ? SuccessName.Success : ''} 
                        {...register("password", { required: true, minLength:8, maxLength: 30 })} 
                        value={newUserData.password} 
                        onChange={(e) => onChangeHandaller(e)}
                    />
                    {errors.password  && errors.password.type === "required" && (
                        <div className="error-result">???????????????????????? ????????.</div>
                    )}
                    {errors.password  && errors.password.type === "minLength" && (
                        <div className="error-result">?????????????? 8 ????????????????.</div>
                    )}
                    {errors.password  && errors.password.type === "maxLength" && (
                        <div className="error-result">???????????????? 30 ????????????????.</div>
                    )} 
                </div>
                <div className="register-form__password-content register-content">
                    <label className=" register-form__password-label label" htmlFor="password2">?????????????????????? ????????????</label>
                    <input id="password2" type="password"
                        className={!errors.password  && newUserData.password.toString().length >= 8 &&newUserData.password2.toString().length >= 8 && newUserData.password === newUserData.password2 ? SuccessName.Success : ''}  
                        {...register("password2", { required: true, validate: value => newUserData.password === value , minLength:8, maxLength: 30 })} 
                        value={newUserData.password2} 
                        onChange={(e) => onChangeHandaller(e)}
                    />
                    {errors.password2  && errors.password2.type === "required" && (
                        <div className="error-result">???????????????????????? ????????.</div>
                    )}
                    {errors.password2  && errors.password2.type === "minLength" && (
                        <div className="error-result">?????????????? 8 ????????????????.</div>
                    )}
                    {errors.password2  && errors.password2.type === "maxLength" && (
                        <div className="error-result">???????????????? 30 ????????????????.</div>
                    )}
                    {errors.password2  && errors.password2.type === "validate" && (
                        <div className="error-result">???????????? ???? ??????????????????.</div>
                    )}
                </div>
                <div className="register-form__password-content register-content">
                    <label className=" register-form__password-label label" htmlFor="role" >????????</label>
                    <select id="role"
                        className={!errors.role  && newUserData.role > 0 ? SuccessName.Success : ''}  
                        {...register("role" , { required: true, pattern: /^[1-2]{1}$/})} 
                        value={newUserData.role} 
                        onChange={(e) => onChangeSelectFormHandaller(e)}
                    >
                        <option defaultValue='0' aria-readonly>???????????????? ????????</option>
                        <option value="1">admin</option>
                        <option value="2">user</option>
                    </select>
                    {errors.role  && errors.role.type === "required" && (
                        <div className="error-result">???????????????????????? ????????.</div>
                    )}
                    {errors.role  && errors.role.type === "pattern" && (
                        <div className="error-result">???????????????? ????????.</div>
                    )}
                </div>
                <div className="register-form__password-content register-content">
                    <label className=" register-form__password-label label" htmlFor="phone">??????????????</label>
                    <input id="phone" type="text"  
                        placeholder="+7-___-___-__-__"
                        className={!errors.phone  && newUserData.phone.toString().search(/[+7]{1}-[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/) === 1 ? SuccessName.Success : ''} 
                        {...register("phone", { pattern: /[+7]{1}-[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/})} 
                        value={newUserData.phone}  
                        onChange={(e) => onChangeHandaller(e)}
                    />
                    {errors.phone  && errors.phone.type === "required" && (
                        <div className="error-result">???????????????????????? ????????.</div>
                    )}
                    {errors.phone  && errors.phone.type === "pattern" && (
                        <div className="error-result">???????????????? ???????????? ????????????????. ????????????: +7-___-___-__-__ </div>
                    )}
                </div>
            </div>
            <div className="add-user-form__submit send-content">
                <button className="add-user-form__btn content-btns" disabled={isValid ? true : false}>??????????????</button>
                <span className="add-user-form__error-msg">{props.errMsg}</span>
                <span className="add-user-form__wait" hidden>/</span>
            </div>
        </form>
    </div>
    </>
    )
}