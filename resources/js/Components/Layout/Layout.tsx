 import React from 'react';
import {Header} from './Header/Header';
import {Content} from './Content/Content';
import {Table} from './Table/Table';
import {Footer} from './Footer/Footer';

export const Layout = () => {

    return (
        <>
        <Header />
        <Content/>
        <Table />
        <Footer />
        </>
    );
}
