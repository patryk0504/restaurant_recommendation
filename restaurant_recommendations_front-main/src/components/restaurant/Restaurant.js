import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';


import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getComments, getRates, setComment, setRate} from "../../slices/user";
import {Button, ButtonGroup} from "react-bootstrap";
import {
    getRestaurantById, setRecommendedArea, setRestaurantId
} from "../../slices/restaurant";

import {useHistory} from "react-router-dom";

import vegan_icon from "../../assets/vegan_icon.jpg";
import vegetarian_icon from "../../assets/vegetarian_icon.png";
import gluten_icon from "../../assets/gluten_icon.jpg";
import natural_icon from "../../assets/natural_icon.png";
import TextField from "@mui/material/TextField";
import Comments from "./Comments";

const style = {
    position: 'absolute',
    top: '10%',
    left: '25%',
    // width: 900,
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


export default function Restaurant(props) {
    const history = useHistory();
    const rates = useSelector(state => {
        return state.user.rates;
    });
    const comment = useSelector(state => {
        return state.user.comment;
    });
    const restaurant = useSelector(state => {
        return state.restaurant.restaurant;
    });
    const dispatch = useDispatch();
    const [ratePicker, setRatePicker] = useState(null);
    const [commentField, setCommentField] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingCommentAndRate, setloadingCommentAndRate] = useState(false);
    const [showAllComments, setShowAllComments] = useState(false);
    const [addNewComment, setAddNewComment] = useState(false);


    const handleCityRecommendation = () => {
        const restaurantId = props.restaurantId;
        const area = false;
        dispatch(setRestaurantId({restaurantId}));
        dispatch(setRecommendedArea({area}));
        handleClose();
        history.push("/restaurant/recommendation");
    }

    const handleCountryRecommendation = () => {
        const restaurantId = props.restaurantId;
        const area = true;
        dispatch(setRestaurantId({restaurantId}));
        dispatch(setRecommendedArea({area}));
        handleClose();
        history.push("/restaurant/recommendation");
    }


    useEffect(() => {
        let unmounted = false;
        setLoading(true);
        const restaurantId = props.restaurantId;
        dispatch(getRestaurantById({restaurantId}))
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

    useEffect(() => {
        const restaurantId = props.restaurantId;
        dispatch(getRates({restaurantId}));
        dispatch(getComments({restaurantId}));
    }, [dispatch, loadingCommentAndRate]);

    useEffect(() => {
        let unmounted = false;
        const restaurantId = props.restaurantId;
        setloadingCommentAndRate(true);
        dispatch(getComments({restaurantId}))
            .unwrap()
            .then((response) => {
                setCommentField(comment.comment);
                if (!unmounted) setloadingCommentAndRate(false);
            })
            .catch((e) => {
                console.log(e);
                // setCommentField("error");
                if (!unmounted) {
                    setloadingCommentAndRate(false);
                }
            });
        return () => {
            unmounted = true;
        }

    }, [addNewComment]);

    useEffect(() => {
        if (ratePicker) {
            let unmounted = false;
            const restaurantId = props.restaurantId;
            const rating = ratePicker;
            setloadingCommentAndRate(true);
            dispatch(setRate({restaurantId, rating}))
                .unwrap()
                .then((response) => {
                    if (!unmounted) setloadingCommentAndRate(false);
                })
                .catch((e) => {
                    if (!unmounted) {
                        setloadingCommentAndRate(false);
                    }
                });
            return () => {
                unmounted = true;
            }
        }
    }, [ratePicker]);

    useEffect(() => {
        if (commentField) {
            let unmounted = false;
            const restaurantId = props.restaurantId;
            const comment = commentField;
            setloadingCommentAndRate(true);
            dispatch(setComment({restaurantId, comment}))
                .unwrap()
                .then((response) => {
                    if (!unmounted) {
                        setloadingCommentAndRate(false);
                        setAddNewComment(false);
                    }
                })
                .catch((e) => {
                    if (!unmounted) {
                        setloadingCommentAndRate(false);
                        setAddNewComment(false);
                    }
                });
            return () => {
                unmounted = true;
            }
        }
    }, [addNewComment]);

    const handleClose = () => props.setOpen(false);
    return (
        <div>
            {loading ?
                <div><CircularProgress/>Please wait, fetching data...</div>
                :
                <Modal
                    open={props.open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div
                            style={{
                                margin: 0,
                                height: '100%',
                                // paddingBottom: '40px',
                                background: 'white',
                                zIndex: "10",
                            }}
                        >
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                            {restaurant.name[0]}
                                        </Avatar>
                                    }
                                    title={restaurant.name}
                                    subheader={restaurant.address}
                                />

                                {showAllComments ?
                                    <Comments restaurantId={props.restaurantId}/> :
                                    <>
                                        <CardContent>
                                            More info: <Link
                                            to={{pathname: 'https://www.tripadvisor.com/' + restaurant.trip_advisor_id}}

                                            target="_blank"
                                            rel="noopener noreferrer">Trip Advisor</Link>
                                        </CardContent>
                                        <MapContainer
                                            center={[restaurant.address_latitude, restaurant.address_longitude]}
                                            zoom={16} scrollWheelZoom={false}>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker
                                                position={[restaurant.address_latitude, restaurant.address_longitude]}>

                                                <Popup>
                                                    Here is {restaurant.name}

                                                </Popup>
                                            </Marker>
                                        </MapContainer>
                                        <CardContent>
                                            <Box
                                                component="img"
                                                sx={{
                                                    height: 80,
                                                    width: 80,
                                                }}
                                                alt="natural"
                                                src={natural_icon}
                                            />

                                            {restaurant.vegan_options &&
                                            <Box
                                                component="img"
                                                sx={{
                                                    height: 80,
                                                    width: 80,
                                                }}
                                                alt="Veganfriendly"
                                                src={vegan_icon}
                                            />
                                            }

                                            {restaurant.vegetarian_friendly &&
                                            <Box
                                                component="img"
                                                sx={{
                                                    height: 80,
                                                    width: 80,
                                                }}
                                                alt="vegetarianfriendly"
                                                src={vegetarian_icon}
                                            />
                                            }

                                            {restaurant.gluten_free &&
                                            <Box
                                                component="img"
                                                sx={{
                                                    height: 80,
                                                    width: 80,
                                                }}
                                                alt="glutenfrendly"
                                                src={gluten_icon}
                                            />
                                            }
                                            <Typography variant="body2" color="text.secondary">
                                                {restaurant.popularity_detailed}

                                                <br/>
                                                {restaurant.popularity_generic}

                                                <br/>
                                                {restaurant.price_level && ("Price level (€-€€€): " + restaurant.price_level)}

                                            </Typography>
                                        </CardContent>
                                    </>
                                }


                                <CardActions disableSpacing>
                                    <Box
                                        sx={{
                                            '& > legend': {mt: 2},
                                        }}
                                    >
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                        >
                                            Rate:
                                            {loadingCommentAndRate ? <CircularProgress/> : (
                                                <Rating
                                                    name="simple-controlled"
                                                    value={rates ? rates.rating : 0}
                                                    onChange={(event, newValue) => {
                                                        setRatePicker(newValue);
                                                    }}
                                                />
                                            )}
                                        </Box>
                                        <Box
                                            sx={{
                                                '& > legend': {mt: 2},
                                            }}
                                            display="flex"
                                            alignItems="center"
                                        >

                                            {loadingCommentAndRate ? <CircularProgress/> :
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Leave a comment"
                                                    multiline
                                                    rows={3}
                                                    // defaultValue={comment.comment}
                                                    // value={commentField}
                                                    defaultValue={comment ? comment.comment : ""}
                                                    onChange={(event) => {
                                                        setCommentField(event.target.value);
                                                    }}
                                                    variant="filled"
                                                />
                                            }
                                        </Box>
                                        <Button onClick={(e) => {
                                            setAddNewComment(true);
                                        }}>
                                            Comment
                                        </Button>
                                    </Box>
                                    <ButtonGroup style={{marginLeft: "auto"}}>
                                        {showAllComments ?
                                            <Button onClick={() => setShowAllComments(false)} variant="secondary">
                                                Restaurant details
                                            </Button> :
                                            <Button onClick={() => setShowAllComments(true)} variant="secondary">
                                                All comments
                                            </Button>}
                                        {/*<Button onClick={() => setShowAllComments(true)} variant="secondary">*/}
                                        {/*    All comments*/}
                                        {/*</Button>*/}

                                        <Button onClick={handleCityRecommendation}>
                                            Recommendation in <br/>{restaurant.location.name}
                                        </Button>

                                        <Button onClick={handleCountryRecommendation} variant="secondary">
                                            Recommendation in <br/>Poland
                                        </Button>
                                    </ButtonGroup>
                                </CardActions>
                            </Card>
                        </div>
                    </Box>
                </Modal>
            }

        </div>
    );
}