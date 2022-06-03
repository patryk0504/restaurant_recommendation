import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/";

const getRestaurantsByLocations = (location_id) => {
    return axios
        .get(API_URL + "restaurants/locations/" + location_id,
            {headers: authHeader()},
        )
        .then((response) => {
            return response.data;
        })
}

const getRestaurantById = (restaurant_id) => {
    return axios
        .get(API_URL + "restaurant/" + restaurant_id,
            {headers: authHeader()},
        )
        .then((response) => {
            return response.data;
        })
}

const getRestaurantRecommendationInCity = (restaurant_id) => {
    return axios
        .get(API_URL + "restaurant/" + restaurant_id + "/recommendations/city",
            {headers: authHeader()},
        )
        .then((response) => {
            return response.data;
        })
}

const getRestaurantRecommendationAllCountry = (restaurant_id) => {
    return axios
        .get(API_URL + "restaurant/" + restaurant_id + "/recommendations/country",
            {headers: authHeader()},
        )
        .then((response) => {
            return response.data;
        })
}

const getRestaurantRecommendationByUsers = () => {
    return axios
        .get(API_URL + "restaurant/recommendations/user",
            {headers: authHeader()},
        )
        .then((response) => {
            return response.data;
        })
}

export default {
    getRestaurantsByLocations,
    getRestaurantById,
    getRestaurantRecommendationInCity,
    getRestaurantRecommendationAllCountry,
    getRestaurantRecommendationByUsers
};