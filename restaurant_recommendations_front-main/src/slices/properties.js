import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {setMessage} from "./message";
import PropertiesService from "../services/properties.service";
import EventBus from "../components/auth/EventBus";

export const getCuisines = createAsyncThunk(
    "properties/cuisines",
    async ({}, thunkAPI) => {
        try {
            const data = await PropertiesService.getCuisines();
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

export const getLocations = createAsyncThunk(
    "properties/locations",
    async ({}, thunkAPI) => {
        try {
            const data = await PropertiesService.getLocations();
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
    cuisines : [],
    locations : []
};

const propertiesSlice = createSlice({
    name: "properties",
    initialState,
        extraReducers: {
            [getCuisines.fulfilled]: (state, action) => {
                const data = action.payload.data;
                state.cuisines = data;
            },
            [getLocations.fulfilled]: (state, action) => {
                const data = action.payload.data;
                state.locations = data;
            }
        }
});

const {reducer} = propertiesSlice;
export default reducer;
