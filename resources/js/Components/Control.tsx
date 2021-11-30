import React, { ReactNode, useState, useEffect } from "react";
import {Auth} from './Auth/Auth';
import {Layout} from './Layout/Layout';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../../css/app.css';

interface IControl {
  someProp?: ReactNode
}

interface IRole {
  role: string
}

export const Control = (props:IControl) => {
  let [isAuth, setAuth] = useState<boolean>(false);

    //let navLink = (
        // <div className="Tab">
        //   <NavLink to="/sign-in" activeClassName="activeLink" className="signIn">
        //     Sign In
        //   </NavLink>
        //   <NavLink exact to="/" activeClassName="activeLink" className="signUp">
        //     Sign Up
        //   </NavLink>
        // </div>
      //);
      useEffect(() => {
        const login = Boolean(localStorage.getItem('isAuth'));

        if (login) {
          setAuth(isAuth = login);
          }
      })

    return (
      <>
        {isAuth ? (
          <>
          <Router>
            <Route exact path="/" component={Auth}></Route>
            <Route path="/home" component={Layout}></Route>
          </Router>
          </>
        ) : (
          <>
          <Router>
            <Route exact path="/" component={Auth}></Route>
            <Route path="/home" component={Layout}></Route>
          </Router>
          </>
        )}
      </>
    );
  }