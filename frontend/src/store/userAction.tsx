import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3001";

export const userLogin = createAsyncThunk(
  "user/login",
  // @ts-ignore: Property '...' does not exist on type 'void'
  async ({ email, password }: any, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        config
      );

      localStorage.setItem("userToken", data.token);
      localStorage.setItem("persist", "true");
      console.log("data:", data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  // @ts-ignore: Property '...' does not exist on type 'void'
  async (
    { last_name, first_name, email, password }: any,
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.put(
        `${BASE_URL}/auth/signup`,
        { last_name, first_name, email, password },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getContacts = createAsyncThunk(
  "user/getContacts",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { user }: any = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };

      const { data } = await axios.get(
        `${BASE_URL}/crud/contacts/${user.userInfo.id}`,
        config
      );
      console.log("contacts fetching:", data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createContact = createAsyncThunk(
  "user/createContact",
  async (
    { first_name, last_name, gender, phone, userId }: any,
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/crud/contact`,
        { first_name, last_name, gender, phone, userId },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateContact = createAsyncThunk(
  "user/updateContact",
  async (
    { first_name, last_name, gender, phone, userId, contactId }: any,
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };

      const { data } = await axios.put(
        `${BASE_URL}/crud/contact/${contactId}`,
        { first_name, last_name, gender, phone, userId },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteContact = createAsyncThunk(
  "user/deleteContact",
  async ({ userId, contactId }: any, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        data: {
          userId,
        },
      };

      const { data } = await axios.delete(
        `${BASE_URL}/crud/contact/${contactId}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
