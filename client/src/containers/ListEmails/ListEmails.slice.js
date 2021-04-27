import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const listEmailsSlice = createSlice({
  name: 'listEmails',
  initialState: {
    emails: [],
    listEmailsInProgress: false,
    deleteEmailInProgress: false,
    updateEmailInProgress: false
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
  try {
    dispatch(listEmailsRequest());
    const res = await axios.get('/api/emails');

    dispatch(listEmailsSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(listEmailsFailure);

    if (error.response.status !== 401) {
      toast.error(error.message);
    }
  }
};

export const deleteEmail = (emailId) => async (dispatch) => {
  try {
    dispatch(deleteEmailRequest());
    await axios.delete(`/api/emails/${emailId}`);

    dispatch(deleteEmailSuccess(emailId));
  } catch (error) {
    console.log(error);
    dispatch(deleteEmailFailure());
    toast.error(error.message);
  }
};

export default listEmailsSlice.reducer;
