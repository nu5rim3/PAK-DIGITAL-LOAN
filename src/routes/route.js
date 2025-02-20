import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

// service
import { isTokenValid } from "services/auth.service"

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const authUser = localStorage.getItem("authUser")
      if (isAuthProtected) {
        if (!authUser || !isTokenValid()) {
          // 🚀 Auto Logout if token expired
          localStorage.removeItem("authUser")
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
          localStorage.removeItem("expires_at")

          return (
            <Redirect
              to={{
                pathname: "/pakoman-digital-loan/login",
                state: { from: props.location },
              }}
            />
          )
        }
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware
