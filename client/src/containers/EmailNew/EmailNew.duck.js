// ========== Action types ========== //

export const NEW_EMAIL_REQUEST = 'NEW_EMAIL_REQUEST';
export const NEW_EMAIL_SUCCESS = 'NEW_EMAIL_SUCCESS';
export const NEW_EMAIL_FAILURE = 'NEW_EMAIL_FAILURE';

// ========== Reducer ========== //

const initialState = {
  newEmail: null,
  newEmailInProgress: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case NEW_EMAIL_REQUEST:
      newEmailInProgress: true;
      break;
    case NEW_EMAIL_SUCCESS:
      newEmail: payload;
      newEmailInProgress: false;
      break;
    case NEW_EMAIL_FAILURE:
      newEmailInProgress: false;
      break;
    default:
      return state;
  }
};

// ========== Selectors ========== //

// ==========  ========== //

// ==========  ========== //
