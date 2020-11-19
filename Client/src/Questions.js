import React, { useState } from 'react';
import {Button} from '@material-ui/core';
import "./App.css";

function Questions(props) {
  const [ans, setAns] = useState([]);
  var f = 0;
  const onChangeValue = (event) => {
    ans.map((answer) => {
      if (answer.name === event.target.name) {
        answer.answer = event.target.value;
        f = 1;
        console.log(ans);
      }
      return "";
    });
    if (f === 0) {
      console.log("event fired");
      setAns([
        {
          name: event.target.name,
          answer: event.target.value
        },
        ...ans
      ]);
    }
    f = 0;
  };


  const sendData=()=>{
     props.sendData(ans);
  }
  return (
    <div> 
            {/* Questions and Options */}
          
         {props.question.map((q) => (
           <div key={q.id}>
            <h1>{q.question}</h1>
            <div onChange={onChangeValue} >
            <input type="radio" name={q.id} value={q.option1}  />{q.option1}
            <input type="radio" name={q.id} value={q.option2}   /> {q.option2}
            <input type="radio" name={q.id} value={q.option3}   /> {q.option3}
            <input type="radio" name={q.id} value={q.option4}   />{q.option4}
            </div>
          </div>

        ))} 

        <div className="submitButton">
        <Button type="submit" variant="contained" color="primary" onClick={sendData}>
         FINISH
        </Button>
        </div>
    </div>
  );
 }

export default Questions;

