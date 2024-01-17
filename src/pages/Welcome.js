import React from 'react'
import { CookiesProvider, useCookies } from "react-cookie";
import logo from './../logo.svg';

const Welcome = () => {
    const [cookies] = useCookies(["token"]);
    return (
        <CookiesProvider>
            <div>
                {cookies.user ? (
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>
                            Cookie: {cookies.user}
                        </p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a>
                    </header>
                ) : (
                    <p>Please Login</p>
                )}
            </div>
        </CookiesProvider>
    )
}

export default Welcome