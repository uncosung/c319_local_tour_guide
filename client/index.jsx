import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { BrowserRouter as Router } from 'react-router-dom';
import AboutUs from './components/about-us';
ReactDOM.render(
  // <Router>
  //   <App />
  // </Router>,
  <AboutUs />,
  document.getElementById('root')
);
