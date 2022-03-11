import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Row,
  Col,
} from "reactstrap";

import Loader from "components/Loader";

// APIs
import {
  getBiometricDetails
} from "services/on_board.service";

const BiometricDetails = (props) => {

  const [biometric, setBiometric] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var _isMounted = true;
    setLoading(true);
    const fetchData = async () => {
      const biometricResponse = await getBiometricDetails(props.clientele);
      if (_isMounted) {
        setBiometric(biometricResponse);
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
          <p className="m-0 grid-text">Customer Name</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{biometric && biometric.length > 0 && biometric[0].name ? biometric[0].name : "-"}</p>
        </Col>
      </Row>

      <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">Customer CNIC</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{biometric && biometric.length > 0 && biometric[0].cnic ? biometric[0].cnic : "-"}</p>
        </Col>
      </Row>

      <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">Customer Father/Husband Name</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{biometric && biometric.length > 0 && biometric[0].fatherHusbandName ? biometric[0].fatherHusbandName : "-"}</p>
        </Col>
      </Row>

      <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">Date of Birth</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{biometric && biometric.length > 0 && biometric[0].dateOfBirth ? biometric[0].dateOfBirth : "-"}</p>
        </Col>
      </Row>

      <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">Expiry Date</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{biometric && biometric.length > 0 && biometric[0].expireDate ? biometric[0].expireDate : "-"}</p>
        </Col>
      </Row>

      <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">Birth Place</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{biometric && biometric.length > 0 && biometric[0].birthPlace ? biometric[0].birthPlace : "-"}</p>
        </Col>
      </Row>

      <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">Present Address</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{biometric && biometric.length > 0 && biometric[0].presentAddress ? biometric[0].presentAddress : "-"}</p>
        </Col>
      </Row>

      <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">Permanent Address</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{biometric && biometric.length > 0 && biometric[0].permanentAddress ? biometric[0].permanentAddress : "-"}</p>
        </Col>
      </Row>

      <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">Card Type</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{biometric && biometric.length > 0 && biometric[0].cardType ? biometric[0].cardType : "-"}</p>
        </Col>
      </Row>

      <Row className="border border-success rounded p-3 mb-3">
        <Col md={4}>
          <p className="m-0 grid-text">Nadra Response</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">-</p>
        </Col>
        <Col md={4}>
          <p className="m-0 grid-text text-center">{biometric && biometric.length > 0 && biometric[0].responseMessage ? biometric[0].responseMessage : "-"}</p>
        </Col>
      </Row>

      </Loader>
    </div>
  );
}

BiometricDetails.propTypes = {
  clientele: PropTypes.string,
};

export default BiometricDetails;