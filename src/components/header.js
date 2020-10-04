import React from 'react';
import logo from '../images/logo.svg';

function Header() {
    return(
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Cat Browser</h1>
        </header>
    )
}

export default Header;