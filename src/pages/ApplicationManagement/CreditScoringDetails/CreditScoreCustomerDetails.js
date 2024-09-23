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

const CreditScoreCusDetails = (props) => {

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
                            <td><p className="m-0 grid-text">Gender</p></td>
                            <td><p className="m-0 text-center" >{customerDetails && customerDetails.gender ? customerDetails.gender.description : ""}</p></td>

                            <td><p className="m-0 grid-text">Other Source of Income</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.newOtherSourceOfIncome ? customerDetails.newOtherSourceOfIncome.description : ""}</p></td>
                        </tr>
                        <tr>
                            <td><p className="m-0 grid-text">Age</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.ageRange ? customerDetails.ageRange.description : ""}</p></td>

                            <td><p className="m-0 grid-text">Household Income Support</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.houseHoldSupport ? customerDetails.houseHoldSupport.description : ""}</p></td>
                        </tr>
                        <tr>
                            <td><p className="m-0 grid-text">Maritial Status</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.maritalStatus ? customerDetails.maritalStatus.description : ""}</p></td>

                            <td><p className="m-0 grid-text">Household Income Contribution Amount</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.houseHoldDetails ? customerDetails.houseHoldDetails.description : ""}</p></td>
                        </tr>
                        <tr>
                            <td><p className="m-0 grid-text">Family Members</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.dependents ? customerDetails.dependents.description : ""}</p></td>

                            <td><p className="m-0 grid-text">Current Residential place Status</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.currentResidence ? customerDetails.currentResidence.description : ""}</p></td>
                        </tr>
                        <tr>
                            <td><p className="m-0 grid-text">Gardian of Family</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.headOfFamily ? customerDetails.headOfFamily.description : ""}</p></td>

                            <td><p className="m-0 grid-text">Utility Bill Repayment Behaviour</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.utilityBill ? customerDetails.utilityBill.billName : ""}</p></td>
                        </tr>
                        <tr>
                            <td><p className="m-0 grid-text">Subjective Perception</p></td>
                            <td><p className="m-0 text-center">{customerDetails && customerDetails.subjectivePerception ? customerDetails.subjectivePerception.subPerName : ""}</p></td>
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

CreditScoreCusDetails.propTypes = {
    product: PropTypes.string,
    appraisalId: PropTypes.string,
}

export default CreditScoreCusDetails;