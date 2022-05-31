import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getCuisines = () => {
    return axios
        .get(API_URL + "/cuisines",
            {headers : authHeader()},
            )
        .then((response) => {
            return response.data;
        })
}

const getLocations = () => {
    return axios
        .get(API_URL + "/locations",
            {headers : authHeader()},
        )
        .then((response) => {
            return response.data;
        })
}

export default {getCuisines, getLocations};