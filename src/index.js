
//      ------------------------ Important ----------------------
// --------- default api is limited to only 50 requests per day ---------
// ---- In order to really enjoy this application please use your own Api  ----
// ---- register yourself at https://newsapi.org/ and create your own ----
// ---- if you use the my(developer's) api that is limited for only around 50 api ----
// ---- requests per day. after that this website give the default news will not ----
// ---- work according to the user. only limited features will work ----
// ---- in order to enjoy its feature like search (custom news), changing country, ----
// ---- i highly recommend you to try these but with your own api if my api-key get exhausted ----
// ---- Thanks, Subhpreet Singh

//      ------------------------ Important ----------------------



import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <App />
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
