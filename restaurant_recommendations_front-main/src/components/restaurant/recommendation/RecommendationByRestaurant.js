import {Col, Row} from "react-bootstrap";
import RestaurantTable from "../RestaurantTable";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import RecommendationNotFound from "./RecommendationNotFound";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import {
    getRestaurantRecommendationAllCountry,
    getRestaurantRecommendationByUsers,
    getRestaurantRecommendationInCity
} from "../../../slices/restaurant";


export default function RecommendationByRestaurant() {

    const columns = React.useMemo(
        () => [

            {
                Header: 'Restaurant ID',
                columns: [
                    {
                        Header: 'id',
                        accessor: (row) => row.restaurant.id,
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
                        accessor: (row) => row.restaurant.name,//.map((a) => a.name).join(" "),
                        width: 160,
                        enableResize: true,
                        hideable: false,
                        filter: 'fuzzyText',
                        Cell: table_props =>
                            <Row>
                                <Col>{table_props.cell.value}</Col>
                                <div className="w-100 d-none d-md-block"/>
                                <Col><p className="text-secondary">{table_props.row.original.restaurant.address}</p></Col>
                            </Row>
                    },
                    {
                        Header: 'Matched Parameters',
                        accessor: 'params',
                        hideable: true,
                        disableFilters: true,
                        filter: 'fuzzyText',
                        disableSortBy: true,
                        width: 90,
                        Cell: table_props =>
                            <Col>
                                <ul>
                                    {table_props.cell.value.map(param => (
                                        <li key={param}>{param}</li>
                                    ))
                                    }
                                </ul>
                            </Col>
                    },
                    {
                        Header: 'Recommendation accuracy',
                        accessor: 'jaccard',
                        hideable: true,
                        disableFilters: true,
                        disableSortBy: true,
                        width: 90,
                        Cell: table_props =>
                            <Col>
                                <ul>
                                    <li key={table_props.cell.value}>{table_props.cell.value * 100} %</li>
                                </ul>
                            </Col>
                    }
                ],
            },
        ],
        []
    );

    const dispatch = useDispatch();
    const recommended = useSelector(state => state.restaurant.recommended);
    const recommendedFound = useSelector(state => state.restaurant.recommendedFound);
    const recommendedAreaCountry = useSelector(state => state.restaurant.recommendedAreaCountry);
    const restaurant_id = useSelector(state => state.restaurant.recommendedByRestaurantID);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let unmounted = false;
        setLoading(true);
        if (recommendedAreaCountry) {
            dispatch(getRestaurantRecommendationAllCountry({restaurant_id}))
                .unwrap()
                .then((response) => {
                    if (!unmounted) setLoading(false);
                })
                .catch((e) => {
                    if (!unmounted) {
                        setLoading(false);
                    }
                });
        } else {
            dispatch(getRestaurantRecommendationInCity({restaurant_id}))
                .unwrap()
                .then((response) => {
                    if (!unmounted) setLoading(false);
                })
                .catch((e) => {
                    if (!unmounted) {
                        setLoading(false);
                    }
                });
        }
        return () => {
            unmounted = true;
        }
    }, [restaurant_id]);
    return (
        <Row md={1}>
            {loading ? <Box sx={{ width: '100%' }}><LinearProgress />Searching restaurants...</Box>
                : recommendedFound ?
                    <RestaurantTable
                        data={recommended}
                        loading={loading}
                        columns={columns}
                    /> : <RecommendationNotFound/>}
        </Row>
    )
}