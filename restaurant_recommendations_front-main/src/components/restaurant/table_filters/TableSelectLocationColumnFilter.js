// This is a custom filter UI for selecting
// a unique option from a list
import React, {useEffect} from "react";
import NativeSelect from '@mui/material/NativeSelect';
import {useDispatch, useSelector} from "react-redux";
import {getLocations} from "../../../slices/properties";
export default function SelectColumnFilter({
                                column: {filterValue, setFilter, preFilteredRows, id},
                            }) {

    const locations = useSelector(state => state.properties.locations);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLocations({}));
    }, [dispatch]);

    // Render a multi-select box
    return (
        <NativeSelect
            style={{
                width: '80%',
            }}
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            {/*{console.log(filterValue)}*/}
            <option value="">All</option>
            {locations.map((option, i) => (
                // console.log(option, i)
                <option key={i} value={option.name ? option.name : " "}>
                    {option.name}
                </option>
            ))}
        </NativeSelect>
    )
}