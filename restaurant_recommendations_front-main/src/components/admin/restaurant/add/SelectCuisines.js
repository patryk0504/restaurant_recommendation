import FormControl from "@mui/material/FormControl";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCuisines, getLocations} from "../../../../slices/properties";
import TextField from "@mui/material/TextField";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import {StyledAutocomplete} from "../../../searchbar/SearchBar.module";

export default function SelectCuisines({cuisineId, setCuisineId}){
    const cuisines = useSelector(state => state.properties.cuisines);
    const dispatch = useDispatch();
    const filter = createFilterOptions();

    useEffect(() => {
        dispatch(getCuisines({}));
    }, [dispatch]);

    const [value, setValue] = React.useState(null);

    useEffect(() => {
        if (value != null) {
            // const cuisineId = value.id;
            const result = value.map((c) => c.id);
            setCuisineId(result);
        }
    }, [value]);
    return(
        <FormControl fullWidth>
            <StyledAutocomplete
                multiple
                // value={value}
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
                options={cuisines}
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
                // sx={{width: 600}}

                freeSolo
                size = "big"
                renderInput={(params) => (
                    <TextField {...params} label="Type cuisine to search..."/>
                )}
            />
        </FormControl>
    )
}