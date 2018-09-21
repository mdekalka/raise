import React, { PureComponent } from 'react';

import './Loader.scss';


class Loader extends PureComponent {
  render() {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
        <div className="loader-message">{this.props.message}</div>
      </div>
    )
  }
}

export default Loader
