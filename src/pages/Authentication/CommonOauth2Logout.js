import MetaTags from "react-meta-tags"
import React, { useEffect } from "react"

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

//redux
import { useSelector } from "react-redux"

import { withRouter, Link } from "react-router-dom"

// import images
import profile from "assets/images/profile-img.jpg"
import loading from "assets/images/loading.gif"
import pkg from "../../../package.json"

const CommonOauth2Logout = () => {
  const { error } = useSelector(state => ({
    error: state.Login.error,
  }))

  useEffect(async () => {
    var _isMounted = true

    if (_isMounted) {
      window.location.replace(
        `${process.env.REACT_APP_IDENTITY_SERVER_URL}/commonauth?commonAuthLogout=true&type=oidc&commonAuthCallerPath=${process.env.REACT_APP_COMMON_OAUTH_URL}`
      )
    }

    return () => {
      _isMounted = false
    }
  }, [])

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
                    {error ? <Alert color="danger">{error}</Alert> : null}
                  </div>
                  <div className="d-grid">
                    <div className="mt-3 mb-5 text-center">
                      <img
                        src={loading}
                        style={{ width: "30%", height: "100%" }}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  © {new Date().getFullYear()} LOLC Technology Services Ltd.
                  <br></br>
                  version {pkg.version}
                  <br></br>
                  Design & Develop by Mobile Solutions
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(CommonOauth2Logout)
