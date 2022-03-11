import React from "react"
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Collapse
} from "reactstrap"

import classnames from "classnames";

const AccordionBody = (props) => {
  return (
    <Row>
      <Col lg={12}>
        <div className="appraisal-accordion-body mt-4">
          <div className="accordion accordion-flush">
            <div className="accordion-item">
              <h2 className="accordion-header appraisal-section-header">
                <button
                  className={classnames(
                    "accordion-button",
                    "fw-medium",
                    { collapsed: true }
                  )}
                  type="button"
                  // onClick={handleRevenueAccn}
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-white p-0 m-0">
                    {props.title}
                  </p>
                </button>
              </h2>

              <Collapse
                isOpen={true}
                className="accordion-collapse"
              >
                <div className="accordion-body">
                    {props.children}
                </div>
              </Collapse>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

AccordionBody.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default AccordionBody;