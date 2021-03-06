import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaBell, FaSignOutAlt, FaUserCog, FaCaretDown } from 'react-icons/fa';

import './MainHeader.scss';

import Loader from '../../components/Loader/Loader';
import { logout } from '../../actions/auth'
import { getFullName } from '../../utils/utils';


class MainHeader extends Component {
  state = {
    isDropdownOpen: false
  }

  dropdownToggle = () => {
    this.setState(prevState => ({ isDropdownOpen: !prevState.isDropdownOpen }));
  }

  logout = () => {
    this.props.logout().then(_ => {
      this.props.history.replace('/login');
    });
  }

  openUserSettings = () => {
    this.props.history.push('/settings');
  }

  openNotifications = () => {
    this.props.history.push('/notifications');
  }

  render() {
    const { user } = this.props;

    return (
      <header className="main-header">
        <ul className="header-user-info">
          <li className="header-item" onClick={this.openNotifications}><FaBell /></li>
          <Dropdown tag="li" className="header-item profile-item" isOpen={this.state.isDropdownOpen} toggle={this.dropdownToggle}>
            <DropdownToggle
              tag="div"
              className="header-profile-dropdown"
              data-toggle="dropdown"
              aria-expanded={this.state.isDropdownOpen}>
                {!user
                  ? <Loader inline size="small" />
                  : <React.Fragment>
                      <img className="header-avatar" src={user && user.picture} alt="profile" />
                      <span className="header-username">{getFullName(user)}</span>
                      <FaCaretDown className="caret-icon" />
                  </React.Fragment>
                }
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={this.openUserSettings}><FaUserCog className="dropdown-icon" />User settings</DropdownItem>
              <DropdownItem onClick={this.logout}><FaSignOutAlt className="dropdown-icon" />Log out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ul>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.currentUser
});

const mapDispatchToProps = { logout }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainHeader));
