import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Row,
} from "reactstrap";

// APIs
import {
  getCustomerDetails,
  getSummaryDetails,
} from "services/scoring.service";

import Loader from "components/Loader";

const CustomerDetails = (props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    var _isMounted = true;

    setIsLoading(true);

    const fetchData = async () => {
      if (props.product != "" && props.appraisalId != "") {
        const customerResponse = await getCustomerDetails(props.product, props.appraisalId);
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
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td><p className="m-0 grid-text">Customer Name</p></td>
              <td><p className="m-0">{customerDetails && customerDetails.stkCusName ? customerDetails.stkCusName : ""}</p></td>
            </tr>
            <tr>
              <td><p className="m-0 grid-text">Customer CNIC</p></td>
              <td><p className="m-0">{customerDetails && customerDetails.stkCNic ? customerDetails.stkCNic : ""}</p></td>
            </tr>
            <tr>
              <td><p className="m-0 grid-text">Date of Birth</p></td>
              <td><p className="m-0">{customerDetails && customerDetails.stkDob ? customerDetails.stkDob : ""}</p></td>
            </tr>
            <tr>
              <td><p className="m-0 grid-text">Product</p></td>
              <td><p className="m-0">{customerDetails && customerDetails.prodName ? customerDetails.prodName : ""}</p></td>
            </tr>
            <tr>
              <td><p className="m-0 grid-text">Applied Loan Amount</p></td>
              <td><p className="m-0">{customerDetails && customerDetails.loanAmount ? customerDetails.loanAmount : ""}</p></td>
            </tr>
            <tr>
              <td><p className="m-0 grid-text">Loan Tenure</p></td>
              <td><p className="m-0">{customerDetails && customerDetails.loanTenure ? customerDetails.loanTenure : ""}</p></td>
              <td><p className="m-0">Months</p></td>
            </tr>
            <tr>
              <td><p className="m-0 grid-text">Branch/SC Approval Authority?</p></td>
              <td><p className="m-0">{summary && summary.approvalAuthority ? summary.approvalAuthority : ""}</p></td>
            </tr>
            <tr>
              <td><p className="m-0 grid-text">Loan Cycle</p></td>
              <td><p className="m-0">{summary && summary.loanCycle ? summary.loanCycle : ""}</p></td>
            </tr>
            <tr>
              <td><p className="m-0 grid-text">Branch</p></td>
              {/* TODO: Get details from the logged user */}
              {/* <td><p className="m-0">{customerDetails && customerDetails ? customerDetails : ""}</p></td> */}
            </tr>
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
            </tr>
          </tbody>
        </table>
      </div>
    </Loader>
  </Row>)
}

CustomerDetails.propTypes = {
  product: PropTypes.string,
  appraisalId: PropTypes.string,
}

export default CustomerDetails;