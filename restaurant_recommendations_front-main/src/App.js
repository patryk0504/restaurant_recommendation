import React, {useEffect, useCallback, useState} from 'react';
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import TopNavbar from "./components/navbars/TopNavbar";
import {history} from "./app/history";
import EventBus from "./components/auth/EventBus";
import {logout} from "./slices/auth";
import {clearMessage} from "./slices/message";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard";
import RecommendationByRestaurant from "./components/restaurant/recommendation/RecommendationByRestaurant";
import RecommendationByUsers from "./components/restaurant/recommendation/RecommendationByUsers";
import OtherUsers from "./components/user/OtherUsers";
import Home from "./components/Home";
import AddRestaurant from "./components/admin/restaurant/add/AddRestaurant";
import UserCardList from "./components/admin/user/UserCardList";
import RemoveRestaurant from "./components/admin/restaurant/remove/RemoveRestaurant";

function App() {

    const {user: currentUser, isLoggedIn} = useSelector((state => state.auth));
    const dispatch = useDispatch();
    const [showAdminPage, setShowAdminPage] = useState(false);

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        history.listen(() => {
            dispatch(clearMessage()); // clear message when changing location
        });
        EventBus.on("logout", () => {
            logOut();
            history.push('/login');
        });
        return () => {
            EventBus.remove("logout");
        };
    }, [currentUser, logOut]);

    useEffect(()=>{
        if(currentUser){
            currentUser.roles.forEach(role => {
                if(role.authority == "ROLE_ADMIN"){
                    setShowAdminPage(true);
                }
            })
        }
    }, [currentUser])

    return (
        <Router history={history}>
            <div>
                <TopNavbar currentUser={currentUser} logOut={logOut} showAdminPage={showAdminPage}/>
                <div className="container mt-5">
                    {!currentUser && <Redirect to='/login'/>}
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/restaurants" component={Dashboard}/>
                        <Route exact path="/restaurant/recommendation" component={RecommendationByRestaurant}/>
                        <Route exact path="/restaurant/recommendation/users" component={RecommendationByUsers}/>
                        <Route exact path="/users" component={OtherUsers}/>
                        <Route exact path="/restaurant/add" component={AddRestaurant}/>
                        <Route exact path="/restaurant/remove" component={RemoveRestaurant}/>
                        <Route exact path="/administration/users" component={UserCardList}/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
