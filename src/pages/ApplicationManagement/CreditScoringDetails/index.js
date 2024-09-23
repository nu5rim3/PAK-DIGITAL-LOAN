import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MetaTags from "react-meta-tags";
import {
  Row,
  Col,
  CardTitle,
  Card,
  CardBody,
  CardText,
  Collapse,
  Table,
  Container
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

import classnames from "classnames";

//Local Components
import CustomerDetails from "./CustomerDetails";
import SummaryDetails from "./SummaryDetails";
import GuarantorDetails from "./GuarantorDetails";
import FinalSummary from "./FinalSummary";
import Loader from "components/Loader";

//APIs
import {
  getTcDetails,
} from "services/tc.service"
import CreditScoreCusDetails from "./CreditScoreCustomerDetails";
import CreditScoreBusinessFacts from "./CreditScoreBusiness";
import SummaryBar from "./Summary";


const CreditScoringDetails = (props) => {

  const { appraisalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [tcDetails, setTcDetails] = useState({});

  const [customerAccn, setCustomerAccn] = useState(true);
  const [summaryAccn, setSummaryAccn] = useState(true);
  const [guarantorAccn, setGuarantorAccn] = useState(true);
  const [finalSummaryAccn, setFinalSummaryAccn] = useState(true);

  const handleCustomerAccn = () => {
    setCustomerAccn(!customerAccn);
    setSummaryAccn(false);
    setGuarantorAccn(false);
    setFinalSummaryAccn(false);
  };

  const handleSummaryAccn = () => {
    setSummaryAccn(!summaryAccn);
    setCustomerAccn(false);
    setGuarantorAccn(false);
    setFinalSummaryAccn(false);
  };

  const handleGuarantorAccn = () => {
    setGuarantorAccn(!guarantorAccn);
    setCustomerAccn(false);
    setSummaryAccn(false);
    setFinalSummaryAccn(false);
  };

  const handleFinalSummaryAccn = () => {
    setFinalSummaryAccn(!finalSummaryAccn);
    setCustomerAccn(false);
    setSummaryAccn(false);
    setGuarantorAccn(false);
  };

  useEffect(() => {
    var _isMounted = true;

    setIsLoading(true);

    const fetchData = async () => {
      if (props.active === "9") {
        const tcDetails = await getTcDetails(appraisalId);
        if (_isMounted && tcDetails !== undefined) {
          setTcDetails(tcDetails);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    };
  }, [props.active]);


  return (
    <Row>
      <Loader loading={isLoading} >
        <Col lg={12}>
          <div className="page-wrapper-context">
            <div className="mt-4">
              <div
                className="accordion accordion-flush"
                id="accordionCustomerDetails"
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !guarantorAccn }
                      )}
                      type="button"
                      onClick={handleGuarantorAccn}
                      style={{ cursor: "pointer" }}
                    >
                      FINAL CREDIT SCORING SUMMARY
                    </button>
                  </h2>

                  <Collapse
                    isOpen={guarantorAccn}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <SummaryBar product={tcDetails !== undefined ? tcDetails.pTrhdLType : ""} appraisalId={appraisalId} />
                    </div>
                  </Collapse>
                </div>

                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !customerAccn }
                      )}
                      type="button"
                      onClick={handleCustomerAccn}
                      style={{ cursor: "pointer" }}
                    >
                      INITIAL DETAILS OF CUSTOMER
                    </button>
                  </h2>

                  <Collapse
                    isOpen={customerAccn}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <CustomerDetails product={tcDetails !== undefined ? tcDetails.pTrhdLType : ""} appraisalId={appraisalId} />
                    </div>
                  </Collapse>
                </div>

                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !summaryAccn }
                      )}
                      type="button"
                      onClick={handleSummaryAccn}
                      style={{ cursor: "pointer" }}
                    >
                      CREDIT SCORES FOR CUSTOMER DETAILS
                    </button>
                  </h2>

                  <Collapse
                    isOpen={summaryAccn}
                    className="accordion-collapse"
                  >
                    {/* <div className="accordion-body">
                      <SummaryDetails product={tcDetails !== undefined ? tcDetails.pTrhdLType : ""} appraisalId={appraisalId} />
                    </div> */}
                    <div className="accordion-body">
                      <CreditScoreCusDetails product={tcDetails !== undefined ? tcDetails.pTrhdLType : ""} appraisalId={appraisalId} />
                    </div>
                  </Collapse>
                </div>

                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !guarantorAccn }
                      )}
                      type="button"
                      onClick={handleGuarantorAccn}
                      style={{ cursor: "pointer" }}
                    >
                      CREDIT SCORES FOR BUSINESS RELATED FACTS
                    </button>
                  </h2>

                  <Collapse
                    isOpen={guarantorAccn}
                    className="accordion-collapse"
                  >
                    {/* <div className="accordion-body">
                      <GuarantorDetails product={tcDetails !== undefined ? tcDetails.pTrhdLType : ""} appraisalId={appraisalId} />
                    </div> */}
                    <div className="accordion-body">
                      <CreditScoreBusinessFacts product={tcDetails !== undefined ? tcDetails.pTrhdLType : ""} appraisalId={appraisalId} />
                    </div>
                  </Collapse>
                </div>

                {/* <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !finalSummaryAccn }
                      )}
                      type="button"
                      onClick={handleFinalSummaryAccn}
                      style={{ cursor: "pointer" }}
                    >
                      FINAL DETAILS
                    </button>
                  </h2>

                  <Collapse
                    isOpen={finalSummaryAccn}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <FinalSummary product={tcDetails !== undefined ? tcDetails.pTrhdLType : ""} appraisalId={appraisalId} />
                    </div>
                  </Collapse>
                </div> */}
              </div>
            </div>
          </div>
        </Col>
      </Loader>
    </Row>
  );
}

CreditScoringDetails.propTypes = {
  active: PropTypes.string,
  match: PropTypes.any,
}

export default CreditScoringDetails;