import React from "react";

import {Container, Typography, Grid, TextField, Button} from '@mui/material';
import SearchBar from "../../../searchbar/SearchBar";
import SelectLocation from "./SelectLocation";

export default function RestaurantDetails({step, setStep, name, setName, locationId, setLocationId, address, setAddress}) {

    const Continue = e => {
        e.preventDefault();
        setStep(step + 1);
    }

    const Previous = e => {
        e.preventDefault();
        setStep(step - 1);
    }

    return (
        <Container component="main" maxWidth="sm">
            <div>
                <Typography component="h1" variant="h5">
                    Add new restaurant
                </Typography>
                <form>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                placeholder="Restaurant Name"
                                label="Restaurant Name"
                                onChange={(e) => setName(e.target.value)}
                                defaultValue={name ? name : ""}
                                fullWidth
                            />
                        </Grid>

                        {/* country of residence */}
                        <Grid item xs={12}>
                            <SelectLocation
                                location={locationId}
                                setLocation={setLocationId}/>
                        </Grid>

                        {/* level of education */}
                        <Grid item xs={12}>
                            <TextField
                                placeholder="Street X, City XX-XXX Poland"
                                label="Address"
                                onChange={(e) => setAddress(e.target.value)}
                                defaultValue={address ? address : ""}
                                autoComplete="Address"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                onClick={Continue}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}