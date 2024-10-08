import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Row,
  Col,
} from "reactstrap";

import Loader from "components/Loader";

// APIs
import {
  getCustomerCreditScoreDetails,
} from "services/scoring.service";

const FinalSummary = (props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    var _isMounted = true;

    setIsLoading(true);

    const fetchData = async () => {
       
      if (props.product != "" && props.appraisalId != "") {
        const summaryResponse = await getCustomerCreditScoreDetails(props.product, props.appraisalId);
        if (_isMounted) {
          setSummary(summaryResponse);

          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    };
  }, [props.product]);

  return (
    <Row>
      <Loader loading={isLoading} >
        {summary && summary.totalCreditScore && <Col md={12} className="mt-3">
          <div className="border border-warning rounded text-center p-3">
            <p className="m-0 grid-text">Total Score Obtained</p>
          </div>

        </Col>}

        {summary && summary.totalCreditScore && <Col md={12} className="mt-3">
          <div className="border border-warning rounded text-center p-3">
            <p className="m-0 grid-text">{summary && summary.totalCreditScore ? summary.totalCreditScore : ""}</p>
          </div>

        </Col>}

        {summary && summary.riskLevel && <Col md={12} className="mt-3">
          <div className="border border-warning rounded text-center p-3">
            <p className="m-0 grid-text">{summary && summary.riskLevel ? summary.riskLevel : ""}</p>
          </div>

        </Col>}

        {summary && summary.loanAmount && <Col md={12} className="mt-3">
          <div className="border border-warning rounded text-center p-3">
            <p className="m-0 grid-text">Maximum loan Amount</p>
          </div>
        </Col>}

        {summary && summary.loanAmount && <Col md={12} className="mt-3">
          <div className="border border-warning rounded text-center p-3">
            <p className="m-0 grid-text">{summary && summary.loanAmount ? summary.loanAmount : ""}</p>
          </div>
        </Col>}
      </Loader>
    </Row>
  )
}

FinalSummary.propTypes = {
  product: PropTypes.string,
  appraisalId: PropTypes.string,
}

export default FinalSummary;