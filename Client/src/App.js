import React, { useEffect, useState } from 'react';
import axios from './axios';
import Questions from './Questions';
import './App.css';
import { Redirect } from 'react-router-dom';

function App() {

  const [que, setque] = useState([]);
  const [len, setlen] = useState(0);
  const [finalanswer, setFinalanswer] = useState([]);
  const [resdata, setResdata] = useState('');
  // const [bool, setBool] = useState(false);
  const [data, setData] = useState(false);
  useEffect(() => {
    axios.get('/questions')
      .then(response => {
        setque(response.data)
        setlen(response.data.length)
      })

  }, []);

  const datafromchild = (datas) => {
    setFinalanswer(datas);
  }

  async function submit(e) {
    console.log(finalanswer);
    e.preventDefault();
    try {
      const datas = { finalanswer, len };

      const ans = await axios.post("/submitted", datas);
      console.log(ans)
      setResdata(ans.data.count);
      // setBool(true);
      setData(true);

    }
    catch (err) {
      console.log(err)
    }
  }

  if (data) {
    return <Redirect to={{
      pathname: '/sucess',
       id: resdata,
    }}/>
  }

  return (
    <div className="App" >
      {/* <h1 className="title">Sample Quiz</h1> */}
      <form onSubmit={submit} method="post">
        <Questions question={que} sendData={datafromchild} />
        <input type="hidden" value={len} name="quelength" />
        {/* <input type="submit" value="submit" /> */}
      </form>
      {/* {
        resdata && <h1>The Total Marks : {resdata}</h1>
      }
      {
        bool && <h1>name : answer</h1>
      }
      {
        bool && finalanswer.map((e) => (
          <div key={e.name}>
            <h1>{e.name}:{e.answer}</h1>
          </div>
        ))
      } */}
      
    </div>

  );
}

export default App;
