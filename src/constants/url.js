
const API_VERSION = '/api/v1';
export const URL = {
  auth: {
    login: `${API_VERSION}/login`,
    forgotPassword: `${API_VERSION}/forgot-password`,
    register: `${API_VERSION}/register`,
    currentUser: `${API_VERSION}/currentUser`
  },
  users: `${API_VERSION}/users`,
  resetPassword: `${API_VERSION}/forgot-password/reset`,
  user: {
    userSettings: `${API_VERSION}/settings`
  }
};
