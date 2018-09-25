import React, { Component } from 'react';
import axios from 'axios';

class UserSettingsPage extends Component {
  componentDidMount() {
    axios.get('/user/settings').then(data => {
      debugger
    })
    .catch(err => {
      console.log(err, "ERR");
    })
  }


  render() {
    return (
      <div className="user-settings-page">
          <div className="container">
            User settings page
          </div>
      </div>
    )
  }
}

export default UserSettingsPage;
