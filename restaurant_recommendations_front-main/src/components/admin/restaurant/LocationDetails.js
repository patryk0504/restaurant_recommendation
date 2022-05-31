import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import SelectLocation from "./SelectLocation";
import React, {useCallback, useMemo, useRef, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";

export default function LocationDetails({position, setPosition, step, setStep}) {


    const Continue = e => {
        e.preventDefault();
        setStep(step + 1);
    }

    const Previous = e => {
        e.preventDefault();
        setStep(step - 1);
    }
    const center = {
        lat: 52.23,
        lng: 21.01,
    }

    // const [position, setPosition] = useState(center)

    function DraggableMarker({position, setPosition}) {
        const [draggable, setDraggable] = useState(true)
        // const [position, setPosition] = useState(center)
        const markerRef = useRef(null)
        const eventHandlers = useMemo(
            () => ({
                dragend() {
                    const marker = markerRef.current
                    if (marker != null) {
                        setPosition(marker.getLatLng())
                    }
                },
            }),
            [],
        )
        const toggleDraggable = useCallback(() => {
            setDraggable((d) => !d)
        }, [])

        return (
            <Marker
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={position ? position : center}
                ref={markerRef}>
                <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
        </span>
                </Popup>
            </Marker>
        )
    }

    return (
        <Container component="main" maxWidth="sm">
            <div>
                <Typography component="h1" variant="h5">
                    Location details
                </Typography>
                <form>
                    <Grid container spacing={2}>

                        {/* first name */}
                        <Grid item xs={12} sm={16}>
                            <MapContainer
                                center={[52.23, 21.01]}
                                zoom={16} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <DraggableMarker position={position} setPosition={setPosition}/>
                            </MapContainer>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                placeholder="Latitude"
                                label="Latitude"
                                // defaultValue={values.firstName}
                                value={position ? position.lat : ""}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        {/* last name */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                placeholder="Longitude"
                                label="Longitude"
                                value={position ? position.lng : ""}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
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
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}