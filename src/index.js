import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ThreedBackground from './ThreedBackground';
import reportWebVitals from './reportWebVitals';
import ClickableCube from './ClickableCube';


ReactDOM.render(
  <React.StrictMode>
    <ClickableCube />
  </React.StrictMode>,
  document.getElementById('root')
);
//Other components     <ThreedBackground />
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
