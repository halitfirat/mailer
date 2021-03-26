import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const listEmailsSlice = createSlice({
  name: 'listEmails',
  initialState: {
    emails: [],
    listEmailsInProgress: false,
    deleteEmailInProgress: false
  },
  reducers: {
    listEmailsRequest: (state) => {
      state.listEmailsInProgress = true;
    },
    listEmailsSuccess: (state, action) => {
      state.emails = action.payload;
      state.listEmailsInProgress = false;
    },
    listEmailsFailure: (state) => {
      state.listEmailsInProgress = false;
    },
    deleteEmailRequest: (state) => {
      state.deleteEmailInProgress = true;
    },
    deleteEmailSuccess: (state, action) => {
      state.emails = state.emails.filter(({ _id }) => _id !== action.payload);
      state.deleteEmailInProgress = false;
    },
    deleteEmailFailure: (state) => {
      state.deleteEmailInProgress = false;
    }
  }
});

const {
  listEmailsRequest,
  listEmailsSuccess,
  listEmailsFailure,
  deleteEmailRequest,
  deleteEmailSuccess,
  deleteEmailFailure
} = listEmailsSlice.actions;

export const listEmails = () => async (dispatch) => {
  dispatch(listEmailsRequest());

  const res = await axios.get('/api/emails');
  console.log(res);

  if (res) {
    dispatch(listEmailsSuccess(res.data));
  } else {
    dispatch(listEmailsFailure);
  }
};

export const deleteEmail = (emailId) => async (dispatch) => {
  dispatch(deleteEmailRequest());

  const res = await axios.delete(`/api/emails/${emailId}`);

  if (res) {
    dispatch(deleteEmailSuccess(emailId));
  } else {
    dispatch(deleteEmailFailure());
  }
};

export default listEmailsSlice.reducer;
