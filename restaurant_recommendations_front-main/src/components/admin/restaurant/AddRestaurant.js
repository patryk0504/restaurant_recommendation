import React, {useEffect, useState} from "react";
import RestaurantDetails from "./RestaurantDetails";
import LocationDetails from "./LocationDetails";
import RestaurantProperties from "./RestaurantProperties";
import Success from "./Success";
import {setComment} from "../../../slices/user";
import {useDispatch} from "react-redux";
import {addRestaurant} from "../../../slices/restaurant";
import CircularProgress from "@mui/material/CircularProgress";
import SaveRestaurant from "./SaveRestaurant";

export default function AddRestaurant() {
    const [step, setStep] = useState(1);
    //details
    const [name, setName] = useState(null);
    const [locationId, setLocationId] = useState(null);
    const [address, setAddress] = useState(null);
    //location details
    // const [addressLongitude, setAddressLongitude] = useState(null);
    // const [addressLatitude, setAddressLatitude] = useState(null);
    const [position, setPosition] = useState(null);
    //properties
    const [cuisineId, setCuisineId] = useState([]);
    const [vegetarian, setVegetarian] = useState(false);
    const [vegan, setVegan] = useState(false);
    const [glutenFree, setGlutenFree] = useState(false);
    //save
    const [saveRestaurant, setSaveRestaurant] = useState(false);

    switch (step) {
        case 1:
            return (
                <RestaurantDetails
                    step={step}
                    setStep={setStep}
                    name={name}
                    setName={setName}
                    locationId={locationId}
                    setLocationId={setLocationId}
                    address={address}
                    setAddress={setAddress}
                />
            )
        case 2:
            return (
                <LocationDetails
                    step={step}
                    setStep={setStep}
                    position={position}
                    setPosition={setPosition}
                />
            )
        case 3:
            return (
                <RestaurantProperties
                    step={step}
                    setStep={setStep}
                    cuisineId={cuisineId}
                    setCuisineId={setCuisineId}
                    vegetarian={vegetarian}
                    setVegetarian={setVegetarian}
                    vegan={vegan}
                    setVegan={setVegan}
                    glutenFree={glutenFree}
                    setGlutenFree={setGlutenFree}
                />
            )
        case 4:
            // setSaveRestaurant(true);

            return (
                <SaveRestaurant
                    name={name}
                    locationId={locationId}
                    address={address}
                    position={position}
                    cuisineId={cuisineId}
                    vegetarian={vegetarian}
                    vegan={vegan}
                    glutenFree={glutenFree}
                    step = {step}
                    setStep = {setStep}
                />
            )
        // never forget the default case, otherwise VS code would be mad!
        default:
        // do nothing
    }
}