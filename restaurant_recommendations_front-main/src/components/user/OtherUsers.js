import * as React from 'react';
import UserInfo from "./UserInfo";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getSimilarUsers} from "../../slices/user";
import CircularProgress from '@mui/material/CircularProgress';
import {Row, Col} from "react-bootstrap";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";


export default function OtherUsers(param) {

    const dispatch = useDispatch();
    const similarUsers = useSelector(state => state.user.similarUsers);
    const [loading, setLoading] = useState(false);
    let counter = 1;
    useEffect(() => {
        let unmounted = false;
        setLoading(true);
        dispatch(getSimilarUsers({}))
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
        <>
            {loading ? <Box sx={{width: '100%'}}><LinearProgress/>Searching users...</Box> :  (
                <Row className="justify-content-md-center gap-md-5" key={counter}>
                    <h3 className="mt-5">Similar Users</h3>
                    {similarUsers.map((res, i) => {
                        counter += 1;
                        if (counter % 2 === 0) {
                            return (<>
                                <div className="w-100" key={res.username + counter}/>
                                <Col md={4}>
                                    <UserInfo
                                        key={res.similarUser}
                                        similarUser={res.similarUser}
                                        similarity={res.similarity}
                                        restaurantNames={res.restaurantNames}
                                    />
                                </Col>
                            </>)
                        }
                        return (<Col md={4}>
                            <UserInfo
                                key={res.similarUser}
                                similarUser={res.similarUser}
                                similarity={res.similarity}
                                restaurantNames={res.restaurantNames}
                            />
                        </Col>)
                    })}
                </Row>
            )}
        </>
    );
}