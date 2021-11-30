require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import {Control} from './Components/Control';
import { BrowserRouter } from 'react-router-dom';
import '../css/app.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Control />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
    
  );