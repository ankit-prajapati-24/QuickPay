import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@material-tailwind/react"; // Import ThemeProvider
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
const store = configureStore({
  reducer: rootReducer
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
  <BrowserRouter>
  <GoogleOAuthProvider clientId="713807936587-it0lid8phbrjatf8c8kd1hueh1l3l8dv.apps.googleusercontent.com">
      <App />
</GoogleOAuthProvider>;
 <Toaster/>
  </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
