import { createSlice } from '@reduxjs/toolkit';;

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: '',
    userName: '',
    email: ''
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setEmail, setToken } = loginSlice.actions;
export default loginSlice.reducer;