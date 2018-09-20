import React, { Component } from 'react'

import Users from '../Users/Users'
import withAuth from '../../HOCs/withAuth'

const WithAuthUsers = withAuth(Users);

class Home extends Component {
  render() {
    return (
      <div>Home component
        Users component here:
        <WithAuthUsers />
      </div>
    )
  }
}

export default Home;
