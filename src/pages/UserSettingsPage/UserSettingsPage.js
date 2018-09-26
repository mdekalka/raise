import React, { Component } from 'react';
import moment from 'moment'
import { connect } from 'react-redux';

import './UserSettingsPage.scss';

class UserSettingsPage extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="user-settings-page">
          <div className="container">
            <div className="header-title">Profile settings</div>
            {!user 
              ? <div>Fetching profile information...</div>
              : <div>
                  <div className="user-main-info">
                    <img className="user-image" src={user.picture} alt="avatar" />
                    <div>
                      <div className="user-info-row">Username: <span className="user-info-highlight">{user.name.username}</span></div>
                      <div className="user-info-row">Role: <span className="user-info-highlight">{user.role}</span></div>
                      <div className="user-info-row">
                        Created date: <span className="user-info-highlight">{moment(user.created).format('LL')}</span>
                      </div>
                    </div>
                  </div>
                  <form className="user-info-form">
                    <div className="form-row">
                      <label htmlFor="firstName">First name:</label>
                      <input type="text" placeholder="Change you first name" value={user.name.firstName} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="lastName">Last name:</label>
                      <input type="text" placeholder="Change you last name" value={user.name.lastName} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="age">Age:</label>
                      <input type="text" placeholder="Change you age" value={user.age} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="age">Email:</label>
                      <input type="text" placeholder="Change you email" value={user.email} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="age">Job title:</label>
                      <input type="text" placeholder="Change you job title" value={user.title} />
                    </div>
                  </form>
                </div>
            }
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.currentUser
});

export default connect(mapStateToProps)(UserSettingsPage);
