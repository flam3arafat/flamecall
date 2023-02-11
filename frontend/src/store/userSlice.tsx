import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  userLogin,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "./userAction";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const persist = localStorage.getItem("persist")
  ? localStorage.getItem("persist")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  contacts: null,
  male: null,
  female: null,
  userToken,
  persist,
  error: null,
  success: false,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("persist");
      state.loading = false;
      state.userInfo = null;
      state.contacts = null;
      state.male = null;
      state.female = null;
      state.userToken = null;
      state.persist = null;
      state.error = null;
      state.loggedIn = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.loggedIn = false;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.userToken;
        state.loggedIn = true;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.loggedIn = false;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        window.location.replace(`http://localhost:3000/login`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getContacts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        state.contacts = payload.contacts;
        state.male = payload.contacts.filter(
          (contact) => contact.gender === "male"
        );
        state.female = payload.contacts.filter(
          (contact) => contact.gender === "female"
        );
        state.loading = false;
        state.success = true;
      })
      .addCase(getContacts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createContact.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state, { payload }) => {
        state.contacts.push(payload.contact);
        state.loading = false;
        state.success = true;
        window.location.reload();
      })
      .addCase(createContact.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateContact.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        window.location.reload();
      })
      .addCase(updateContact.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteContact.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        window.location.reload();
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
