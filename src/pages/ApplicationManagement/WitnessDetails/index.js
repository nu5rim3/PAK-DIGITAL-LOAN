import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  CardTitle,
  Card,
  CardBody,
  CardText,
  Collapse,
  Table,
  Button
} from "reactstrap";

import Grid from '@material-ui/core/Grid'

import classnames from "classnames";

import Loader from "components/Loader";

// APIs
import {
  getMasterData,
  masterInformation,
  contactInformation,
  residentialInformation,
} from "services/witness.service";
import {
  getValueAddressType
} from "services/common.service";

const WitnessDetails = (props) => {

  const { appraisalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [peoples, setPeoples] = useState([]);
  const [master, setMaster] = useState(null);
  const [contact, setContact] = useState([]);
  const [residential, setResidential] = useState(null);
  const [personalCol, setPersonalCol] = useState(true);
  const [addressCol, setAddressCol] = useState(true);
  const [insuranceCol, setInsuranceCol] = useState(true);
  const [otherCol, setOtherCol] = useState(true);
  const [pdCol, setPdCol] = useState(true);

  const handlePersonalAccn = () => {
    setPersonalCol(!personalCol);
    setAddressCol(false);
    setInsuranceCol(false);
    setOtherCol(false);
    setPdCol(false);
  };

  const onLoadData = async (obj) => {

    setIsLoading(true);

    const masterResponse = await masterInformation(obj.idx);
    setMaster(masterResponse);

    const contactResponse = await contactInformation(obj.idx);
    setContact(contactResponse);

    const residentialResponse = await residentialInformation(obj.idx);
    setResidential(residentialResponse[0]);

    setIsLoading(false);
  };

  useEffect(() => {
    var _isMounted = true;

    setIsLoading(true);

    const fetchData = async () => {
      if (props.active === "4") {

        const masterResponse = await getMasterData(appraisalId);
        if (_isMounted && masterResponse !== undefined && masterResponse.length > 0) {
          setPeoples(masterResponse.filter(item => item.stkType === "W"));
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    };
  }, [props.active]);

  return (
    <Row>
      <Loader loading={isLoading}>
        <Col lg={12}>
          <div className="page-wrapper-context">
            <div className="mt-4">
              <div
                className="accordion accordion-flush"
                id="accordionWitnessDetails"
              >
                <Row>
                  <Col md={12}>
                    <table className="table mb-4">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Surname</th>
                          <th>CNIC</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {peoples.map((item, index) => (
                          <tr key={index}>
                            <td>{item.stkCusName}</td>
                            <td>{item.stkSurName}</td>
                            <td>{item.stkCNic}</td>
                            <td><Button color="success" size="sm" onClick={() => onLoadData(item, index)}><i className="bx bx-file-find font-size-16 align-middle me-2"></i>Load</Button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>

                {master && <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !personalCol }
                      )}
                      type="button"
                      onClick={handlePersonalAccn}
                      style={{ cursor: "pointer" }}
                    >
                      <p>ITNESS PERSONAL INFORMATION</p>
                    </button>
                  </h2>

                  <Collapse
                    isOpen={personalCol}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <div className="text-muted d-flex">
                          <Grid container spacing={10}>
                            <Grid item className="grid-text">
                              <p>Witness CNIC</p>
                              <p>Witness Full Name</p>
                              <p>Father/Husband Name</p>
                              <p>Address Type</p>
                              <p>Address Line 1</p>
                              <p>Address Line 2</p>
                              <p>Address Line 3</p>
                              <p>Address Line 4</p>
                            </Grid>
                            <Grid item>
                              <p>{master && master.stkCNic ? master.stkCNic : "\u00A0"}</p>
                              <p>{master && master.stkCusName ? master.stkCusName : "\u00A0"}</p>
                              <p>{master && master.stkFatherOrHusName ? master.stkFatherOrHusName : "\u00A0"}</p>
                              <p>{master && master.addressType ? getValueAddressType(master.addressType) : "\u00A0"}</p>
                              <p>{residential && residential.addressLine1 ? residential.addressLine1 : "\u00A0"}</p>
                              <p>{residential && residential.addressLine2 ? residential.addressLine2 : "\u00A0"}</p>
                              <p>{residential && residential.addressLine3 ? residential.addressLine3 : "\u00A0"}</p>
                              <p>{residential && residential.addressLine4 ? residential.addressLine4 : "\u00A0"}</p>
                            </Grid>

                            <Grid item className="grid-text">
                              <p>Area</p>
                              <p>City</p>
                              <p>District</p>
                              <p>Province</p>
                            </Grid>
                            <Grid item>
                              <p>{residential && residential.area ? residential.area : "\u00A0"}</p>
                              <p>{residential && residential.city ? residential.city : "\u00A0"}</p>
                              <p>{residential && residential.district ? residential.district : "\u00A0"}</p>
                              <p>{residential && residential.province ? residential.province : "\u00A0"}</p>
                            </Grid>
                          </Grid>
                        </div>
                      </Row>
                    </div>
                  </Collapse>
                </div>}
              </div>
            </div>
          </div>
        </Col>
      </Loader>
    </Row>
  )
};

WitnessDetails.propTypes = {
  active: PropTypes.string
};

export default WitnessDetails;
