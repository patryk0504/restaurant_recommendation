import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import React, {useEffect, useState} from "react";
import CardContent from "@mui/material/CardContent";
import {makeStyles} from '@mui/styles';
import {Theme} from '@mui/material'
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {addAdminRole, cancelAdminRole} from "../../../slices/administration";
import {getComments} from "../../../slices/user";
import CircularProgress from "@mui/material/CircularProgress";

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    card: {
        maxWidth: 300,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    avatar: {
        display: "inline-block",
        border: "2px solid white",
        // "&:not(:first-of-type)": {
        //     marginLeft: theme.spacing.unit
        // }
    },
    fullHeightCard: {
        height: "100%",
    },
}));

export default function UserCard({id, username, roles}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [addRole, setAddRole] = useState(false);
    const [cancelRole, setCancelRole] = useState(false);

    useEffect(() => {
        if (addRole) {
            let unmounted = false;
            setLoading(true);
            dispatch(addAdminRole({username}))
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
    }, [addRole]);

    useEffect(() => {
        if (cancelRole) {
            let unmounted = false;
            setLoading(true);
            dispatch(cancelAdminRole({username}))
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
    }, [cancelRole]);

    return <>
        {loading ? <div><CircularProgress/>Please wait, fetching data...</div> :
                <Card className={classes.fullHeightCard}
                      style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        height="200"
                        width={200}
                        image={"https://robohash.org/${" + username + "}?200x200&set=set4"}
                        alt="profile image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <ul>
                                {roles.map((role, i) => {
                                    return <li key={i}>{role.role}</li>
                                })}
                            </ul>
                        </Typography>
                    </CardContent>
                    {
                        roles.some(role => role.role === 'ROLE_ADMIN') ?
                            <CardActions>
                                <Button size="small" onClick={(e) => {
                                    setCancelRole(true);
                                }}>Remove Admin role</Button>
                            </CardActions>
                            : <CardActions>
                                <Button size="small" onClick={(e) => {
                                    setAddRole(true);
                                }}>Add Admin role</Button>
                            </CardActions>
                    }
                </Card>
        }
    </>
}