import defaultAvatar from '../assets/avatar.png';

export const extendUser = (user) => {
  if (user) {
    return {
      ...user,
      picture: user.picture ? user.picture : defaultAvatar
    };
  }
};

export const getFullName = (user) => {
  if (user) {
    const fullName = [user.name.firstName, user.name.lastName];

    return fullName.filter(name => name && name.trim()).join(' ') || user.name.username;;
  }
};
