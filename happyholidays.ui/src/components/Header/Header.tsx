import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { intHover, domHover, honHover } from "../../services/Slice/appSlice";

const Header: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const intState = useAppSelector(state => state.appSlice.expandInt);
    const domState = useAppSelector(state => state.appSlice.expandDom);
    const honState = useAppSelector(state => state.appSlice.expandHon);

    return (
        <Navbar expand="lg" className="custom_nav">
            <div className="container-fluid custom_container">
                <Navbar.Brand className="custom_link brand" href="#home">HappyHolidays</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="h-100">
                    <Nav className="ms-auto h-100 underline_animation">
                        <Nav.Link as={NavLink} className={location.pathname === "/" ? "custom_link active" : "custom_link"} to="/">HOME</Nav.Link>
                        <Dropdown show={domState}>
                            <Nav.Link as={NavLink} to="/domestic" className={location.pathname.startsWith("/domestic") ? "custom_link active" : "custom_link"}
                                onMouseOver={() => dispatch(domHover(true))}
                                onMouseOut={() => dispatch(domHover(false))}
                            >
                                DOMESTIC
                            </Nav.Link>
                            <Dropdown.Menu
                                show={domState}
                                onMouseOver={() => dispatch(domHover(true))}
                                onMouseOut={() => dispatch(domHover(false))}>
                                <Dropdown.Item href="#/action-1">ActionDom</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown show={intState}>
                            <Nav.Link as={NavLink} to="/international" className={location.pathname.startsWith("/international") ? "custom_link active" : "custom_link"}
                                onMouseOver={() => dispatch(intHover(true))}
                                onMouseOut={() => dispatch(intHover(false))}
                            >
                                INTERNATIONAL
                            </Nav.Link>
                            <Dropdown.Menu
                                show={intState}
                                onMouseOver={() => dispatch(intHover(true))}
                                onMouseOut={() => dispatch(intHover(false))}>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>        
                        <Dropdown show={honState}>
                            <Nav.Link as={NavLink} to="/honeymoon" className={location.pathname.startsWith("/honeymoon") ? "custom_link active" : "custom_link"}
                                onMouseOver={() => dispatch(honHover(true))}
                                onMouseOut={() => dispatch(honHover(false))}
                            >
                                HONEYMOON
                            </Nav.Link>
                            <Dropdown.Menu
                                show={honState}
                                onMouseOver={() => dispatch(honHover(true))}
                                onMouseOut={() => dispatch(honHover(false))}>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>                  
                        <Nav.Link as={NavLink} className={location.pathname.startsWith("/da") ? "custom_link active" : "custom_link"} to="/da">SERVICES</Nav.Link>
                        <Nav.Link as={NavLink} className={location.pathname.startsWith("/dc") ? "custom_link active" : "custom_link"} to="/dc">CONTACT</Nav.Link>
                        <Nav.Link as={NavLink} className={location.pathname.startsWith("/about-us") ? "custom_link active" : "custom_link"} to="/about-us">ABOUT US</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <div className="underline_animation"></div>
            </div>
        </Navbar>
    );
}

export default Header;