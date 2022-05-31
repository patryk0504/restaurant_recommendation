import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getRates = (restaurant_id) => {
    return axios
        .get(API_URL + "/restaurant/" + restaurant_id +  "/rate",
            {headers : authHeader()},
            )
        .then((response) => {
            return response.data;
        })
}

const getComments = (restaurant_id) => {
    return axios
        .get(API_URL + "/restaurant/" + restaurant_id +  "/comment",
            {headers : authHeader()},
        )
        .then((response) => {
            return response.data;
        })
}

const getAllRatesWithComments= (restaurant_id) => {
    return axios
        .get(API_URL + "/restaurant/" + restaurant_id +  "/rates/all",
            {headers : authHeader()},
        )
        .then((response) => {
            return response.data;
        })
}

const setRate = (restaurant_id, rating) => {
    return axios
        .put(API_URL + "/restaurant/" + restaurant_id + "/rate/" + rating,
            // {"rating" : rating},
            {},
            {headers : authHeader()},
            )
        .then((response) => {
            return response.data;
        })
}

const setComment = (restaurant_id, comment) => {
    return axios
        .put(API_URL + "/restaurant/" + restaurant_id + "/comment",
            {"comment" : comment},
            {headers : authHeader()},
        )
        .then((response) => {
            return response.data;
        })
}

const getSimilarUsers = () => {
    return axios
        .get(API_URL + "/user/recommendations",
            {headers : authHeader()}
            )
        .then((response)=>{
            return response.data;
        })
}

export default {getRates, setRate, getSimilarUsers, getComments, setComment, getAllRatesWithComments};