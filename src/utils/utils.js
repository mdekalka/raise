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
    if (user.name.firstName.trim() || user.name.lastName.trim()) {
      return `${user.name.firstName} ${user.name.lastName}`
    } else {
      return user.name.username;
    }
  }
};
