import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { ContentTabs } from '../ContentTabs/ContentTabs';
import { ContentEditText } from './ContentEditText/ContentEditText';
import { ContentAddUser } from './ContentAddUser/ContentAddUser';
import { BrowserRouter as Router, Route} from 'react-router-dom';


interface ISendText {
    id: number,
    htmlText: string
}

interface InewUserData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    phone: string | number,
    role: string
}

export const ContentItemAdmin = () => {
    let [isAdmin, setAdmin] = useState<string>('admin');
    let [sendText, setSendText] = useState<ISendText>({
        id: 0,
        htmlText: ''
    });
    let [userData,setUserData] = useState<InewUserData>();
    let [errorMsg, setErrorMsg] = useState('');
    let [checked, setChecked] = useState(false);
    let [clickLink,setClickLink] = useState(false);

    useEffect(() => {
        const request = async () => {
            const result = await axios.post('/api/putUser', {
                data: userData
            });
            if (result.status === 200) {
                if(result.data.success) {
                    console.log(result.data);
                    setErrorMsg(errorMsg = result.data.message);
                }
                else {
                    setErrorMsg(errorMsg = result.data.message);
                }
            }
        }
        if (typeof userData !== 'undefined') {
            request();
        }
    },[userData])

    useEffect(() => {
        const request = async () => {
            const result = await axios.get('/api/getText');
            console.log(result.data)
            if (result.status === 200) {
                const response = result.data[0];
                setSendText({id:response.id, htmlText:response.text})
                setClickLink(clickLink = true)
            }
        }
           request();
    },[])

    console.log(userData)
    return (
            <>
            <Router>
                <ContentTabs role={isAdmin}/>
            {clickLink ? (
                <>
                    <Route exact path="/edit-text" render={props => <ContentEditText text={sendText} {...props}/>}></Route>
                    <Route exact path="/add-user" render={props => <ContentAddUser setUserData={setUserData}  errMsg={errorMsg}  {...props}/>}></Route>
                </>
            ): ''  
            }
            </Router> 
        </>
    )
}