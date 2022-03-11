import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Local Components
import Loader from "components/Loader";

// APIs
import {
  getTcDetails,
  getAmountsOfTcDetails,
} from "services/tc.service";

const CalculationDetails = (props) => {

  const { appraisalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [tcDetails, setTcDetails] = useState(null);
  const [amountsOfTcDetails, setAmountsOfTcDetails] = useState(null);

  const formatNumber = inputNumber => {
    let formetedNumber=(Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let splitArray=formetedNumber.split('.');
    if(splitArray.length>1){
      formetedNumber=splitArray[0];
    }
    return(formetedNumber).concat(".00");
  };

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const response = await getTcDetails(appraisalId);
      if (_isMounted && response !== undefined) {
        setTcDetails(response);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    };
  }, [props.clientele]);

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      if (tcDetails !== null && tcDetails !== undefined) {
        const response = await getAmountsOfTcDetails(tcDetails?.tcNo);
        if (_isMounted && response.code === "000") {
          setAmountsOfTcDetails(response);
        }
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    }
  }, [tcDetails]);

  return (
    <Loader loading={isLoading}>
      <table className="table table-responsive">
        <tbody>
          <tr>
            <td className="align-middle grid-text">TC No</td>
            <td className="align-middle">{amountsOfTcDetails !== null && amountsOfTcDetails?.object?.tcNo}</td>
          </tr>
          <tr>
            <td className="align-middle grid-text">Term</td>
            <td className="align-middle">{amountsOfTcDetails !== null && amountsOfTcDetails?.object?.facilityDetails[0]?.term}</td>
          </tr>
          <tr>
            <td className="align-middle grid-text">Loan Amount</td>
            <td className="align-middle">{amountsOfTcDetails !== null && formatNumber(amountsOfTcDetails?.object?.loanAmount)}</td>
          </tr>
          <tr>
            <td className="align-middle grid-text">Total Receivable</td>
            <td className="align-middle">{amountsOfTcDetails !== null && formatNumber(amountsOfTcDetails?.object?.totalReceivable)}</td>
          </tr>
          <tr>
            <td className="align-middle grid-text">Down Payment</td>
            <td className="align-middle">{amountsOfTcDetails !== null && formatNumber(amountsOfTcDetails?.object?.downPayment)}</td>
          </tr>
        </tbody>
      </table>
    </Loader>
  );
}

CalculationDetails.propTypes = {
  clientele: PropTypes.object,
};

export default CalculationDetails;