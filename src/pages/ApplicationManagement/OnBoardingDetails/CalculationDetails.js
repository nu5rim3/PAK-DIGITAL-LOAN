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
        if (_isMounted && response?.code === "000") {
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
          <td>{item.seq ? item.seq : "-"}</td>
          <td>{item.term ? item.term : "-"}</td>
          <td>{item.instalment ? formatNumber(item.instalment) : "-"}</td>
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
            {tcDetails != null && tcDetails?.pTrhdMethod === 'F' && amountsOfTcDetails != null && amountsOfTcDetails?.object?.facilityDetails.length > 0 && <tr>
              <td className="align-middle grid-text">Rental Amount</td>
              <td className="align-middle">{amountsOfTcDetails !== null && formatNumber(amountsOfTcDetails?.object?.facilityDetails[0]?.instalment)}</td>
            </tr>
            }
            {tcDetails != null && tcDetails?.pTrhdMethod === 'B' && amountsOfTcDetails != null && amountsOfTcDetails?.object?.facilityDetails.length > 0 && <tr>
              <td className="align-middle grid-text">Rental Amount</td>
              <td className="align-middle">{amountsOfTcDetails !== null && formatNumber(amountsOfTcDetails?.object?.facilityDetails[0]?.instalment)}</td>

              <td className="align-middle grid-text">Rental Method</td>
              {tcDetails?.pTrhdColMeth === 'Q' && <td className="align-middle">Quarterly</td>}
              {tcDetails?.pTrhdColMeth === 'A' && <td className="align-middle">Annually</td>}
              {tcDetails?.pTrhdColMeth === 'BA' && <td className="align-middle">Bi - annually</td>}
              {tcDetails?.pTrhdColMeth === 'HY' && <td className="align-middle">Half yearly</td>}
            </tr>
            }
          </tbody>
        </table>



        {tcDetails != null && tcDetails?.pTrhdMethod === 'S' && amountsOfTcDetails != null && amountsOfTcDetails?.object?.facilityDetails.length > 0 && <table className="table table-responsive">
          <thead>
            <tr>
              <th className="align-middle grid-text">Seq</th>
              <th className="align-middle grid-text">Months</th>
              <th className="align-middle grid-text">Amount</th>
            </tr>
          </thead>
          <tbody>
            {amountsOfTcDetails != null && getRentalDetails(amountsOfTcDetails?.object?.facilityDetails)}

          </tbody>
        </table>
        }

        {tcDetails != null && tcDetails?.pTrhdMethod === 'B' && amountsOfTcDetails != null && amountsOfTcDetails?.object?.facilityDetails.length > 0 && <table className="table table-responsive">
          <thead>
            <tr>
              <th className="align-middle grid-text">Seq</th>
              <th className="align-middle grid-text">Months</th>
              <th className="align-middle grid-text">Amount</th>
            </tr>
          </thead>
          <tbody>
            {amountsOfTcDetails != null && getRentalDetails(amountsOfTcDetails?.object?.facilityDetails)}

          </tbody>
        </table>
        }

      </Loader>
    </div>
  );
}





CalculationDetails.propTypes = {
  clientele: PropTypes.object,
};

export default CalculationDetails;