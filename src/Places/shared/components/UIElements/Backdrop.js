<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-root')
  );
};

export default Backdrop;
=======
import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-root')
  );
};

export default Backdrop;
>>>>>>> b2d305ed7b17da04bc48e631d42f0e92ca8594f6
