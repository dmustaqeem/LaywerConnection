import logo from './logo.svg';
import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { fetchRecords, createRecord } from './Airtable/Actions';
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const notify = () => toast("Data is Stored Successfully!");
  const notify2 = () => toast("Failed To Save Data Please Try Again!");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const fetchedRecords = await fetchRecords('Table 1');
      setRecords(fetchedRecords);
    }
    getRecords();
  }, []);

  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRecord = await createRecord('Table 1', {
        Name: name,
        Notes: notes,
        Status: status
      });
      console.log(newRecord);
      notify();
    } catch (error) {
      console.log(error);
      notify2();
    }
  };


  return (
    <Wrapper>
      <ToastContainer />
      <div className="App">

        <div className='formHolder'>
          <div class="form">
            <div class="input-container ic1">
              <input id="firstname" class="input" type="text" placeholder=" " onChange={(e) => setName(e.target.value)} />
              <div class="cut"></div>
              <label for="firstname" class="placeholder">Title</label>
            </div>
            <div class="input-container ic2">
              <input id="lastname" class="input" type="text" placeholder=" " onChange={(e) => setStatus(parseFloat(e.target.value))} />
              <div class="cut"></div>
              <label for="lastname" class="placeholder">Number Value</label>
            </div>

            <div className="input-container ic2">
              <textarea
                className="input2"
                placeholder="Enter your notes here..."
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
              />
            </div>
          </div>


          <button type="text" class="submit" onClick={handleSubmit}>submit</button>
        </div>


        <div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Number Value</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item) => (
                <tr key={item.id}>
                  <td>{item.fields.Name}</td>
                  <td>{item.fields.Status}</td>
                  <td>{item.fields.Notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.section`
height: 100%;
width: 100%;
overflow: auto;

.formHolder{
  width: 100%;
  height: auto;
  place-content: center;
  justify-content: center;
  align-items: center;
  display: grid;
  margin-top: 5%;
}

.form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 500px;
  padding: 20px;
  width: 320px;
}

.title {
  color: #eee;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
}

.subtitle {
  color: #eee;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 40px;
}

.ic2 {
  margin-top: 30px;
}

.input {
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
}


.input2 {
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 250px;
  outline: 0;
  padding: 20px;
  width: 100%;
  resize: none;
  text-align: left;
}

.cut {
  background-color: #15172b;
  border-radius: 10px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;
}

.cut-short {
  width: 50px;
}

.input:focus ~ .cut,
.input:not(:placeholder-shown) ~ .cut {
  transform: translateY(8px);
}

.placeholder {
  color: #65657b;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #808097;
}

.input:focus ~ .placeholder {
  color: #dc2f55;
}

.submit {
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
  text-align: center;
  width: 100%;
}

.submit:active {
  background-color: #06b;
}

`;
