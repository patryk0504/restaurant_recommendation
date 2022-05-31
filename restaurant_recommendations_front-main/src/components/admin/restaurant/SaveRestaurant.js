import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addRestaurant} from "../../../slices/restaurant";
import CircularProgress from "@mui/material/CircularProgress";
import Success from "./Success";

export default function SaveRestaurant(props) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();


    useEffect(() => {
        const data = {
            "name": props && props.name,
            "address": props && props.address,
            "address_latitude": props.position && props.position.lat,
            "address_longitude": props.position && props.position.lng,
            "cuisines": props && props.cuisineId,
            "location": props && props.locationId,
            "vegan_options": props && props.vegan,
            "vegetarian_friendly": props && props.vegetarian,
            "gluten_free": props && props.glutenFree
        }
        let unmounted = false;
        if (props.name && props.locationId && props.address && props.cuisineId.length > 0) {
            setLoading(true);
            dispatch(addRestaurant({data}))
                .unwrap()
                .then((response) => {
                    if (!unmounted) {
                        setSuccess(true);
                        setLoading(false);
                    }
                })
                .catch((e) => {
                    if (!unmounted) {
                        setSuccess(true);
                        setLoading(false);
                    }
                });
        } else {
            alert("Some fields are missing!");
            setSuccess(false);
        }
        return () => {
            unmounted = true;
        }
    }, [dispatch]);

    return (
        <>
            {loading ? <div><CircularProgress/>Please wait, saving data...</div> : <Success step={props.step} setStep={props.setStep} success={success}/>}
        </>
    )
}