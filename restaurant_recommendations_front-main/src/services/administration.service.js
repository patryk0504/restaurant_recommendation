import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/admin";

const getAllUsers = () => {
    return axios
        .get(API_URL + "/users",
            {headers: authHeader()}
        )
        .then((response) => {
            return response.data;
        })
}

const addAdminRole = (username) => {
    return axios
        .put(API_URL + "/role/assign",
            {
                username: username,
                role: "ROLE_ADMIN"
            },
            {headers: authHeader()}
        )
        .then((response) => {
            return response.data;
        })
}

const cancelAdminRole = (username) => {
    return axios
        .put(API_URL + "/role/cancel",
            {
                username: username,
            },
            {headers: authHeader()}
        )
        .then((response) => {
            return response.data;
        })
}

const addRestaurant = (data) => {
    return axios
        .post(API_URL + "/restaurant",
            {data},
            {headers: authHeader()},
        )
        .then((response) => {
            return response.data;
        })
}

const deleteRestaurant = (restaurantId) => {
    return axios
        .delete(API_URL + "/restaurant/"+restaurantId,
            {headers: authHeader()}
        )
        .then((response) => {
            return response.data;
        })
}

export default {getAllUsers, addAdminRole, addRestaurant, cancelAdminRole, deleteRestaurant};