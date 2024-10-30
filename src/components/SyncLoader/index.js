import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"

import { Row } from "reactstrap"

import "./style.scss"

const Loader = props => {
  return (
    <>
      {props.loading && (
        <i className="loader-item fas fa-sync fa-spin text-white me-2" />
      )}
      {props.loading === false && (
        <div className="d-flex justify-content-center align-items-center">
          {props.children}
        </div>
      )}
    </>
  )
}

Loader.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
}

export default Loader
