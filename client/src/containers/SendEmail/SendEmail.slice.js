import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const sendEmailSlice = createSlice({
  name: 'sendEmail',
  initialState: {
    templates: [],
    sendEmailInProgress: false,
    saveTemplateInProgress: false
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
    },
    saveTemplateRequest: (state) => {
      state.saveTemplateInProgress = true;
    },
    saveTemplateSuccess: (state) => {
      state.saveTemplateInProgress = false;
    },
    saveTemplateFailure: (state) => {
      state.saveTemplateInProgress = false;
    }
  }
});

const {
  sendEmailRequest,
  sendEmailSuccess,
  sendEmailFailure,
  saveTemplateRequest,
  saveTemplateSuccess,
  saveTemplateFailure
} = sendEmailSlice.actions;

export const sendEmail = (emailData, history) => async (dispatch) => {
  try {
    dispatch(sendEmailRequest());
    const res = await axios.post('/api/emails', emailData);

    if (res.status === 200) {
      history.push('/emails');
      dispatch(sendEmailSuccess());
    }
  } catch (error) {
    console.log(error);
    dispatch(sendEmailFailure());
    toast.error(error.message);
  }
};

export const saveTemplate = (templateData) => async (dispatch) => {
  try {
    dispatch(saveTemplateRequest());
    const res = axios.post('/api/templates', templateData);

    if (res.status === 200) {
      dispatch(saveTemplateSuccess());
    }
  } catch (error) {
    console.log(error);
    dispatch(saveTemplateFailure());
    toast.error(error.mesage);
  }
};

export default sendEmailSlice.reducer;
