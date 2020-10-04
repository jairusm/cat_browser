import React from 'react';
import Wrapper from '../hoc/wrapper';
import Header from '../header';

const Layout = (props) => (
    <Wrapper>
        <Header/>
        <main>
            {props.children}
        </main>
    </Wrapper>
)

export default Layout;