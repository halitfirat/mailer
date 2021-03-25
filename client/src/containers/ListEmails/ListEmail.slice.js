import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const listEmailsSlice = createSlice({
  name: 'listEmails',
  initialState: {
    emails: null,
    listEmailsInProgress: false
  },
  reducers: {
    listEmailsRequest: (state) => {
      state.listEmailsInProgress = true;
    },
    listEmailsSuccess: (state, action) => {
      state.listEmailsInProgress = false;
      state.emails = action.payload;
    },
    listEmailsFailure: (state) => {
      state.listEmailsInProgress = false;
    }
  }
});

const {
  listEmailsRequest,
  listEmailsSuccess,
  listEmailsFailure
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

export default listEmailsSlice.reducer;
