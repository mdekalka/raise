import React, { Component } from 'react';
import moment from 'moment'
import { connect } from 'react-redux';
import axios from 'axios';
import debounce from 'lodash/debounce';

import './UserSettingsPage.scss';
import Badge from '../../components/Badge/Badge';
import { URL } from '../../constants/url';
import { currentUserUpdate } from '../../actions/user';

const DEBOUNCE_INPUT_DELAY = 300;
class UserSettingsPage extends Component {
  state = {
    user: null,
    updateUserError: null,
    isUpdating: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user !== prevState.user && !prevState.user) {
      return {
        user: nextProps.user
      }
    }

    return null;
  }

  handleFormChange = (event) => {
    const { target } = event;

    this.setState(prevState => {
      return {
        user: {...prevState.user, [target.name]: target.value}
      }
    }, this.updateUserSettings);
  }

  handleNameChange = event => {
    const { target } = event;

    this.setState(prevState => {
      return {
        user: {...prevState.user, name: {
          ...prevState.user.name,
          [target.name]: target.value
        }}
      }
    }, this.updateUserSettings);
  }

  updateUserSettings = debounce(() => {
    const { user } = this.state;

    axios.put(URL.user.userSettings, user)
      .then(() => {
        this.props.currentUserUpdate(user);
      })
      .catch(err => {
        this.setState({ updateUserError: err.error });
      })
      .finally(_ => {
        this.setState({ isUpdating: false });
      })
  }, DEBOUNCE_INPUT_DELAY)

  render() {
    const { user } = this.state;

    return (
      <div className="user-settings-page">
          <div className="container">
            <Badge>Updating...</Badge>
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
                      <input type="text" placeholder="Change you first name" name="firstName" onChange={this.handleNameChange} value={user.name.firstName} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="lastName">Last name:</label>
                      <input type="text" placeholder="Change you last name" name="lastName" onChange={this.handleNameChange} value={user.name.lastName} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="age">Age:</label>
                      <input type="text" placeholder="Change you age" name="age" onChange={this.handleFormChange} value={user.age} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="email">Email:</label>
                      <input type="text" placeholder="Change you email" name="email" onChange={this.handleFormChange} value={user.email} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="title">Job title:</label>
                      <input type="text" placeholder="Change you job title" name="title" onChange={this.handleFormChange} value={user.title} />
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

const mapDispatchToProps = {
  currentUserUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsPage);
