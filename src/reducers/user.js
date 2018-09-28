// TODO: add const type/failed statement

const initialState = {
  currentUser: null,
  isFetching: false,
  error: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'CURRENT_USER_REQUEST':
      return { ...state, error: null, isFetching: true };

    case 'CURRENT_USER_RECEIVE':
      return { ...state, error: null, isFetching: false, currentUser: action.user }

    case 'CURRENT_USER_UPDATE':
      return { ...state, currentUser: action.user }

    default:
      return state
  }
};

export default user
