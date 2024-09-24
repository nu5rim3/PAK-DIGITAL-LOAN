import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React from "react";

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";

import { withRouter, Link } from "react-router-dom";

// service
import { Authentication } from "services/auth.service";

// import images
import profile from "assets/images/profile-img.jpg";

const Login = props => {

  const service = Authentication();

  const submitLogin = async () => {
    if (service.getAccessToken() == null) {
      await service.authorize();
    }
  };

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Pakoman Digital Loan | Mobile Solutions - LOITS</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-white bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-dark">Welcome Back !</h5>
                        <p className="text-success">Playing On Success.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="text-center p-2">
                  </div>
                  <div className="text-center p-2">
                    <h5 className="text-dark m-5">Mobix Passport Authentication Manager</h5>
                  </div>
                  <div className="mt-3 d-grid">
                    <button
                      onClick={() => submitLogin()}
                      className="btn btn-success btn-block"
                      type="button"
                      style={{ borderColor: "#1abc86", color: "white" }}
                    >
                      Pakoman Corporate Login
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
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
