import React, { PureComponent } from 'react';

import './Badge.scss';


class Badge extends PureComponent {
  componentDidMount() {

  }
  
  render() {
    return (
      <div className="badge-wrapper">
        {this.props.children}
      </div>
    )
  }
}

export default Badge;
