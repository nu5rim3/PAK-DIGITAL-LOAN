import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Collapse,
} from "reactstrap";

import classnames from "classnames";

import NumberFormat from "react-number-format";

import Loader from "components/Loader";

// APIs
import {
  getLiabilityDetails
} from "services/liability.service";

const LiabilityDetails = (props) => {

  const { appraisalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [liabilityDetails, setLiabilityDetails] = useState({});
  const [liabilities, setLiabilities] = useState([]);

  const [liabilityAccn, setLiabilityAccn] = useState(true);

  const handleLiabilityAccn = () => {
    setLiabilityAccn(!liabilityAccn);
  };

  const format = (value) => {
    return (
      <NumberFormat
        value={value}
        displayType={'text'}
        thousandSeparator={true}
        renderText={(value, props) => <p {...props}>{value}</p>}
      />
    );
  }

  useEffect(() => {
    var _isMounted = true;

    setIsLoading(true);

    const fetchData = async () => {
      if (props.active === "7") {
        const LiabilityResponse = await getLiabilityDetails(appraisalId);
        if (_isMounted) {
          setLiabilityDetails(LiabilityResponse);
          setLiabilities(LiabilityResponse.liabilities);

          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    }
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
                        { collapsed: !liabilityAccn }
                      )}
                      type="button"
                      onClick={handleLiabilityAccn}
                      style={{ cursor: "pointer" }}
                    >
                      LIABILITY DETAILS
                    </button>
                  </h2>

                  <Collapse
                    isOpen={liabilityAccn}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <div className="text-muted">
                          <table className="table">
                            {liabilities && liabilities.map((item, index) => (
                              <tbody key={index}>
                                <tr>
                                  <td className="grid-text">MFB/MFI/Bank/Other Financial institutions</td>
                                  <td>{item && item.institutionName}</td>
                                </tr>
                                <tr>
                                  <td className="grid-text">Nature of Loan</td>
                                  <td>{item && item.loanNature}</td>
                                </tr>
                                <tr>
                                  <td className="grid-text">Outstanding Amount</td>
                                  <td>{item && format(item.outstandingAmount)}</td>
                                </tr>
                              </tbody>
                            ))}
                            <tbody>
                              <tr className="bg-warning">
                                <td className="grid-text text-white">Total Outstanding Amount</td>
                                <td className="grid-text text-white">{liabilityDetails && liabilityDetails.totalAmount ? format(liabilityDetails.totalAmount) : "\u00A0"}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Row>
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Loader>
    </Row>
  );
}

LiabilityDetails.propTypes = {
  active: PropTypes.string
};

export default LiabilityDetails;