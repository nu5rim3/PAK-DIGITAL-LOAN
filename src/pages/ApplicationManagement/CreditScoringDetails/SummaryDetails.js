import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Row,
  Col,
} from "reactstrap";

// APIs
import {
  getCustomerDetails,
  getSummaryDetails,
} from "services/scoring.service";

import Loader from "components/Loader";

const SummaryDetails = (props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [customerDetails, setCustomerDetails] = useState({});
  const [summaryDetails, setSummaryDetails] = useState({});
  const [internalHistories, setInternalHistories] = useState([]);
  const [updatedInternalHistories, setUpdatedInternalHistories] = useState([]);
  const [externalHistories, setExternalHistories] = useState([]);

  const removeUnderscore = (str) => {
    
    if (Number.isInteger(str)) {
      return str;
    }
    return str.replace(/_/g, " ");
  }

  useEffect(() => {
    var _isMounted = true;

    setIsLoading(true);

    const fetchData = async () => {
      if (props.product != "" && props.appraisalId != "") {
        const customerResponse = await getCustomerDetails(props.product, props.appraisalId);
        const summaryResponse = await getSummaryDetails(props.appraisalId);
        if (_isMounted) {
          setCustomerDetails(customerResponse);
          if (customerResponse !== null && customerResponse?.internalCrib !== undefined) {
            setInternalHistories(customerResponse?.internalCrib?.history); 
          }
          setSummaryDetails(summaryResponse);
          if (summaryResponse !== null && summaryResponse?.internalHistory !== undefined) {
            setUpdatedInternalHistories(summaryResponse?.internalHistory);
            setExternalHistories(summaryResponse?.externalHistory);
          }

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
    <div className="row">
      <Loader loading={isLoading}>
        <Row>
          {summaryDetails && summaryDetails?.assetStockLabel && <Col md={12}>
            <div className="border border-success rounded text-center p-3">
              <p className="m-0 grid-text text-info">{summaryDetails && summaryDetails?.assetStockLabel ? summaryDetails?.assetStockLabel : ""}</p>
            </div>
          </Col>}

          {summaryDetails && summaryDetails?.exposureLimitLabel && <Col md={12} className="mt-3">
            <div className="border border-danger rounded text-center p-3">
              <p className="m-0 grid-text text-info">{summaryDetails && summaryDetails?.exposureLimitLabel ? summaryDetails?.exposureLimitLabel : ""}</p>
            </div>
          </Col>}

          {summaryDetails && summaryDetails?.eligibilityLabel && <Col md={4} className="mt-3">
            <div className="border border-success rounded text-center p-3">
              <p className="m-0 grid-text text-info">{summaryDetails && summaryDetails?.eligibilityLabel ? summaryDetails?.eligibilityLabel : ""}</p>
            </div>
          </Col>}

          {summaryDetails && summaryDetails?.eligibleLoanAmtLabel && <Col md={8} className="mt-3">
            <div className="border border-success rounded text-center p-3">
              <p className="m-0 grid-text text-info">{summaryDetails && summaryDetails?.eligibleLoanAmtLabel ? summaryDetails?.eligibleLoanAmtLabel : ""}</p>
            </div>
          </Col>}
        </Row>

        {internalHistories?.length > 0 && <div className="credit-histories m-5">
          <Row className="text-center">
            <h6 className="text-danger">Credit History of customer</h6>
          </Row>
          <Row>
            <table className="table table-bordered text-center mt-3">
              <thead>
                <tr>
                  {internalHistories && internalHistories?.length > 0 && internalHistories.map((item, index) => {
                    return updatedInternalHistories.map((item1, index1) => {
                      if (item?.creditLabel === item1.creditLabel) {
                        return <td key={index} className="grid-text"><p>{removeUnderscore(item1.creditLabel)}</p></td>
                      }
                    })
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {internalHistories && internalHistories?.length > 0 && internalHistories.map((item, index) => {
                    return updatedInternalHistories.map((item1, index1) => {
                      if (item?.creditLabel === item1.creditLabel) {
                        return <td key={index}><p>{item1.creditAmount}</p></td>
                      }
                    })
                  })}
                </tr>
              </tbody>
            </table>
          </Row>

          {summaryDetails && summaryDetails?.creditHistoryLabel && <Row className="mt-3">
            <Col md={12}>
              <div className="border border-warning rounded text-center p-3">
                <p className="m-0 grid-text">{summaryDetails && summaryDetails?.creditHistoryLabel ? summaryDetails?.creditHistoryLabel : ""}</p>
              </div>
            </Col>
          </Row>}
        </div>}

        {externalHistories?.length > 0 && <div className="credit-histories m-5">
          <Row className="text-center">
            <h6 className="text-danger">No of times account went into overdue by (ECIB)</h6>
          </Row>
          <Row>
            <table className="table table-bordered text-center mt-3">
              <thead>
                {externalHistories && externalHistories?.length > 0 && externalHistories?.map((item, index) => {
                  return <td key={index} className="grid-text"><p>{removeUnderscore(item?.creditLabel)}</p></td>
                })}
              </thead>
              <tbody>
                {externalHistories && externalHistories?.length > 0 && externalHistories?.map((item, index) => {
                  return <td key={index} className="grid-text"><p>{removeUnderscore(item?.creditAmount)}</p></td>
                })}
              </tbody>
            </table>
          </Row>

          {summaryDetails && summaryDetails?.ecibCreditHistoryLabel && <Row className="mt-3">
            <Col md={12}>
              <div className="border border-warning rounded text-center p-3">
                <p className="m-0 grid-text">{summaryDetails && summaryDetails?.ecibCreditHistoryLabel ? summaryDetails?.ecibCreditHistoryLabel : ""}</p>
              </div>
            </Col>
          </Row>}
        </div>}

        {summaryDetails?.equitableMortgage !== undefined && <div className="credit-histories m-5">
          <Row className="text-center">
            <h6 className="text-danger">Equitable Mortgage/Lien on Vehicles/TDRs</h6>
          </Row>
          {summaryDetails && summaryDetails?.equitableMortgage && <Row>
            <table className="table table-bordered text-center mt-3">
              <tbody>
                <tr>
                  <td><p>{summaryDetails && summaryDetails?.equitableMortgage ? summaryDetails?.equitableMortgage : ""}</p></td>
                </tr>
              </tbody>
            </table>
          </Row>}
          {/* TODO */}
          {summaryDetails && summaryDetails?.equitableMortgageLabel && <Row className="mt-3">
            <Col md={12}>
              <div className="border border-warning rounded text-center p-3">
                <p className="m-0 grid-text">{summaryDetails && summaryDetails?.equitableMortgageLabel ? summaryDetails?.equitableMortgageLabel : ""}</p>
              </div>
            </Col>
          </Row>}
        </div>}

        <Row className="mt-5">
          <table className="table table-borderless">
            <tbody>
              {customerDetails?.ageRange && <tr>
                <td><p className="m-0 grid-text">Age</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.ageRange != null ? customerDetails?.ageRange?.description : ""}</p></td>
              </tr>}
              {customerDetails?.healthConditions && <tr>
                <td><p className="m-0 grid-text">Health Condition</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.healthConditions != null ? customerDetails?.healthConditions?.description : ""}</p></td>
              </tr>}
              {customerDetails?.maritalStatus && <tr>
                <td><p className="m-0 grid-text">Marital Status</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.maritalStatus != null ? customerDetails?.maritalStatus?.description : ""}</p></td>
              </tr>}
              {customerDetails?.educationLevel && <tr>
                <td><p className="m-0 grid-text">Education</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.educationLevel != null ? customerDetails?.educationLevel?.description : ""}</p></td>
              </tr>}
              {customerDetails?.dependents && <tr>
                <td><p className="m-0 grid-text">No of Dependents</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.dependents != null ? customerDetails?.dependents?.description : ""}</p></td>
              </tr>}
              {customerDetails?.headOfFamily && <tr>
                <td><p className="m-0 grid-text">Head of Family</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.headOfFamily != null ? customerDetails?.headOfFamily?.description : ""}</p></td>
              </tr>}
              {customerDetails?.otherSourceOfIncome && <tr>
                <td><p className="m-0 grid-text">Other source of income customer (Part time work,Pension,Rent etc)</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.otherSourceOfIncome != null ? customerDetails?.otherSourceOfIncome?.description : ""}</p></td>
              </tr>}
              {customerDetails?.houseHoldDetails && <tr>
                <td><p className="m-0 grid-text">Household Contribution</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.houseHoldDetails != null ? customerDetails?.houseHoldDetails?.description : ""}</p></td>
              </tr>}
              {customerDetails?.currentPlaceOwnership && <tr>
                <td><p className="m-0 grid-text">Current Residence Place ownership with proof</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.currentPlaceOwnership != null ? customerDetails?.currentPlaceOwnership?.description : ""}</p></td>
              </tr>}
              {customerDetails?.ownershipOfResidence && <tr>
                <td><p className="m-0 grid-text">Land Ownership</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.ownershipOfResidence != null ? customerDetails?.ownershipOfResidence?.description : ""}</p></td>
              </tr>}
              {customerDetails?.monthlyDebtBurden && <tr>
                <td><p className="m-0 grid-text">Monthly Net Salary/Debt Burden</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.monthlyDebtBurden != null ? customerDetails?.monthlyDebtBurden?.monthlyDebtBurden : ""}</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.monthlyDebtBurden != null ? customerDetails?.monthlyDebtBurden?.description : ""}</p></td>
              </tr>}
              <tr>{/* TODO */}
                <td><p className="m-0 grid-text">Monthly debt burden/equity Value</p></td>
                {/* <td><p className="m-0">{customerDetails && customerDetails != null ? customerDetails : ""}</p></td> */}
                {/* <td><p className="m-0">{customerDetails && customerDetails != null ? customerDetails : ""}</p></td> */}
              </tr>
              {customerDetails?.fieldVerification && <tr>
                <td><p className="m-0 grid-text">Market Check through Field Verification</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.fieldVerification != null ? customerDetails?.fieldVerification?.description : ""}</p></td>
              </tr>}
              {customerDetails?.applicationDistance && <tr>
                <td><p className="m-0 grid-text">Residence or working place of applicant distance of branch / service center.</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.applicationDistance != null ? customerDetails?.applicationDistance?.description : ""}</p></td>
              </tr>}
              {customerDetails?.businessSector && <tr>
                <td><p className="m-0 grid-text">Business Sector</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.businessSector != null ? customerDetails?.businessSector?.description : ""}</p></td>
              </tr>}
              {customerDetails?.farmCultivationOwnership && <tr>
                <td><p className="m-0 grid-text">Farm Cultivation Ownership</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.farmCultivationOwnership != null ? customerDetails?.farmCultivationOwnership?.description : ""}</p></td>
              </tr>}
              {customerDetails?.proofOfSalaryInformation && <tr>
                <td><p className="m-0 grid-text">Salary information, Proof of Salary</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.proofOfSalaryInformation != null ? customerDetails?.proofOfSalaryInformation?.description : ""}</p></td>
              </tr>}
              {customerDetails?.noOfworkers && <tr>
                <td><p className="m-0 grid-text">Number of Workers</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.noOfworkers != null ? customerDetails?.noOfworkers?.description : ""}</p></td>
              </tr>}
              {customerDetails?.loanPurpose && <tr>
                <td><p className="m-0 grid-text">Purpose of Loan</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.loanPurpose != null ? customerDetails?.loanPurpose?.description : ""}</p></td>
              </tr>}
              {customerDetails?.ecibCustomerCreditHistory && <tr>
                <td><p className="m-0 grid-text">Credit History as per ECIB</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.ecibCustomerCreditHistory != null ? customerDetails?.ecibCustomerCreditHistory?.description : ""}</p></td>
              </tr>}
              {summaryDetails?.guarantorRelationship && <tr>
                <td><p className="m-0 grid-text">Relationship with guarantors</p></td>
                <td><p className="m-0">{summaryDetails && summaryDetails?.guarantorRelationship != null ? summaryDetails?.guarantorRelationship : ""}</p></td>
              </tr>}
              {customerDetails?.businessExperience && <tr>
                <td><p className="m-0 grid-text">Business Experience</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.businessExperience != null ? customerDetails?.businessExperience?.bnsName : ""}</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.businessExperience != null ? customerDetails?.businessExperience?.description : ""}</p></td>
              </tr>}
              {customerDetails?.irrigation && <tr>
                <td><p className="m-0 grid-text">Irrigation</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.irrigation != null ? customerDetails?.irrigation?.description : ""}</p></td>
              </tr>}
              {customerDetails?.agriMethod && <tr>
                <td><p className="m-0 grid-text">Methods use for Agriculture Machineries</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.agriMethod != null ? customerDetails?.agriMethod?.description : ""}</p></td>
              </tr>}
              {customerDetails?.repeatCustomer && <tr>
                <td><p className="m-0 grid-text">Repeat Customer</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.repeatCustomer != null ? customerDetails?.repeatCustomer?.description : ""}</p></td>
              </tr>}
              {customerDetails?.bnsRepeatCustomer && <tr>
                <td><p className="m-0 grid-text">Repeat Customer</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.bnsRepeatCustomer != null ? customerDetails?.bnsRepeatCustomer?.description : ""}</p></td>
              </tr>}
              {customerDetails?.customerWorkingStatus && <tr>
                <td><p className="m-0 grid-text">Customer working status in same organization</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.customerWorkingStatus != null ? customerDetails?.customerWorkingStatus?.description : ""}</p></td>
              </tr>}
              {customerDetails?.annualIncome && <tr>
                <td><p className="m-0 grid-text">Annual Income (net of all deductions) is up to Rs.1200,000</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.annualIncome != null ? customerDetails?.annualIncome?.description : ""}</p></td>
              </tr>}
              {summaryDetails?.modeOfSec && <tr>
                <td><p className="m-0 grid-text">Mode of Security</p></td>
                <td><p className="m-0">{summaryDetails != undefined && summaryDetails?.modeOfSec != null ? summaryDetails?.modeOfSec : ""}</p></td>
              </tr>}
              {summaryDetails?.modeOfSecGuarantee && <tr>
                <td><p className="m-0 grid-text">Mode of Security/Guarantee</p></td>
                <td><p className="m-0">{summaryDetails != undefined && summaryDetails?.modeOfSecGuarantee != null ? summaryDetails?.modeOfSecGuarantee : ""}</p></td>
              </tr>}
              <tr>{/* TODO: Experience in Cultivation */}
                <td><p className="m-0 grid-text">Experience in Cultivation</p></td>
                {/* <td><p className="m-0">{customerDetails && customerDetails != null ? customerDetails : ""}</p></td> */}
              </tr>
              {customerDetails?.businessPlaceOwnership && <tr>
                <td><p className="m-0 grid-text">Business place Ownership with Proof</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.businessPlaceOwnership != null ? customerDetails?.businessPlaceOwnership?.description : ""}</p></td>
              </tr>}
              {customerDetails?.proofOfCultivation && <tr>
                <td><p className="m-0 grid-text">Proof of Cultivation</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.proofOfCultivation != null ? customerDetails?.proofOfCultivation?.description : ""}</p></td>
              </tr>}
              {customerDetails?.businessCost && <tr>
                <td><p className="m-0 grid-text">Cost of Business Assets + stock</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.businessCost != null ? customerDetails?.businessCost?.bnsAssestScore : ""}</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.businessCost != null ? customerDetails?.businessCost?.description : ""}</p></td>
              </tr>}
              <tr>{/* TODO */}
                <td><p className="m-0 grid-text">Asset Value (Other than Land)</p></td>
                {/* <td><p className="m-0">{customerDetails && customerDetails != null ? customerDetails : ""}</p></td> */}
                {/* <td><p className="m-0">{customerDetails && customerDetails != null ? customerDetails : ""}</p></td> */}
              </tr>
              {customerDetails?.monthlyNetSaving && <tr>
                <td><p className="m-0 grid-text">Monthly net saving</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.monthlyNetSaving != null ? customerDetails?.monthlyNetSaving?.netsav : ""}</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.monthlyNetSaving != null ? customerDetails?.monthlyNetSaving?.description : ""}</p></td>
              </tr>}
              {customerDetails?.incomeGenerationTurnover && <tr>
                <td><p className="m-0 grid-text">Income Generation Turnover</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.incomeGenerationTurnover != null ? customerDetails?.incomeGenerationTurnover?.turnOver : ""}</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.incomeGenerationTurnover != null ? customerDetails?.incomeGenerationTurnover?.description : ""}</p></td>
              </tr>}
              {customerDetails?.floodsFactor && <tr>
                <td><p className="m-0 grid-text">Floods Factor</p></td>
                <td><p className="m-0">{customerDetails !== undefined && customerDetails?.floodsFactor != null ? customerDetails?.floodsFactor?.description : ""}</p></td>
              </tr>}
            </tbody>
          </table>
        </Row>
      </Loader>
    </div>)
}

SummaryDetails.propTypes = {
  product: PropTypes.string,
  appraisalId: PropTypes.string,
}

export default SummaryDetails;