import React, { PureComponent } from 'react';

import './RoleBadge.scss';
import{ USER_ROLES } from '../../constants/constants';


class RoleBadge extends PureComponent {
  defineRoleClass(role) {
    switch(role) {
      case USER_ROLES.ADMIN:
        return 'admin-role';
      case USER_ROLES.COLLABORATOR:
        return 'collaborator-role';
      case USER_ROLES.USER:
        return 'user-role';
      default:
        return '';
    }
  }

  render() {
    return (
      <div className={`role-badge ${this.defineRoleClass(this.props.role)}`}>
        {this.props.role}
      </div>
    )
  }
}

export default RoleBadge;
