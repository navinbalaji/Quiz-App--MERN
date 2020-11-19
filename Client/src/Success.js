import React from 'react'
import './App.css';
const Success = (props) => {
    return (
        <div className="App">
            <h1>You have Scored : {props.location.id}</h1>
        </div>
    )
}

export default Success;