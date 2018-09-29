import React, { Component } from 'react';
import { ToastContainer, cssTransition  } from 'react-toastify';

const Zoom = cssTransition({
  enter: 'fadeIn',
  exit: 'fadeOut'
});

class Toast extends Component {
  render() {
    return (
      <ToastContainer hideProgressBar={true} autoClose={2500} transition={Zoom} />
    )
  }
};

export default Toast;

