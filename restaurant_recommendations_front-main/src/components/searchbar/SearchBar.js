import React, {useEffect, useState} from "react";
import {StyledAutocomplete} from "./SearchBar.module";
import {useDispatch, useSelector} from "react-redux";
import {getLocations} from "../../slices/properties";

import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {getRestaurantsByLocations} from "../../slices/restaurant";
import {Grid} from "@mui/material";

const filter = createFilterOptions();

export default function SearchBar(props) {

    const locations = useSelector(state => state.properties.locations);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLocations({}));
    }, [dispatch]);

    const [value, setValue] = React.useState(null);

    useEffect(() => {
        console.log(value);
        if (value != null) {
            const locationId = value.id;
            dispatch(getRestaurantsByLocations({locationId}));
        }
    }, [value]);

    return (
        <Grid container
              spacing={0}
              pt={6}
              direction="column"
              alignItems="center"
              justifyContent="center">
            <Grid item xs={12}>
                <h4>Search restaurants</h4>
                <StyledAutocomplete
                    value={value}
                    onChange={(event, newValue) => {

                        if (typeof newValue === 'string') {
                            setValue({
                                name: newValue,
                            });
                        } else if (newValue && newValue.inputValue) {
                            // Create a new value from the user input
                            setValue({
                                name: newValue.inputValue,
                            });
                        } else {
                            setValue(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        const {inputValue} = params;
                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="free-solo-with-text-demo"
                    options={locations}
                    getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        // Regular option
                        return option.name;
                    }}
                    renderOption={(props, option) => <li {...props}>{option.name}</li>}
                    sx={{width: 600}}

                    freeSolo
                    size = "big"
                    renderInput={(params) => (
                        <TextField {...params} label="Type city to search..."/>
                    )}
                />
            </Grid>
        </Grid>
    );
}