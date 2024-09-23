import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import './UserRolePage.css'

import { Row, Col, CardBody, Card, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { withRouter, Link } from "react-router-dom";

// import images
import profile from "assets/images/profile-img.jpg";

import { autherizationContextHandler } from "store/auth/login/actions"

const UserRoleSelecter = (props) => {

    const [roles, setRoles] = useState([null]);
    const [roleType, setRoleType] = useState();
    const [modal, showModal] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        var _isMounted = true;

        if (_isMounted && props.location.state !== undefined) {
            const userRolesResponce = props.location.state.userResponse?.roles;
            setRoles(userRolesResponce);
        }

        return () => {
            _isMounted = false;
        }
    }

    ), [];

    const submitLoginRole = () => {
        var checked_role = document.querySelector('input[name = "radio"]:checked');

        if (checked_role != null) {
            dispatch(autherizationContextHandler(props.location.state.userResponse, roleType))
        } else {
            closeModel();
        }
    }

    const closeModel = () => {
        showModal(!modal)
    }

    const renderRoleCard = () => {

        var cardRoleList = [];

        const userRoles = roles.map((item) => {
            return { role: item?.description, code: item?.code }
        });

        for (var i = 0; i < userRoles.length; i++) {
            var card = <label key={i} className="custom-radio">
                <input type="radio" name="radio"
                    value={userRoles[i].code}
                    onChange={e => setRoleType(e.target.value)}
                />
                <span className="radio-btn"><i className="las la-check"></i>
                    <div className="user-icon">
                        <h3>{userRoles[i].role}</h3>
                    </div>
                </span>
            </label>

            cardRoleList.push(card);
        }

        return cardRoleList;
    }

    return (
        <React.Fragment>
            <MetaTags>
                <title>User Role | Pakoman Digital Loan | Mobile Solutions - LOITS</title>
            </MetaTags>
            <div className="home-btn d-none d-sm-block">
                <Link to="/" className="text-dark">
                    <i className="fas fa-home h2" />
                </Link>
            </div>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={10} xl={7} >
                            <Card className="overflow-hidden" >
                                <div className="bg-white bg-soft">
                                    <Row>
                                        <Col xs={8}>
                                            <div className="text-primary p-4">
                                                <h3 className="text-dark">Welcome Back !</h3>
                                                <p className="text-success">Playing On Success.</p>
                                            </div>
                                        </Col>
                                        <Col className="col-4 align-self-end">
                                            <img src={profile} alt="" className="img-fluid" />
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    <div className="text-center p-3" >
                                        <h3>Select Your Role</h3>
                                    </div>
                                    <div className="button-container">
                                        <div className="radio-buttons">
                                            {renderRoleCard()}
                                        </div>
                                    </div>

                                    <div className="mt-3 d-grid">
                                        <button
                                            onClick={() => submitLoginRole()}
                                            className="btn btn-block" style={{ backgroundColor: "#1abc86", color: "#ffffff" }}
                                            type="button"
                                        >
                                            Proceed Login
                                        </button>
                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>
                                    © {new Date().getFullYear()} LOLC Technology Services Ltd.
                                    <br></br>
                                    Crafted with{" "}
                                    <i className="mdi mdi-heart text-danger" /> by Mobile Solutions.
                                </p>
                            </div>
                        </Col>
                        <Modal isOpen={modal} toggle={closeModel} >
                            <ModalHeader toggle={closeModel}>User Role Error!</ModalHeader>
                            <ModalBody>
                                <span><h5 style={{ color: "red" }}>Please Select a Role to Proceed.</h5></span>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" onClick={closeModel}>
                                    <h5 style={{ color: "white" }}>Okay</h5>
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

UserRoleSelecter.propTypes = {
    location: PropTypes.any,
    history: PropTypes.object,

}

export default withRouter(UserRoleSelecter);
