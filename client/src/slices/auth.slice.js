import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload || false;
    }
  }
});

const { setUser } = authSlice.actions;

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');

  dispatch(setUser(res.data));
};

export default authSlice.reducer;
