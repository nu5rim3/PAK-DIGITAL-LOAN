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
import { getGoldLoanDetails } from "services/loan.service";

const GoldLoanDetails = (props) => {

  const { appraisalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [goldLoanDetails, setGoldLoanDetails] = useState({});
  const [articleDetails, setArticleDetails] = useState([]);

  const [goldLoanAccn, setGoldLoanAccn] = useState(true);

  const handleGoldLoanAccn = () => {
    setGoldLoanAccn(!goldLoanAccn);
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
      if (props.active === "2") {
        const GoldLoanDetailsResponse = await getGoldLoanDetails(appraisalId);
        if (_isMounted && GoldLoanDetails != null) {
          setGoldLoanDetails(GoldLoanDetailsResponse);
          setArticleDetails(GoldLoanDetailsResponse?.goldLoanAppArticleDtlsDtoList)

          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      _isMounted = false;
    }
  }, []);

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
                        { collapsed: !goldLoanAccn }
                      )}
                      type="button"
                      onClick={handleGoldLoanAccn}
                      style={{ cursor: "pointer" }}
                    >
                      GOLD LOAN DETAILS
                    </button>
                  </h2>

                  <Collapse
                    isOpen={goldLoanAccn}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <div className="text-muted">
                          <table className="table">
                            <tbody>
                              <tr >
                                <td className="grid-text">TPP Number</td>
                                <td className="grid-text">{goldLoanDetails && goldLoanDetails.tppNumber}</td>
                              </tr>
                            </tbody>
                            <span style={{ margin: "20px" }}><h4>Goldsmith Details</h4></span>
                            <tbody>
                              <tr>
                                <td className="grid-text">Goldsmith Name</td>
                                <td>{goldLoanDetails && goldLoanDetails.goldsmithName}</td>
                              </tr>
                              <tr>
                                <td className="grid-text">Gross Weight</td>
                                <td>{goldLoanDetails && goldLoanDetails.goldGrossWeight}</td>
                              </tr>
                              <tr>
                                <td className="grid-text">Net Weight </td>
                                <td>{goldLoanDetails && goldLoanDetails.denNetWeight}</td>
                              </tr>
                              <tr>
                                <td className="grid-text">Gold Rate per Gram</td>
                                <td>{goldLoanDetails && goldLoanDetails.goldMarketValue}</td>
                              </tr>
                              <tr>
                                <td className="grid-text">Goldsmith Collateral Value</td>
                                <td>{goldLoanDetails && goldLoanDetails.goldCollateralValue}</td>
                              </tr>
                            </tbody>
                            <span style={{ margin: "20px" }}><h4>Dencimeter Details</h4></span>
                            <tbody>
                              <tr>
                                <td className="grid-text">Gross Weight</td>
                                <td>{goldLoanDetails && goldLoanDetails.denGrossWeight}</td>
                              </tr>
                              <tr>
                                <td className="grid-text">Net Weight</td>
                                <td>{goldLoanDetails && goldLoanDetails.denNetWeight}</td>
                              </tr>
                              <tr>
                                <td className="grid-text">Gold Rate per Gram</td>
                                <td>{goldLoanDetails && goldLoanDetails.denMarketValue}</td>
                              </tr>
                              <tr>
                                <td className="grid-text">Dencimeter Collateral Value</td>
                                <td>{goldLoanDetails && goldLoanDetails.denCollateralValue}</td>
                              </tr>
                            </tbody>
                            <span style={{ margin: "20px" }}><h4>Article Details</h4></span>
                            {articleDetails && articleDetails.map((item, index) => (
                              <tbody key={index}>
                                <tr>
                                  <td className="grid-text">Article Name</td>
                                  <td>{item && item.articleDtls}</td>
                                </tr>
                                <tr>
                                  <td className="grid-text">Quantity</td>
                                  <td>{item && item.articleQuantity}</td>
                                </tr>
                              </tbody>
                            ))}
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

GoldLoanDetails.propTypes = {
  active: PropTypes.string
};

export default GoldLoanDetails;