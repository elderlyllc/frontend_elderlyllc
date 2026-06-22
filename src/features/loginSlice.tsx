import { createSlice } from '@reduxjs/toolkit';;

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: localStorage.getItem('token') || '',
    userName: '',
    email: '',
    roleId: localStorage.getItem('role_id') ? Number(localStorage.getItem('role_id')) : null as number | null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRoleId: (state, action) => {
      state.roleId = action.payload;
    },
  },
});

export const { setEmail, setToken, setRoleId } = loginSlice.actions;
export default loginSlice.reducer;