import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

var app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);