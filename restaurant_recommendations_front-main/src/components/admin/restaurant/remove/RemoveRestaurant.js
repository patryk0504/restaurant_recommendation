import React, {useEffect, useState} from "react";
import SearchBar from "../../../searchbar/SearchBar";
import {useDispatch, useSelector} from "react-redux";
import RestaurantTable from "../../../restaurant/RestaurantTable";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import restaurant_image from "../../../../assets/restaurant_image.jpg";
import {Col, Row} from "react-bootstrap";
import TableSelectCuisineColumnFilter from "../../../restaurant/table_filters/TableSelectCuisineColumnFilter";
import SelectColumnFilter from "../../../restaurant/table_filters/TableSelectLocationColumnFilter";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {addAdminRole, deleteRestaurant} from "../../../../slices/administration";
import CircularProgress from "@mui/material/CircularProgress";


export default function RemoveRestaurant() {
    const restaurants = useSelector(state => state.restaurant.restaurants);
    const [loading, setLoading] = useState(false);
    const [deleteRestaurantId, setDeleteRestaurantId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (deleteRestaurantId) {
            let unmounted = false;
            setLoading(true);
            const restaurantId = deleteRestaurantId;
            dispatch(deleteRestaurant({restaurantId}))
                .unwrap()
                .then((response) => {
                    if (!unmounted) {
                        setLoading(false);
                        window.location.reload();
                    }
                })
                .catch((e) => {
                    if (!unmounted) {
                        setLoading(false);
                    }
                });
            return () => {
                unmounted = true;
            }
        }
    }, [deleteRestaurantId]);

    const columns = React.useMemo(
        () => [

            {
                Header: 'Restaurant ID',
                columns: [
                    {
                        Header: 'id',
                        accessor: 'id',
                        disableFilters: true,
                        style: {'white-space': 'unset'},
                        width: 120,
                        enableResize: true,
                        hideable: true

                    }
                ]
            },
            {
                Header: 'Properties',
                width: 340,
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',
                        // width: 160,
                        enableResize: true,
                        hideable: false,
                        disableFilters: true,

                        // filter: 'fuzzyText',
                        Cell: table_props =>
                            <Row>
                                <Col>{table_props.cell.value}</Col>
                                <div className="w-100 d-none d-md-block"/>
                                <Col><p className="text-secondary">{table_props.row.original.address}</p></Col>
                            </Row>
                    },
                    {
                        Header: 'Location',
                        // accessor: 'location',
                        accessor: (row) => row.location.name,
                        hideable: true,
                        Filter: SelectColumnFilter,
                        filter: 'fuzzyText',
                        disableSortBy: true,
                        disableFilters: true,
                        // width: 90,
                        Cell: table_props =>
                            <Col>
                                {table_props.cell.value}
                            </Col>
                    }
                ],
            },
            {
                Header: 'Option',
                columns: [
                    {
                        Header: <DeleteForeverIcon/>,
                        id: 'delete-button',
                        width: 70,
                        onClickPropagation: true,

                        Cell: table_props =>
                            <Col>
                                <button
                                    style={{
                                        backgroundColor: 'transparent',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        outline: 'none',
                                        hideable: false,

                                    }}
                                    onMouseDown={e => e.stopPropagation()}
                                    onClick={(e) => {
                                        setDeleteRestaurantId(table_props.row.values.id);
                                        e.stopPropagation();
                                    }}><DeleteForeverIcon fontSize="large"/></button>
                            </Col>
                    }]
            }
        ],
        []
    );
    return <>
        <Row md={1}>
            <SearchBar/>
            {loading ? <div><CircularProgress/>Please wait, fetching data...</div> :
                restaurants && restaurants.length ?
                    <RestaurantTable
                        data={restaurants}
                        loading={loading}
                        columns={columns}
                    />
                    :
                    <Grid container
                          spacing={0}
                          pt={6}
                          direction="column"
                          alignItems="center"
                          justifyContent="center">
                        <Grid item xs={12}>
                            <Box
                                component="img"
                                sx={{
                                    height: 650,
                                    width: 500,
                                    maxHeight: {xs: 300, md: 650},
                                    maxWidth: {xs: 200, md: 500},
                                }}
                                style={{borderRadius: "10px"}}
                                alt="The house from the offer."
                                src={restaurant_image}
                            />
                        </Grid>
                    </Grid>
            }
        </Row>
    </>
}