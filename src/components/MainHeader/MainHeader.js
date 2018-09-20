import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaBell, FaSignOutAlt, FaUserCog, FaCaretDown } from 'react-icons/fa';

import './MainHeader.scss';
import avatar from '../../assets/avatar.png'

import { logoutUser } from '../../actions/logout'


class MainHeader extends Component {
  state = {
    isDropdownOpen: false
  }

  dropdownToggle = () => {
    this.setState(prevState => ({ isDropdownOpen: !prevState.isDropdownOpen }));
  }

  logout = () => {
    this.props.logoutUser().then(_ => {
      window.location.reload();
      this.props.history.replace('/login');
    });
  }

  render() {
    return (
      <header className="main-header">
        <ul className="header-user-info">
          <li className="header-item">
            <FaBell />
          </li>
          <Dropdown tag="li" className="header-item profile-item" isOpen={this.state.isDropdownOpen} toggle={this.dropdownToggle}>
              <DropdownToggle
                tag="div"
                className="header-profile-dropdown"
                data-toggle="dropdown"
                aria-expanded={this.state.isDropdownOpen}>
                  <img className="header-avatar" src={avatar} alt="profile" />
                  <span className="header-username">Aleh Isakau</span>
                  <FaCaretDown className="caret-icon" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem><FaUserCog/>User settings</DropdownItem>
                <DropdownItem onClick={this.logout}><FaSignOutAlt />Log out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
        </ul>
      </header>
    )
  }
}

const mapDispatchToProps = { logoutUser }

export default connect(null, mapDispatchToProps)(MainHeader);
