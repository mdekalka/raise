import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainHeader from '../../components/MainHeader/MainHeader';
import UserSettingsPage from '../../pages/UserSettingsPage/UserSettingsPage';

class HomePage extends Component {
  render() {
    return (
      <div className="home-page">
        <MainHeader />
        <Switch>
          <Route path="/user/settings" component={UserSettingsPage} />
        </Switch>
      </div>
    )
  }
}

export default HomePage;
