import RestaurantTable from "./restaurant/RestaurantTable";
import {Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import SearchBar from "./searchbar/SearchBar";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import restaurant_image from "../assets/restaurant_image.jpg";

export default function Dashboard(props) {
    const restaurants = useSelector(state => state.restaurant.restaurants);
    const [loading, setLoading] = useState(false);

    return (
        <Row md={1}>
            {/*<h4>Search restaurants</h4>*/}
            <SearchBar/>
            {restaurants && restaurants.length ?
                <RestaurantTable
                    data={restaurants}
                    loading={loading}
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
    )
}