import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  CardTitle,
  Card,
  CardBody,
  CardText,
  Collapse,
  Table
} from "reactstrap";

import Loader from "components/Loader";

import classnames from "classnames";

import NumberFormat from "react-number-format";

// APIs
import {

} from "services/common.service";
import {
  getTcDetails,
} from "services/tc.service";
import {
  getIncomeExpenses,
} from "services/income-expenses.service";

const IncomeExpensesDetails = (props) => {

  const { appraisalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [tcDetails, setTcDetails] = useState({});
  const [incomeExpenses, setIncomeExpenses] = useState({});
  const [applicantRevenue, setApplicantRevenue] = useState([]);
  const [houseHoldContribution, setHouseHoldContribution] = useState([]);
  const [houseHoldExpenses, setHouseHoldExpenses] = useState([]);
  const [bnsOrAgriExpenses, setBnsOrAgriExpenses] = useState([]);

  const [revenueAccn, setRevenueAccn] = useState(true);
  const [houseHoldAccn, setHouseHoldAccn] = useState(true);
  const [revenueSummaryAccn, setRevenueSummaryAccn] = useState(true);
  const [expensesAccn, setExpensesAccn] = useState(true);
  const [expensesHouseHoldAccn, setExpensesHouseHoldAccn] = useState(true);
  const [businessAgriAccn, setBusinessAgriAccn] = useState(true);
  const [finalAccn, setFinalAccn] = useState(true);

  const handleRevenueAccn = () => {
    setRevenueAccn(!revenueAccn);
    setHouseHoldAccn(false);
    setRevenueSummaryAccn(false);
    setExpensesAccn(false);
    setExpensesHouseHoldAccn(false);
    setBusinessAgriAccn(false);
    setFinalAccn(false);
  };

  const handleHouseHoldAccn = () => {
    setHouseHoldAccn(!houseHoldAccn);
    setRevenueAccn(false);
    setRevenueSummaryAccn(false);
    setExpensesAccn(false);
    setExpensesHouseHoldAccn(false);
    setBusinessAgriAccn(false);
    setFinalAccn(false);
  };

  const handleRevenueSummaryAccn = () => {
    setRevenueSummaryAccn(!revenueSummaryAccn);
    setRevenueAccn(false);
    setHouseHoldAccn(false);
    setExpensesAccn(false);
    setExpensesHouseHoldAccn(false);
    setBusinessAgriAccn(false);
    setFinalAccn(false);
  };

  const handleExpensesAccn = () => {
    setExpensesAccn(!expensesAccn);
    setRevenueAccn(false);
    setHouseHoldAccn(false);
    setRevenueSummaryAccn(false);
    setExpensesHouseHoldAccn(false);
    setBusinessAgriAccn(false);
    setFinalAccn(false);
  };

  const handleExpensesHouseHoldAccn = () => {
    setExpensesHouseHoldAccn(!expensesHouseHoldAccn);
    setRevenueAccn(false);
    setHouseHoldAccn(false);
    setRevenueSummaryAccn(false);
    setExpensesAccn(false);
    setBusinessAgriAccn(false);
    setFinalAccn(false);
  };

  const handleBusinessAgriAccn = () => {
    setBusinessAgriAccn(!businessAgriAccn);
    setRevenueAccn(false);
    setHouseHoldAccn(false);
    setRevenueSummaryAccn(false);
    setExpensesAccn(false);
    setExpensesHouseHoldAccn(false);
    setFinalAccn(false);
  };

  const handleFinalAccn = () => {
    setFinalAccn(!finalAccn);
    setRevenueAccn(false);
    setHouseHoldAccn(false);
    setRevenueSummaryAccn(false);
    setExpensesAccn(false);
    setExpensesHouseHoldAccn(false);
    setBusinessAgriAccn(false);
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


        const tcDetails = await getTcDetails(appraisalId);
        if (_isMounted) {
          setTcDetails(tcDetails);
        }

        const incomeExpenses = await getIncomeExpenses(appraisalId);
        if (_isMounted) {
          setIncomeExpenses(incomeExpenses);
          setApplicantRevenue(incomeExpenses.applicantRevenue);
          setHouseHoldContribution(incomeExpenses.houseHoldContribution);
          setHouseHoldExpenses(incomeExpenses.houseHoldExpenses);
          setBnsOrAgriExpenses(incomeExpenses.bnsOrAgriExpenses);

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
                {applicantRevenue && applicantRevenue.length > 0 && <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !revenueAccn }
                      )}
                      type="button"
                      onClick={handleRevenueAccn}
                      style={{ cursor: "pointer" }}
                    >
                      APPLICANT REVENUE
                    </button>
                  </h2>

                  <Collapse
                    isOpen={revenueAccn}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>{"\u00A0"}</th>
                              <th>Monthly</th>
                              <th>Semi-Annually</th>
                              <th>Annually</th>
                            </tr>
                          </thead>
                          <tbody>
                            {applicantRevenue && applicantRevenue.map((item, index) => (
                              <tr key={index}>
                                <td>{item.key}</td>
                                <td>{format(item.monthly)}</td>
                                <td>{format(item.semiAnnual)}</td>
                                <td>{format(item.annually)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Row>
                    </div>
                  </Collapse>
                </div>}

                {houseHoldContribution && houseHoldContribution.length > 0 && <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !houseHoldAccn }
                      )}
                      type="button"
                      onClick={handleHouseHoldAccn}
                      style={{ cursor: "pointer" }}
                    >
                      HOUSEHOLD CONTRIBUTION
                    </button>
                  </h2>

                  <Collapse
                    isOpen={houseHoldAccn}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>{"\u00A0"}</th>
                              <th>Monthly</th>
                              <th>Semi-Annually</th>
                              <th>Annually</th>
                            </tr>
                          </thead>
                          <tbody>
                            {houseHoldContribution && houseHoldContribution.map((item, index) => (
                              <tr key={index}>
                                <td>{item.key}</td>
                                <td>{format(item.monthly)}</td>
                                <td>{format(item.semiAnnual)}</td>
                                <td>{format(item.annually)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Row>
                    </div>
                  </Collapse>
                </div>}

                {incomeExpenses && incomeExpenses !== undefined && <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !revenueSummaryAccn }
                      )}
                      type="button"
                      onClick={handleRevenueSummaryAccn}
                      style={{ cursor: "pointer" }}
                    >
                      REVENUE SUMMARY
                    </button>
                  </h2>

                  <Collapse
                    isOpen={revenueSummaryAccn}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Revenue Summary</th>
                              <th>Monthly</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Gross Salary/Pension Income</td>
                              <td>{incomeExpenses && incomeExpenses.grossSalaryIncome ? format(incomeExpenses.grossSalaryIncome) : "\u00A0"}</td>
                            </tr>
                            <tr>
                              <td>Total Business/Agri Income</td>
                              <td>{incomeExpenses && incomeExpenses.totBusinessIncome ? format(incomeExpenses.totBusinessIncome) : "\u00A0"}</td>
                            </tr>
                            <tr>
                              <td>Total Household Contribution</td>
                              <td>{incomeExpenses && incomeExpenses.totHouseholdIncome ? format(incomeExpenses.totHouseholdIncome) : "\u00A0"}</td>
                            </tr>
                            <tr className="bg-success text-white">
                              <td><b>Total Revenue</b></td>
                              <td><b>{incomeExpenses && incomeExpenses.totRevenue ? format(incomeExpenses.totRevenue) : "\u00A0"}</b></td>
                            </tr>
                          </tbody>
                        </table>
                      </Row>
                    </div>
                  </Collapse>
                </div>}

                {houseHoldExpenses && houseHoldExpenses.length > 0 && <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !expensesHouseHoldAccn }
                      )}
                      type="button"
                      onClick={handleExpensesHouseHoldAccn}
                      style={{ cursor: "pointer" }}
                    >
                      HOUSEHOLD EXPENSES
                    </button>
                  </h2>

                  <Collapse
                    isOpen={expensesHouseHoldAccn}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>{"\u00A0"}</th>
                              <th>Monthly</th>
                              <th>Semi-Annually</th>
                              <th>Annually</th>
                            </tr>
                          </thead>
                          <tbody>
                            {houseHoldExpenses && houseHoldExpenses.map((item, index) => (
                              <tr key={index}>
                                <td>{item.key}</td>
                                <td>{format(item.monthly)}</td>
                                <td>{format(item.semiAnnual)}</td>
                                <td>{format(item.annually)}</td>
                              </tr>
                            ))}
                            <tr className="bg-warning text-white">
                              <td><b>Total Household Expenses</b></td>
                              <td><b>{incomeExpenses && incomeExpenses.totHouseholdExpense ? format(incomeExpenses.totHouseholdExpense) : "\u00A0"}</b></td>
                              <td>{"\u00A0"}</td>
                              <td>{"\u00A0"}</td>
                            </tr>
                          </tbody>
                        </table>
                      </Row>
                    </div>
                  </Collapse>
                </div>}

                {bnsOrAgriExpenses && bnsOrAgriExpenses.length > 0 && <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !businessAgriAccn }
                      )}
                      type="button"
                      onClick={handleBusinessAgriAccn}
                      style={{ cursor: "pointer" }}
                    >
                      BUSINESS/AGRI EXPENSES
                    </button>
                  </h2>

                  <Collapse
                    isOpen={businessAgriAccn}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>{"\u00A0"}</th>
                              <th>Monthly</th>
                              <th>Semi-Annually</th>
                              <th>Annually</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bnsOrAgriExpenses && bnsOrAgriExpenses.map((item, index) => (
                              <tr key={index}>
                                <td>{item.key}</td>
                                <td>{format(item.monthly)}</td>
                                <td>{format(item.semiAnnual)}</td>
                                <td>{format(item.annually)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Row>
                    </div>
                  </Collapse>
                </div>}

                {incomeExpenses && incomeExpenses !== undefined && <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !expensesAccn }
                      )}
                      type="button"
                      onClick={handleExpensesAccn}
                      style={{ cursor: "pointer" }}
                    >
                      EXPENSES SUMMARY
                    </button>
                  </h2>

                  <Collapse
                    isOpen={expensesAccn}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Expenses Summary</th>
                              <th>Monthly</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Total Business/Agri Expenses</td>
                              <td>{incomeExpenses && incomeExpenses.totBusinessExpense ? format(incomeExpenses.totBusinessExpense) : "\u00A0"}</td>
                            </tr>
                            <tr className="bg-warning text-white">
                              <td><b>Total Expenses</b></td>
                              <td><b>{incomeExpenses && incomeExpenses.totExpense ? format(incomeExpenses.totExpense) : "\u00A0"}</b></td>
                            </tr>
                          </tbody>
                        </table>
                      </Row>
                    </div>
                  </Collapse>
                </div>}

                {incomeExpenses && incomeExpenses !== undefined && <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !finalAccn }
                      )}
                      type="button"
                      onClick={handleFinalAccn}
                      style={{ cursor: "pointer" }}
                    >
                      FINAL SUMMARY
                    </button>
                  </h2>

                  <Collapse
                    isOpen={finalAccn}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <table className="table">
                          <tbody>
                            <tr>
                              <td><b>Net Monthly Disposable Income</b></td>
                              <td><b>{incomeExpenses && incomeExpenses.netMonthlyDisposable ? format(incomeExpenses.netMonthlyDisposable) : "\u00A0"}</b></td>
                            </tr>
                            <tr>
                              <td><b>Taxable Amount</b></td>
                              <td><b>{incomeExpenses && incomeExpenses.taxableAmount ? format(incomeExpenses.taxableAmount) : "\u00A0"}</b></td>
                            </tr>
                            <tr>
                              <td><b>BE/BI</b></td>
                              <td><b>{incomeExpenses && incomeExpenses.beBiRate ? (incomeExpenses.beBiRate) : "\u00A0"}</b></td>
                            </tr>
                            <tr>
                              <td><b>Debt-Service Ration</b></td>
                              <td><b>{incomeExpenses && incomeExpenses.dscr ? format(incomeExpenses.dscr) : "\u00A0"}</b></td>
                            </tr>
                            <tr>
                              <td><b>Max Debt Burden</b></td>
                              <td><b>{incomeExpenses && incomeExpenses.maxDebtBurden ? format(incomeExpenses.maxDebtBurden) : "\u00A0"}</b></td>
                            </tr>
                            <tr>
                              <td><b>Tenure</b></td>
                              <td><b>{incomeExpenses && incomeExpenses.tenure ? (incomeExpenses.tenure) : "\u00A0"}</b></td>
                            </tr>
                            <tr>
                              <td><b>Max Loan Value</b></td>
                              <td><b>{incomeExpenses && incomeExpenses.maxLoanValue ? format(incomeExpenses.maxLoanValue) : "\u00A0"}</b></td>
                            </tr>
                            <tr>
                              <td><b>Annual household Income</b></td>
                              <td><b>{incomeExpenses && incomeExpenses.annualHouseIncome ? format(incomeExpenses.annualHouseIncome) : "\u00A0"}</b></td>
                            </tr>
                            <tr>
                              <td><b>Annual disposable Income</b></td>
                              <td><b>{incomeExpenses && incomeExpenses.annualDisposableIncome ? format(incomeExpenses.annualDisposableIncome) : "\u00A0"}</b></td>
                            </tr>
                            <tr className="bg-primary text-white">
                              <td><b>Status</b></td>
                              <td><b>Successful</b></td>
                            </tr>
                          </tbody>
                        </table>
                      </Row>
                    </div>
                  </Collapse>
                </div>}
              </div>
            </div>
          </div>
        </Col>
      </Loader>
    </Row>
  )
}

IncomeExpensesDetails.propTypes = {
  active: PropTypes.string,
};

export default IncomeExpensesDetails;