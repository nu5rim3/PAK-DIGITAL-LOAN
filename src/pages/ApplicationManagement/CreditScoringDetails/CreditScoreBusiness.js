import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
    Row,
    Table
} from "reactstrap";

// APIs
import {
   getCustomerCreditScoreDetails,
    getSummaryDetails,
} from "services/scoring.service";

import Loader from "components/Loader";

const CreditScoreBusinessFacts = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [customerDetails, setCustomerDetails] = useState(null);
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        var _isMounted = true;

        setIsLoading(true);

        const fetchData = async () => {
            if (props.product != "" && props.appraisalId != "") {
                const customerResponse = await getCustomerCreditScoreDetails(props.product, props.appraisalId);
                const summaryResponse = await getSummaryDetails(props.appraisalId);
                if (_isMounted) {
                    setCustomerDetails(customerResponse);
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


    return (<Row>
        <Loader loading={isLoading} >
            <div className="text-muted d-flex">
                <Table bordered>
                    <thead>
                        <tr className="text-center">
                            <th>PARTICULARS</th>
                            <th>SCORE</th>
                            <th>PARTICULARS</th>
                            <th>SCORE</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td><p className="m-0 grid-text">Income Source of Customer</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.sourceOfIncome ? customerDetails.sourceOfIncome.description : ""}</p></td>

                            <td><p className="m-0 grid-text">Business Place Status</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.businessPlaceOwnership ? customerDetails.businessPlaceOwnership.description : ""}</p></td>
                        </tr>
                        <tr>
                            <td><p className="m-0 grid-text">Monthly Net Saving/Salary</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.monthlyNetSaving ? customerDetails.monthlyNetSaving.description : ""}</p></td>

                            <td><p className="m-0 grid-text">If Salary Person, (Current Job Status)</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.currentJobStatus ? customerDetails.currentJobStatus.description : ""}</p></td>
                        </tr>
                        <tr>
                            <td><p className="m-0 grid-text">Experience Business/Works (Years)  </p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.businessExperience ? customerDetails.businessExperience.description : ""}</p></td>

                            <td><p className="m-0 grid-text">Outstanding Loan Taken From Any MFIs</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.outStandingLoan ? customerDetails.outStandingLoan.description : ""}</p></td>
                        </tr>
                        <tr>
                            <td><p className="m-0 grid-text">Value of Business Asset and Stock</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.businessCost ? customerDetails.businessCost.description : ""}</p></td>

                            <td><p className="m-0 grid-text">Maximum days in arrears  of taken loans  </p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.loanArrears ? customerDetails.loanArrears.loanArrearsName : ""}</p></td>
                        </tr>
                        <tr>
                            <td><p className="m-0 grid-text">Business Ownership</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.businessOwner ? customerDetails.businessOwner.description : ""}</p></td>

                            <td><p className="m-0 grid-text">Days in arrears in previous LOLC loans</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.repeatCustomer ? customerDetails.repeatCustomer.description : ""}</p></td>
                        </tr>
                        <tr>
                            <td><p className="m-0 grid-text">Geographic Location</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.geoLocation ? customerDetails.geoLocation.locationName : ""}</p></td>
                        </tr>
                        {/* <tr>
              <td><p className="m-0 grid-text">Applied Loan Amount</p></td>
              <td><p className="m-0">{customerDetails && customerDetails.loanAmount ? customerDetails.loanAmount : ""}</p></td>
            </tr>
            <tr>
              <td><p className="m-0 grid-text">Loan Tenure</p></td>
              <td><p className="m-0">{customerDetails && customerDetails.loanTenure ? customerDetails.loanTenure : ""}</p></td>
              <td><p className="m-0">Months</p></td>
            </tr> */}
                        {/* <tr>
              <td><p className="m-0 grid-text">Branch/SC Approval Authority?</p></td>
              <td><p className="m-0">{summary && summary.approvalAuthority ? summary.approvalAuthority : ""}</p></td>
            </tr>
            <tr>
              <td><p className="m-0 grid-text">Loan Cycle</p></td>
              <td><p className="m-0">{summary && summary.loanCycle ? summary.loanCycle : ""}</p></td>
            </tr>
            <tr>
              <td><p className="m-0 grid-text">Branch</p></td> */}
                        {/* TODO: Get details from the logged user */}
                        {/* <td><p className="m-0">{customerDetails && customerDetails ? customerDetails : ""}</p></td> */}
                        {/* </tr>
            <tr>
              <td><p className="m-0 grid-text">Net Savings Amount/ Net Salary Amount</p></td>
              <td><p className="m-0">{customerDetails && customerDetails.netSalary ? customerDetails.netSalary : ""}</p></td>
            </tr>
            <tr>
              <td><p className="m-0 grid-text">Business Assets/Stock Amount</p></td>
              <td><p className="m-0">{customerDetails && customerDetails.bnsStockAmount ? customerDetails.bnsStockAmount : ""}</p></td>
            </tr>
            <tr>
              <td><p className="m-0 grid-text">O/S balance ( ECIB)</p></td>
              <td><p className="m-0">{customerDetails && customerDetails.balanceOS ? customerDetails.balanceOS : ""}</p></td>
            </tr> */}
                    </tbody>
                </Table>
            </div>
        </Loader>
    </Row>)
}

CreditScoreBusinessFacts.propTypes = {
    product: PropTypes.string,
    appraisalId: PropTypes.string,
}

export default CreditScoreBusinessFacts;