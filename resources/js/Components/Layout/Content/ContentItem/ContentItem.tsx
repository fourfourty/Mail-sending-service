import React, { useState }  from 'react';
import { ContentTabs } from '../ContentTabs/ContentTabs';
import { ContentMailForm } from '../ContentFormsItem/ContentMailForm';
import { ContentMailingCopyForm } from '../ContentFormsItem/ContentMailingCopyForm';
import { BrowserRouter as Router, Route} from 'react-router-dom';


interface IProps {
    setList: Function,
    status?: string[] | null,
}

export const ContentItem = ({setList,status}:IProps) => {
    let [isUser, setRole] = useState('user');

    return (
        <>
        <Router>
            <ContentTabs role={isUser}/>
            <Route exact path="/send" render={props => <ContentMailForm setList={setList} status={status} {...props}/>}></Route>
            <Route exact path="/send-copy" render={props => <ContentMailingCopyForm setList={setList} status={status} {...props}/>}></Route>
        </Router>
    </>
    )
}