import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Retrieve user info and token  from localStorage if available

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Check for an existing guest ID in the localstorage or generate a new One

const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;

localStorage.setItem("guestId", initialGuestId);

const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};
