import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setMessage} from "./message";
import AdministrationService from "../services/administration.service";
import EventBus from "../components/auth/EventBus";

export const getAllUsers = createAsyncThunk(
    "administration/users",
    async ({restaurantId}, thunkAPI) => {
        try {
            const data = await AdministrationService.getAllUsers();
            return {data: data};
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            if (error.response && (error.response.status === 401 || error.response.status === 422 || error.response.status === 403)) {
                EventBus.dispatch("logout");
            }
            return thunkAPI.rejectWithValue();
        }
    }
);


export const addAdminRole = createAsyncThunk(
    "administration/add/role",
    async ({username}, thunkAPI) => {
        try {
            const data = await AdministrationService.addAdminRole(username);
            return {data: data};
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            if (error.response && (error.response.status === 401 || error.response.status === 422)) {
                EventBus.dispatch("logout");
            }else if(error.response.status === 403){
                alert(error.response.data.message);
            }
            return thunkAPI.rejectWithValue();
        }
    }
);

export const cancelAdminRole = createAsyncThunk(
    "administration/add/cancel",
    async ({username}, thunkAPI) => {
        try {
            const data = await AdministrationService.cancelAdminRole(username);
            return {data: data};
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            if (error.response && (error.response.status === 401 || error.response.status === 422)) {
                EventBus.dispatch("logout");
            }else if(error.response.status === 403){
                alert(error.response.data.message);
            }
            return thunkAPI.rejectWithValue();
        }
    }
);

export const addRestaurant = createAsyncThunk(
    "restaurant/add",
    async ({data}, thunkAPI) => {
        try {
            const response = await AdministrationService.addRestaurant(data);
            thunkAPI.dispatch(setMessage("Successfully added restaurant!"));
            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            if (error.response && (error.response.status === 403 || error.response.status === 401 || error.response.status === 422 || error.response.status === 403)) {
                EventBus.dispatch("logout");
            }
            return thunkAPI.rejectWithValue();
        }
    }
);

export const deleteRestaurant = createAsyncThunk(
    "restaurant/delete",
    async ({restaurantId}, thunkAPI) => {
        try {
            const response = await AdministrationService.deleteRestaurant(restaurantId);
            thunkAPI.dispatch(setMessage("Successfully deleted restaurant!"));
            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            if (error.response && (error.response.status === 403 || error.response.status === 401 || error.response.status === 422 || error.response.status === 403)) {
                EventBus.dispatch("logout");
            }
            return thunkAPI.rejectWithValue();
        }
    }
);

const initialState = {
    users : null
};

const administrationSlice = createSlice({
    name: "administration",
    initialState,
    extraReducers: {
        [getAllUsers.pending]: (state, action) => {
            state.users = null;
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.users = action.payload.data;
        }
    }
});



const {reducer} = administrationSlice;
export default reducer;