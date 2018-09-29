import React, { Component } from 'react';
import axios from 'axios';

import './UserPage.scss';
import LayoutPage from '../LayoutPage/LayoutPage';
import RoleBadge from '../../components/RoleBadge/RoleBadge';
import { URL } from '../../constants/url';
import { getFullName } from '../../utils/utils';

class UsersPage extends Component {
  state = {
    users: null,
    isFetching: false,
    usersRequestError: null
  }

  componentDidMount(){
    axios.get(URL.users)
      .then(users => this.setState({ users }))
      .catch(err => this.setState({ usersRequestError: err.error }))
      .finally(() => this.setState({ isFetching: false }))
  }

  render() {
    const { usersRequestError, users } = this.state;

    return (
      <LayoutPage title="users">
        <div>
          {usersRequestError && <div>{usersRequestError}</div>}
          <div className="user-card-list">
            {users && users.map(user => (
              <div key={user._id} className="user-card">
                <div className="card-header">
                  <div className="card-name">{getFullName(user)}</div>
                  <div className="card-title">{user.title}</div>
                  <img className="card-image" src={user.picture} alt="avatar" />
                </div>
                <div className="card-body">
                  <div>Email: {user.email}</div>
                  <RoleBadge role={user.role}></RoleBadge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </LayoutPage>
    )
  }
}

export default UsersPage;

