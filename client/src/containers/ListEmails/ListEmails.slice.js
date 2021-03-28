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
    },
    updateEmailRequest: (state) => {
      state.updateEmailInProgress = true;
    },
    updateEmailSuccess: (state, action) => {
      state.emails = state.emails.map((em) =>
        em._id === action.payload._id ? action.payload : em
      );

      state.updateEmailInProgress = false;
    },
    updateEmailFailure: (state) => {
      state.updateEmailInProgress = false;
    }
  }
});

const {
  listEmailsRequest,
  listEmailsSuccess,
  listEmailsFailure,
  deleteEmailRequest,
  deleteEmailSuccess,
  deleteEmailFailure,
  updateEmailRequest,
  updateEmailSuccess,
  updateEmailFailure
} = listEmailsSlice.actions;

export const listEmails = () => async (dispatch) => {
  try {
    dispatch(listEmailsRequest());
    const res = await axios.get('/api/emails');

    dispatch(listEmailsSuccess(res.data));
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    dispatch(listEmailsFailure);
  }
};

export const deleteEmail = (emailId) => async (dispatch) => {
  try {
    dispatch(deleteEmailRequest());
    await axios.delete(`/api/emails/${emailId}`);

    dispatch(deleteEmailSuccess(emailId));
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    dispatch(deleteEmailFailure());
  }
};

export const updateEmail = (emailId, emailData, onClose) => async (
  dispatch
) => {
  try {
    dispatch(updateEmailRequest());
    const res = await axios.put(`/api/emails/${emailId}`, emailData);

    dispatch(updateEmailSuccess(res.data));
    onClose();
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    dispatch(updateEmailFailure());
    onClose();
  }
};

export default listEmailsSlice.reducer;
