import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Toast from '../../components/Toast/Toast';
import MainHeader from '../../components/MainHeader/MainHeader';
import UserSettingsPage from '../../pages/UserSettingsPage/UserSettingsPage';
import UserNotificationsPage from '../../pages/UserNotificationsPage/UserNotificationsPage';
import UsersPage from '../../pages/UsersPage/UsersPage';
import NoMatchPage from '../../pages/NoMatchPage/NoMatchPage';
import UserProfilePage from '../../pages/UserProfilePage/UserProfilePage';
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
      <React.Fragment>
        <MainHeader />
        <Switch>
          <Route path="/settings" component={UserSettingsPage} />
          <Route path="/notifications" component={UserNotificationsPage} />
          <Route path="/users"component={UsersPage} />
          <Route path="/users/:userId"component={UserProfilePage} />
          <Route component={NoMatchPage} />
        </Switch>
        <Toast />
      </React.Fragment>
    )
  }
}

const mapStateToProps = _ => ({
  token: localStorage.getItem('id_token')
});

const mapDispatchToProps = { fetchCurrentUser }

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
