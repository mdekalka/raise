import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import './LayoutPage.scss'

class LayoutPage extends Component {
  render() {
    const cls = classnames(`page ${this.props.className || ''}`, {
      stretch: this.props.stretch
    });

    return (
      <div className={cls}>
        <Helmet defaultTitle="Raise">
          {this.props.title && <title>{this.props.title}</title>}
        </Helmet>
        {this.props.children}
      </div>
    )
  }
}

export default LayoutPage;

