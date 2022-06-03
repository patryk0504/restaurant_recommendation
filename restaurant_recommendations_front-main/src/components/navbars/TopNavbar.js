import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EventBus from "../auth/EventBus";

export default function TopNavbar(props) {
    return (
        <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'
                style={{zIndex: '900', marginBottom: '10rem'}}>
            <Container>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className="me-auto">
                        {props.currentUser ? (
                            <>
                                <Navbar.Brand as={Link} to={"/restaurants"}>Polish Restaurants</Navbar.Brand>
                                <Nav.Link as={Link} to={"/profile"}>{props.currentUser.username}</Nav.Link>
                                <Nav.Link as={Link} to={"/restaurants"}>All Restaurants</Nav.Link>
                                <Nav.Link as={Link} to={"/restaurant/recommendation/users"}>Quick
                                    Recommendations</Nav.Link>
                                <Nav.Link as={Link} to={"/users"}>Users</Nav.Link>
                                {props.showAdminPage &&
                                <NavDropdown title="Admin Options" id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to={"/restaurant/add"}>
                                        Add Restaurant
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={"/restaurant/remove"}>
                                        Remove Restaurant
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item as={Link} to={"/administration/users"}>
                                        Users and Roles
                                    </NavDropdown.Item>
                                </NavDropdown>
                                }
                                <Nav.Link as={Link} to={"/login"} onClick={(e) => {
                                    EventBus.dispatch("logout");
                                }}>LogOut</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Navbar.Brand as={Link} to={"/home"}>Polish Restaurants</Navbar.Brand>
                                <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
                                <Nav.Link as={Link} to={"/register"}>Sign Up</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}