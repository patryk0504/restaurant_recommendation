import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setMessage} from "./message";
import RestaurantService from "../services/restaurant.service";
import EventBus from "../components/auth/EventBus";


export const getRestaurantsByLocations = createAsyncThunk(
    "restaurant/locations/list",
    async ({locationId}, thunkAPI) => {
        try {
            const data = await RestaurantService.getRestaurantsByLocations(locationId);
            return {data: data};
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

export const getRestaurantById = createAsyncThunk(
    "restaurant/id",
    async ({restaurantId}, thunkAPI) => {
        try {
            const data = await RestaurantService.getRestaurantById(restaurantId);
            return {data: data};
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

export const getRestaurantRecommendationInCity = createAsyncThunk(
    "restaurant/recommendation/city",
    async ({restaurant_id}, thunkAPI) => {
        try {
            const data = await RestaurantService.getRestaurantRecommendationInCity(restaurant_id);
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


export const getRestaurantRecommendationAllCountry = createAsyncThunk(
    "restaurant/recommendation/country",
    async ({restaurant_id}, thunkAPI) => {
        try {
            const data = await RestaurantService.getRestaurantRecommendationAllCountry(restaurant_id);
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

export const getRestaurantRecommendationByUsers = createAsyncThunk(
    "restaurant/recommendation/users",
    async ({restaurant_id}, thunkAPI) => {
        try {
            const data = await RestaurantService.getRestaurantRecommendationByUsers({});
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

export const setRestaurantId = createAction(
    "restaurant/setRestaurantId",
    ({restaurantId}) => {
        return {
            payload: {
                restaurant_id: restaurantId
            }
        }
    });

export const setRecommendedArea = createAction(
    "restaurant/setRecommendedArea",
    (area) => {
        return {
            payload: {
                recommendedArea: area
            }
        }
    });


const initialState = {
    restaurants: [],
    restaurant: null,
    recommended: [],
    recommendedByUser: [],
    recommendedFound: true,
    recommendedByRestaurantID: null,
    recommendedAreaCountry: null, //true - country, false - city
};

const restaurantSlice = createSlice({
    name: "restaurant",
    initialState,
    extraReducers: {
        [setRestaurantId]: (state, action) => {
            state.recommendedByRestaurantID = action.payload.restaurant_id;
        },
        [setRecommendedArea]: (state, action) => {
            state.recommendedAreaCountry = action.payload.recommendedArea.area;
        },
        [getRestaurantsByLocations.fulfilled]: (state, action) => {
            state.restaurants = action.payload.data;
        },
        [getRestaurantById.fulfilled]: (state, action) => {
            state.restaurant =action.payload.data;
        },
        [getRestaurantRecommendationInCity.pending]: (state, action) => {
            state.recommended = [];
        },
        [getRestaurantRecommendationInCity.fulfilled]: (state, action) => {
            var data = action.payload.data;
            if (data.length > 0) {
                state.recommended = data;
                state.recommendedFound = true;
            } else {
                state.recommendedFound = false;
            }
        },
        [getRestaurantRecommendationAllCountry.pending]: (state, action) => {
            state.recommended = [];
        },
        [getRestaurantRecommendationAllCountry.fulfilled]: (state, action) => {
            var data = action.payload.data;
            if (data.length > 0) {
                state.recommended = data;
                state.recommendedFound = true;
            } else {
                state.recommendedFound = false;
            }
        },
        [getRestaurantRecommendationByUsers.pending]: (state, action) => {
            state.recommendedByUser = [];
        },
        [getRestaurantRecommendationByUsers.fulfilled]: (state, action) => {
            var data = action.payload.data;
            if (data.length > 0) {
                state.recommendedByUser = data;
                state.recommendedFound = true;
            } else {
                state.recommendedFound = false;
            }
        }
    }
});

const {reducer} = restaurantSlice;
export default reducer;
