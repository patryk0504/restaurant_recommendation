import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getAllRatesWithComments} from "../../slices/user";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Button} from "react-bootstrap";
import ListSubheader from "@mui/material/ListSubheader";
import {FixedSizeList, ListChildComponentProps} from 'react-window';
import {green, red} from "@mui/material/colors";


export default function Comments({restaurantId}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const comments = useSelector(state => {
        return state.user.comments;
    });
    useEffect(() => {
        let unmounted = false;
        setLoading(true);
        dispatch(getAllRatesWithComments({restaurantId}))
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
    return <>
        {loading ? <CircularProgress/> :
            // console.log(comments);
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 400,
                    '& ul': {padding: 0},
                }}
                // sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                //   subheader={<ListSubheader>Comments</ListSubheader>}
                subheader={<li/>}
            >
                <ListSubheader>{`Comments section`}</ListSubheader>
                {comments && comments.map((comment, i) => (
                    <>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar sx={{bgcolor: green[500]}} aria-label="recipe">
                                    {comment.username[0]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={comment.username}
                                secondary={

                                    <Box
                                        sx={{
                                            '& > legend': {mt: 2},
                                        }}
                                        pb={3}
                                    >
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <Rating
                                                name="simple-controlled"
                                                value={comment.rate ? comment.rate : 0}
                                                readOnly
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                '& > legend': {mt: 2},
                                            }}
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Comment"
                                                multiline
                                                rows={3}
                                                defaultValue={comment.comment ? comment.comment : ""}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                variant="filled"

                                            />

                                        </Box>
                                    </Box>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </>))
                }
            </List>
        }
    </>
}