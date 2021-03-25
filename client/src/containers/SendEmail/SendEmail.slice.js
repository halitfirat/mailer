import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const sendEmailSlice = createSlice({
  name: 'sendEmail',
  initialState: {
    sendEmailInProgress: false
  },
  reducers: {
    sendEmailRequest: (state) => {
      state.sendEmailInProgress = true;
    },
    sendEmailSuccess: (state) => {
      state.sendEmailInProgress = false;
    },
    sendEmailFailure: (state) => {
      state.sendEmailInProgress = false;
    }
  }
});

const {
  sendEmailRequest,
  sendEmailSuccess,
  sendEmailFailure
} = sendEmailSlice.actions;

export const sendEmail = (email) => async (dispatch) => {
  dispatch(sendEmailRequest());

  const res = await axios.post('/api/emails', email);

  if (res.status === 200) {
    dispatch(sendEmailSuccess());
  } else {
    dispatch(sendEmailFailure());
  }
};

export default sendEmailSlice.reducer;
