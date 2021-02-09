import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App'
import { ActionCreators } from 'redux-devtools';


//STORE : Globalized state
/*
//ACTION INCREMENT
const increment = () => {
  return {
    type: 'INCREMENT'
  }
}
//DECREMENT
const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}
//REDUCER
const counter = ( state = 0, action ) =>{
  switch(action.type){
    case "INCREMENT":
      return state+10
    case "DECREMENT":
      return state-10
  }
} 

let store = createStore(counter)

//display in console
store.subscribe(() => console.log(store.getState()))

store.dispatch(increment())
store.dispatch(decrement())
*/
ReactDOM.render(
    <App />,
  document.getElementById('root')
);
//Other components     <ThreedBackground />
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
