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

// Action creators are generated for each case reducer function
const { setUser } = authSlice.actions;

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/user');

  dispatch(setUser(res.data));
};

export default authSlice.reducer;
