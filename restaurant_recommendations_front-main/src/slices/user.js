import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setMessage} from "./message";
import UserService from "../services/user.service";
import EventBus from "../components/auth/EventBus";

export const getRates = createAsyncThunk(
    "user/rates",
    async ({restaurantId}, thunkAPI) => {
        try {
            const data = await UserService.getRates(restaurantId);
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

export const getComments = createAsyncThunk(
    "user/comments",
    async ({restaurantId}, thunkAPI) => {
        try {
            const data = await UserService.getComments(restaurantId);
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

export const getAllRatesWithComments = createAsyncThunk(
    "user/rates/all",
    async ({restaurantId}, thunkAPI) => {
        try {
            const data = await UserService.getAllRatesWithComments(restaurantId);
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

export const setComment = createAsyncThunk(
    "user/comment/set",
    async ({restaurantId, comment}, thunkAPI) => {
        try {
            const response = await UserService.setComment(restaurantId, comment);
            thunkAPI.dispatch(setMessage(response.message));
            return {data : response.rating};
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

export const setRate = createAsyncThunk(
    "user/rates/set",
    async ({restaurantId, rating}, thunkAPI) => {
        try {
            const response = await UserService.setRate(restaurantId, rating);
            thunkAPI.dispatch(setMessage(response.message));
            return {data : response.rating};
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

export const getSimilarUsers = createAsyncThunk(
    "user/similar",
    async ({}, thunkAPI) => {
        try {
            const data = await UserService.getSimilarUsers();
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


const initialState = {
    rates : {"rating" : 0},
    comment : {"comment" : ""},
    comments : null,
    similarUsers : []
};

const userSlice = createSlice({
    name: "user",
    initialState,
        extraReducers: {
            [getRates.pending]: (state, action) => {
              state.rates = {"rating" : 0}
            },
            [getRates.fulfilled]: (state, action) => {
                state.rates = action.payload.data;
            },
            [getComments.fulfilled] : (state, action) => {
                state.comment = action.payload.data;
            },
            [getAllRatesWithComments.fulfilled] : (state, action) =>{
                state.comments = action.payload.data;
            },
            // [setRate.fulfilled] : (state, action) => {
            //     state.rates = {"rating" : action.payload.data};
            // },
            [setComment.fulfilled] : (state, action) => {
                state.comment = action.payload.data
            },
            [getSimilarUsers.pending]: (state, action) => {
                state.similarUsers = []
            },
            [getSimilarUsers.fulfilled]: (state, action) => {
                state.similarUsers = action.payload.data;
            }
        }
});

const {reducer} = userSlice;
export default reducer;
