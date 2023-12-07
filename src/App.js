import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function App() {

  const [option, setOption] = useState([]);
  const [to, setTo] = useState('en');
  const [from, setFrom] = useState('en');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const Translate = () => {
    // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    axios.post('https://libretranslate.de/translate', params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => {
      console.log(res.data)
      setOutput(res.data.translatedText)
    })
  };

  useEffect(() => {
    axios
      .get('https://libretranslate.de/languages', {
        headers: { accept: 'application/json' },
      })
      .then((res) => {
        console.log(res.data);
        setOption(res.data);
      });
  }, []);

 
  return (
    <div className="App">
      <div className='bg-warning text-center p-1'>
        <h1>Google Translate</h1>
      </div>
      <div className='container-fluid'>
        <div className='container mt-5'>
          <div className='w-auto mx-auto d-flex justify-content-between'>
            <div>


            </div>
            <div>

            </div>
          </div>
          <div className='row mt-5'>
            <div className='col-10 mx-auto'>
              <label>From</label>&nbsp;
              <select value={from} onChange={(e) => setFrom(e.target.value)}>
                {
                  option.map((opt) => {
                    return (
                      <option key={opt.code} value={opt.code} >{opt.name}</option>
                    )
                  })
                }
              </select>
              <div className="form-floating">

                <textarea placeholder='Enter message ' className='textarea' style={{ height: "100px", width: "100%", paddingLeft: "10px" }} onInput={(e) => setInput(e.target.value)}></textarea>

              </div>
            </div>
          </div>
          <div className='row mt-5'>
            <div className='col-10 mx-auto'>
              <label>To</label>&nbsp;
              <select onChange={(e) => setTo(e.target.value)}>
                {
                  option.map((opt) => {
                    return (
                      <option key={opt.code} value={opt.code} >{opt.name}</option>
                    )
                  })
                }
              </select>
              <div className="form-floating">
                <textarea className="textarea" placeholder="I'm waiting your question!" value={output} style={{ height: "100px", width: "100%", paddingLeft: "10px" }}></textarea>

              </div>
            </div>
          </div>
          <div className='text-center mt-4'>
            <button className='btn btn-warning' onClick={e => Translate()}>Trasnlate</button>
           
          </div>
        </div>

      </div>
        <div className='row'>
                <div className='text-center text-white mt-5'>
                      <p >created by mcawale copyright 2022</p>
                </div>
        </div>
    </div>
  );
}

export default App;
