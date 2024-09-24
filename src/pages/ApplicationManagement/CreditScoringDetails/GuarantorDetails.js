import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Row,
} from "reactstrap";

// APIs
import {
  getGuarantorDetails,
} from "services/scoring.service";

import Loader from "components/Loader";

const GuarantorDetails = (props) => {

  const [isLoading, setIsLoading] = useState(true);

  const [guarantorDetails, setGuarantorDetails] = useState([]);

  useEffect(() => {
    var _isMounted = true;

    setIsLoading(true);

    const fetchData = async () => {
      if (props.product != "" && props.appraisalId != "") {
        const guarantorResponse = await getGuarantorDetails(props.product, props.appraisalId);
        if (_isMounted) {
          setGuarantorDetails(guarantorResponse);

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
      <Loader loading={isLoading} >
        {guarantorDetails?.length > 0 && guarantorDetails?.map((guarantor, index) => (
          <div className="guarantor-details" key={index}>
            <Row>
              <table className="table border border-warning mt-3">
                <tbody>
                  <tr>
                    <td>
                      <p className="grid-text m-0">Guarantor 0{index + 1}</p>
                    </td>
                    <td>
                      <p className="grid-text m-0">{guarantor && guarantor?.stkCusName !== undefined && guarantor?.stkCusName}</p>
                    </td>
                    <td>
                      <p className="grid-text m-0">{guarantor && guarantor?.stkCNic !== undefined && guarantor?.stkCNic}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Row>

            <Row className="mt-3 mb-3">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td><p className="m-0 grid-text">Age</p></td>
                    <td><p className="m-0">{guarantor && guarantor?.ageRange !== undefined && guarantor?.ageRange?.description}</p></td>
                  </tr>
                  <tr>
                    <td><p className="m-0 grid-text">Current Residence Place</p></td>
                    <td><p className="m-0">{guarantor && guarantor?.currentResidence !== undefined && guarantor?.currentResidence?.description}</p></td>
                  </tr>
                  <tr>
                    <td><p className="m-0 grid-text">Mode of Security/Guarantee</p></td>
                    <td><p className="m-0">{guarantor && guarantor?.modeOfSecGuarantee !== undefined && guarantor?.modeOfSecGuarantee?.description}</p></td>
                  </tr>
                  <tr>
                    <td><p className="m-0 grid-text">Pakoman Customer/Credit History ( ECIB)</p></td>
                    <td><p className="m-0">{guarantor && guarantor?.ecibCustomerCreditHistory !== undefined && guarantor?.ecibCustomerCreditHistory?.description}</p></td>
                  </tr>
                  <tr>
                    <td><p className="m-0 grid-text">Outstanding loans</p></td>
                    <td><p className="m-0">{guarantor && guarantor?.outStandingLoan !== undefined && guarantor?.outStandingLoan?.description}</p></td>
                  </tr>
                </tbody>
              </table>
            </Row>
          </div>
        ))}
      </Loader>
    </div>)
}

GuarantorDetails.propTypes = {
  product: PropTypes.string,
  appraisalId: PropTypes.string,
}

export default GuarantorDetails;