import React from 'react'
import { useCookies } from "react-cookie";
import logo from './../logo.svg';

const Welcome = () => {
    const [cookies] = useCookies(["token"]);
    return (
            <div>
                {cookies.token ? (
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>
                            Cookie: {cookies.token}
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
    )
}

export default Welcome