import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import SelectLocation from "./SelectLocation";
import React from "react";
import SelectCuisines from "./SelectCuisines";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

export default function RestaurantProperties({step, setStep, cuisineId, setCuisineId, vegan, vegetarian, glutenFree, setGlutenFree, setVegan, setVegetarian}) {

    const Continue = e => {
        e.preventDefault();
        setStep(step + 1);
    }

    const Previous = e => {
        e.preventDefault();
        setStep(step - 1);
    }

    return <Container component="main" maxWidth="sm">
        <div>
            <Typography component="h1" variant="h5">
                Properties
            </Typography>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SelectCuisines setCuisineId={setCuisineId}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={vegetarian}
                                    onChange={(e)=>setVegetarian(e.target.checked)}
                                    inputProps={{'aria-label': 'controlled'}}
                                />} label="Vegetarian"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={vegan}
                                    onChange={(e)=>setVegan(e.target.checked)}
                                    inputProps={{'aria-label': 'controlled'}}
                                />} label="Vegan"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={glutenFree}
                                    onChange={(e)=>setGlutenFree(e.target.checked)}
                                    inputProps={{'aria-label': 'controlled'}}
                                />} label="Gluten Free"/>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            onClick={Previous}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Previous
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            onClick={Continue}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    </Container>
}