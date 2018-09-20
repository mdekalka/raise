import React, { Component } from 'react';
import { authService } from '../services/auth'

const withAuth = (AuthComponent) => {
  return class WithAuthentication extends Component {
    state = {
      isAuthenticated: false
    }

    componentDidMount() {
      this.setState({ isAuthenticated: authService.isAuthenticated() })
    }

    render() {
      if (this.state.isAuthenticated) {
        return <AuthComponent {...this.props} />
      } else {
        return <div>Authentication is required to see this content.</div>
      }
    }
  }
}

export default withAuth;
