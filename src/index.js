import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import { AuthContextProvider } from './Places/shared/context/auth-context';

//import {AuthContextProvider} from "./Store/auth-context";
//Line no. 11 and 13 AuthContextProvider must always be imported in index.js file and not in app.js file

/*ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);*/

ReactDOM.render(<React.StrictMode>
  <AuthContextProvider>
    <App/>
  </AuthContextProvider>
</React.StrictMode>, document.getElementById('root'))
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// ReactDOM.render(<App />, document.getElementById('root'));

