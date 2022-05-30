import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Row,
  Col,
} from "reactstrap";

import Loader from "components/Loader";

const ReportDetails = (props) => {

  const { appraisalId } = useParams();

  return (
    <Row>
      <Loader loading={false} >
        <Col lg={12}>
          <div className="page-wrapper-context">
            <div className="mt-4">
                <div className="d-flex justify-content-between">
                    <Link target="_blank" to={`/pakoman-digital-loan/credit-appraisals/documents/pro-note/reports/${appraisalId}`} className="btn btn-info btn"><i className="bx bxs-report font-size-16 align-middle me-2"></i>Pro Note Report Preview</Link>
                    <Link target="_blank" to={`/pakoman-digital-loan/credit-appraisals/documents/iqar-name/reports/${appraisalId}`} className="btn btn-info btn"><i className="bx bxs-report font-size-16 align-middle me-2"></i>Iqar Nama Report Preview</Link>
                    <Link target="_blank" to={`/pakoman-digital-loan/credit-appraisals/documents/land-verification/reports/${appraisalId}`} className="btn btn-info btn"><i className="bx bxs-report font-size-16 align-middle me-2"></i>Land Verification Report Preview</Link>
                </div>
            </div>
          </div>
        </Col>
      </Loader>
    </Row>
  )
}

ReportDetails.propTypes = {
  active: PropTypes.string,
};

export default ReportDetails;