import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import TableSelectDetailsFilter from "../table_filters/TableSelectDetailsFilter";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import {useDispatch, useSelector} from "react-redux";
import RestaurantTable from "../RestaurantTable";
import {getRestaurantRecommendationByUsers} from "../../../slices/restaurant";
import Rating from '@mui/material/Rating';
import RecommendationNotFound from "./RecommendationNotFound";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";


export default function RecommendationByUsers() {
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
                        Header: 'Users who likes it',
                        accessor: (row) => row.otherUsers,
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
                        Header: 'Average rating',
                        accessor: 'avgRating',
                        hideable: true,
                        disableFilters: true,
                        disableSortBy: true,
                        width: 90,
                        Cell: table_props =>
                            <Col>
                                <Rating
                                    name="simple-controlled"
                                    value={table_props.cell.value}
                                    readOnly
                                />
                            </Col>
                    }
                ],
            },
        ],
        []
    );


    const dispatch = useDispatch();
    const recommendedByUser = useSelector(state => state.restaurant.recommendedByUser);
    const recommendedFound = useSelector(state => state.restaurant.recommendedFound);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let unmounted = false;
        setLoading(true);
        dispatch(getRestaurantRecommendationByUsers({}))
            .unwrap()
            .then((response) => {
                if (!unmounted) setLoading(false);
            })
            .catch((e) => {
                if (!unmounted) {
                    setLoading(false);
                }
            });
        return () => {
            unmounted = true;
        }
    }, []);

    return (
        <Row md={1}>
            {loading ? <Box sx={{width: '100%'}}><LinearProgress/>Searching restaurants...</Box>
                : recommendedFound ?
                    <RestaurantTable
                        data={recommendedByUser}
                        loading={loading}
                        columns={columns}
                    /> : <RecommendationNotFound/>}
        </Row>
    )
}