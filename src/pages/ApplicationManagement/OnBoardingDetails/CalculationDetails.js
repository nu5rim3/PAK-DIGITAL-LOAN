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
    let formetedNumber = (Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let splitArray = formetedNumber.split('.');
    if (splitArray.length > 1) {
      formetedNumber = splitArray[0];
    }
    return (formetedNumber).concat(".00");
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

  const getRentalDetails = (items) => {
    let rentals = [];
    let i = 0;

    for (let item of items) {

      const row = (
        <tr key={i}>
          <td>{item.struSeq ? item.struSeq : "-"}</td>
          <td>{item.struPrds ? item.struPrds : "-"}</td>
          <td>{item.struRent ? item.struRent : "-"}</td>
        </tr>
      );
      i++;
      rentals.push(row);
    }


    return rentals;
  }


  return (
    <div>
      <Loader loading={isLoading}>

        <table className="table table-responsive">
          <tbody>
            <tr>
              <td className="align-middle grid-text">TC No</td>
              <td className="align-middle">{amountsOfTcDetails !== null && amountsOfTcDetails?.object?.tcNo}</td>
              <td className="align-middle grid-text">Loan Amount</td>
              <td className="align-middle">{amountsOfTcDetails !== null && formatNumber(amountsOfTcDetails?.object?.loanAmount)}</td>
            </tr>

            <tr>
              <td className="align-middle grid-text">Markup Value</td>
              <td className="align-middle">{tcDetails !== null && tcDetails?.pTrhdTr}</td>
              <td className="align-middle grid-text">Term</td>
              <td className="align-middle">{tcDetails !== null && tcDetails?.pTrhdTerm}</td>
            </tr>

            <tr>
              <td className="align-middle grid-text">Total Receivable</td>
              <td className="align-middle">{amountsOfTcDetails !== null && formatNumber(amountsOfTcDetails?.object?.totalReceivable)}</td>
              <td className="align-middle grid-text">Down Payment</td>
              <td className="align-middle">{amountsOfTcDetails !== null && formatNumber(amountsOfTcDetails?.object?.downPayment)}</td>
            </tr>

          </tbody>
        </table>



        <table className="table table-responsive">
          <thead>
            <tr>
              <th className="align-middle grid-text">Seq</th>
              <th className="align-middle grid-text">Months</th>
              <th className="align-middle grid-text">Amount</th>
            </tr>
          </thead>
          <tbody>
            {tcDetails != null && getRentalDetails(tcDetails?.pStru)}


            {/* {tcDetails != null && tcDetails?.pStru.map((str, index) => {
              return <tr key={index}>
                <td>{str.struSeq ? str.struSeq : "-"}</td>
                <td>{str.struPrds ? str.struPrds : "-"}</td>
                <td>{str.struRent ? str.struRent : "-"}</td>
              </tr>
            })} */}
          </tbody>
        </table>

      </Loader>
    </div>
  );
}





CalculationDetails.propTypes = {
  clientele: PropTypes.object,
};

export default CalculationDetails;