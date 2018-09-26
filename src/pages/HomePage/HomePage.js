import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import MainHeader from '../../components/MainHeader/MainHeader';
import UserSettingsPage from '../../pages/UserSettingsPage/UserSettingsPage';
import UserNotificationsPage from '../../pages/UserNotificationsPage/UserNotificationsPage';
import { fetchCurrentUser } from '../../actions/user';

class HomePage extends Component {
  componentDidMount() {
    if (this.props.token) {
      this.props.fetchCurrentUser();
    } else {
      this.props.history.replace('/login');
    }
  }

  render() {
    return (
      <div className="home-page">
        <MainHeader />
        Welcome to home page
        <Switch>
          <Route path="/user/settings" component={UserSettingsPage} />
          <Route path="/user/notifications" component={UserNotificationsPage} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = _ => ({
  token: localStorage.getItem('id_token')
});

const mapDispatchToProps = { fetchCurrentUser }

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
