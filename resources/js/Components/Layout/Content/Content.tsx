
import React, { useState, useEffect }  from 'react';
import {ContentItem} from './ContentItem/ContentItem';
import {ContentItemAdmin} from './ContentItemAdmin/ContentItemAdmin';
import axios from 'axios';

interface IteacherList {
    name: string,
    email: string
}

interface IUserDataProps {
    currentRole: string
}

interface ISenderData {
    name: string,
    phone: number | String,
    email: string,
    password: string
}

export const Content = () => {
    let [teacherList, setTeacherList] = useState<IteacherList[]>([]);
    let [sendResult, setSendResult] = useState<string[] | null>([]);
    let [senderData,setSenderData] = useState<ISenderData>({
        name: '',
        phone: '',
        email: '',
        password: ''
    });
    let [userData, setUserData] = useState<IUserDataProps>({
        currentRole: ''
    });

    useEffect(()=> { 
        const currentUser = localStorage.getItem('userData');
        if (currentUser !== null) {
            setUserData({currentRole:JSON.parse(currentUser).role})
            setSenderData({
                name: JSON.parse(currentUser).name,
                phone: JSON.parse(currentUser).phone,
                email: JSON.parse(currentUser).email,
                password: 'uwmmteabhnmijtrb'
            })
        }
    },[]);

    useEffect(() => {
        const request = async () => {
            const result = await axios.post('/api/sendMail', {
                mail: teacherList,
                data: senderData
            })
            console.log(result.data)
            setSendResult(sendResult = result.data.map((el:string) => {return JSON.parse(el).result}));
        }

        if (teacherList.length > 0) {
            request();
        }

    },[teacherList])

    return (
        <main className="main">
            <div className="main__wrapper wrapper">

                { (userData.currentRole === 'admin' ) ?
                    <ContentItemAdmin />              :
                    <ContentItem  setList={setTeacherList.bind(this)} status={sendResult}/>
                }

            </div>
        </main>
    )
}