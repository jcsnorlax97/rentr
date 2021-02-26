import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "./reducers"; // this automatically 
                                      //points to index.js within that reducers' folder

import './index.css';


function saveToLocalStorage (state){ 
  try{
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  }
  catch(e){
    console.log(e)
  }
}

function loadFromLocalStorage (){
  try{
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) 
      return undefined
    return JSON.parse(serializedState)
  }
  catch(e){
    console.log(e)
    return undefined
  }
}

const persistedState = loadFromLocalStorage()

const store = createStore(
  allReducers,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveToLocalStorage(store.getState()))


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
