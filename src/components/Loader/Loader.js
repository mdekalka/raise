import React, { PureComponent } from 'react';

import './Loader.scss';


class Loader extends PureComponent {
  render() {
    return (
      <div className={`loader-wrapper ${this.props.inline ? 'inline': ''} ${this.props.size || ''}`}>
        <div className="loader"></div>
        {this.props.message && <div className="loader-message">{this.props.message}</div>}
      </div>
    )
  }
}

export default Loader;
