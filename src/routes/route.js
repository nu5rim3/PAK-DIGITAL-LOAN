import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

// service
import { Authentication } from "services/auth.service";

const service = Authentication();

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthProtected && !localStorage.getItem("authUser")) {
        return (
          <Redirect
            to={{ pathname: "/pakoman-digital-loan/login", state: { from: props.location } }}
          />
        )
      } else {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }
    }}
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware;
