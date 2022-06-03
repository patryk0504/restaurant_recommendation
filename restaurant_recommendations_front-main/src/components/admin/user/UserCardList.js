import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getComments, getRates} from "../../../slices/user";
import {getAllUsers} from "../../../slices/administration";
import UserCard from "./UserCard";
import Grid from "@mui/material/Grid";

export default function UserCardList() {
    const users = useSelector(state => {
        return state.administration.users;
    });

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers({}));
    }, []);

    return <>
        <Grid container spacing={1}>
            {users && users.map((user, i) => {
                return <Grid item xs>
                    <UserCard username={user.username} roles={user.roles} id={user.id}/>
                </Grid>
            })}
        </Grid>
    </>
}