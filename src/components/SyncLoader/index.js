import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"

import { Row } from "reactstrap"

import "./style.scss"

const Loader = props => {
  return (
    <>
      {props.loading && (
        <Row style={{ marginRight: 5 }}>
          <div className="loader-container fa-1x">
            <i className="loader-item fas fa-sync fa-spin text-white" />
          </div>
        </Row>
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
