import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MetaTags from "react-meta-tags";
import {
  Row,
  Col,
} from "reactstrap";

import Loader from "components/Loader";

// APIs
import {
  getInternalCribDetails
} from "services/on_board.service";

const InternalCribDetails = () => {

  const { id } = useParams();

  const [internalCrib, setInternalCrib] = useState({});
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);

  const removeUnderscore = (str) => {
    return str.replaceAll(/_/g, " ");
  }

  useEffect(() => {
    var _isMounted = true;

    setLoading(true);
    const fetchData = async () => {
      const internalCribResponse = await getInternalCribDetails(id);
      if (_isMounted) {
        setInternalCrib(internalCribResponse);
        setHistories(internalCribResponse?.history);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    };
  }, []);

  return (
    <div className="p-3">
      <Loader loading={loading}>
      <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">No of Previous Loans</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{internalCrib && internalCrib != undefined && internalCrib.previousLoans ? internalCrib.previousLoans : "-"}</p>
        </Col>
      </Row>

      <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">No of Active Loans</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{internalCrib && internalCrib != undefined && internalCrib.activeLoans ? internalCrib.activeLoans : "-"}</p>
        </Col>
      </Row>
    <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">Future Outstanding Amount</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{internalCrib && internalCrib != undefined && internalCrib.futureOutstandingAmount ? internalCrib.futureOutstandingAmount : "-"}</p>
        </Col>
      </Row>
      <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">Total Active Loan Amount</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{internalCrib && internalCrib != undefined && internalCrib.activeLoanAmount ? internalCrib.activeLoanAmount : "-"}</p>
        </Col>
      </Row>

      <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">Total Active Outstanding</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{internalCrib && internalCrib != undefined && internalCrib.activeOutstandingAmount ? internalCrib.activeOutstandingAmount : "-"}</p>
        </Col>
      </Row>

      <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">Total Overdue</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{internalCrib && internalCrib != undefined && internalCrib.totalOverdueAmount ? internalCrib.totalOverdueAmount : "-"}</p>
        </Col>
      </Row>

      <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">Total Active Installment Value</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{internalCrib && internalCrib != undefined && internalCrib.activeInstallmentAmount ? internalCrib.activeInstallmentAmount : "-"}</p>
        </Col>
      </Row>

      <div className="credit-histories m-5">
        <Row className="text-center">
          <h6 className="text-danger">Credit History of customer</h6>
        </Row>
        <Row>
          <table className="table table-bordered text-center mt-3">
            <thead>
              <tr>
                {histories && histories.map((history, index) => (
                  <th key={index}>{removeUnderscore(history.creditLabel)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {histories && histories.map((history, index) => (
                  <td key={index}>{history.creditAmount}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </Row>
      </div>

      </Loader>
    </div>
  );
}

export default InternalCribDetails;