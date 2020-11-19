import React from 'react'
import App from "./App";
import { Route, Link } from "react-router-dom";
import Success from './Success';
import './App.css';

const Quiz = () => {
    return (
        <div >
            <div className="Sidebar">
            <h1 className="link"><Link to="/quiz" style={{ textDecoration: 'none' }} >Click Me To Take Quiz</Link></h1>
            </div>
            <Route path="/quiz" component={App} />
            <Route path="/sucess" component={Success} />
        </div>
    )
}

export default Quiz;
