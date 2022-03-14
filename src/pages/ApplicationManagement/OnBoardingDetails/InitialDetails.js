import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  Collapse,
  Button,
} from "reactstrap";

// Local Components
import Loader from "components/Loader";

import classnames from "classnames";
import Grid from '@material-ui/core/Grid'
// APIs
import {
  getVerificationDetails,
  getInternalCribDetails,
  getEcibDetails,
} from "services/on_board.service";
import {
  getObApprovalByParams,
} from "services/approval.service";

const IntialDetails = (props) => {

  const { appraisalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [objPepName, setObjPepName] = useState(null);
  const [objSanName, setObjSanName] = useState(null);
  const [rules, setRules] = useState([]);
  const [internalCrib, setInternalCrib] = useState({});
  const [approval, setApproval] = useState({});
  const [msas, setMsas] = useState({});
  const [ecib, setEcib] = useState([]);
  const [personalCol, setPersonalCol] = useState(true);
  useEffect(() => {
    var _isMounted = true;

    setIsLoading(true);

    const fetchData = async () => {
      const verificationResponse = await getVerificationDetails(props.clientele.idx);
      const internalCribResponse = await getInternalCribDetails(props.clientele.idx);
      const approvalResponse = await getObApprovalByParams(appraisalId, props.clientele.idx, "BLACKLIST");
      const ecibResponse = await getEcibDetails(props.clientele.idx);
      if (_isMounted) {
        setRules(verificationResponse?.rules);
        setInternalCrib(internalCribResponse);
        setApproval(approvalResponse);
        setMsas(verificationResponse?.msasDetailsDto);
        setEcib(ecibResponse);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    };
  }, [props.clientele]);

  const handlePersonalAccn = () => {
    setPersonalCol(!personalCol);

  };

  const onLoadData = async (obj) => {
    setIsLoading(true);
    setObjPepName(obj.objPepName);
    setIsLoading(false);
  };

  const onLoadSanName = async (obj) => {
    setIsLoading(true);
    setObjSanName(obj.objSanName);
    setIsLoading(false);
  };


  return (
    <div>
      <Row>
        <Col>
          <Card outline color="primary" className="text-primary border">
            <CardBody>
              <Row>
                <Col md="6">
                  <h5 className="p-0 m-0 text-primary"><i className="mdi mdi-bullseye-arrow me-3" />{props.clientele.fullName}</h5>
                </Col>
                <Col md="6">
                  <h5 className="p-0 m-0 text-primary">{props.clientele.identificationNumber}</h5>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <h5 className="p-2 mt-4">Verifications</h5>
      <Loader loading={isLoading}>
        <table className="table table-responsive">
          <tbody>

            <tr>
              <td className="align-middle grid-text text-info">MSAS CNIC ID VERIFICATION</td>
              {rules && rules.map((rule) => {
                if (rule.name === 'RUL_CNIC_ID_VERIFICATION') {
                  if (rule.status === "N") {
                    return <>
                      <td className="align-middle"><Button color="success" size="sm"><i className="bx bx-check font-size-16 align-middle me-2"></i>Verified</Button></td>
                      <td></td>
                    </>
                  } else if (rule.status === "Y") {
                    return <>
                      <td className="align-middle"><Button color="danger" size="sm"><i className="bx bx-x font-size-16 align-middle me-2"></i>Not Verified</Button></td>
                      <td>
                        {msas?.pepNic === true && <Button color="danger" size="sm"><i className="bx bx-file-find font-size-16 align-middle me-2"></i>POLITICALLY EXPOSED PERSON</Button>}
                        {msas?.sanNic === true && <Button color="danger" size="sm"><i className="bx bx-file-find font-size-16 align-middle me-2"></i>SANCTION LISTED PERSON</Button>}
                      </td>
                    </>;
                  } else {
                    return <>
                      <td className="align-middle"><Button color="warning" size="sm"><i className="bx bxs-hourglass-bottom font-size-16 align-middle me-2"></i>Pending</Button></td>
                      <td></td>
                    </>
                  }
                }
              })}

            </tr>

            <tr>
              <td className="align-middle grid-text text-info">MSAS CNIC NAME VERIFICATION</td>
              {rules && rules.map((rule) => {
                if (rule.name === 'RUL_CNIC_NAME_VERIFICATION') {
                  if (rule.status === "N") {
                    return <>
                      <td className="align-middle"><Button color="success" size="sm"><i className="bx bx-check font-size-16 align-middle me-2"></i>Verified</Button></td>
                      <td></td>
                    </>
                  } else if (rule.status === "Y") {
                    return <>
                      <td className="align-middle"><Button color="danger" size="sm"><i className="bx bx-x font-size-16 align-middle me-2"></i>Not Verified</Button></td>
                      <td>
                        {msas?.pepName === true && <Button color="danger" size="sm" onClick={() => onLoadData(msas)}><i className="bx bx-file-find font-size-16 align-middle me-2"></i>POLITICALLY EXPOSED PERSON</Button>}

                        {"\u00A0\u00A0"}
                        {msas?.sanName === true && <Button color="danger" size="sm"><i className="bx bx-file-find font-size-16 align-middle me-2"></i>SANCTION LISTED PERSON</Button>}
                      </td>


                    </>;
                  } else {
                    return <>
                      <td className="align-middle"><Button color="warning" size="sm"><i className="bx bxs-hourglass-bottom font-size-16 align-middle me-2"></i>Pending</Button></td>
                      <td></td>
                    </>
                  }
                }
              })}

            </tr>

            <tr>
              <td className="align-middle grid-text text-info">INTERNAL BLACKLIST STATUS</td>

              {approval === undefined && <>
                <td className="align-middle"><Button color="success" size="sm"><i className="bx bx-check font-size-16 align-middle me-2"></i>Non-Blacklisting</Button></td>
                <td></td>
              </>}

              {approval !== undefined && <>
                <td className="align-middle"><Button color="danger" size="sm"><i className="bx bx-x font-size-16 align-middle me-2"></i>Blacklisted</Button></td>
                <td></td>
              </>}

            </tr>

            <tr>
              <td className="align-middle grid-text text-info">INTERNAL CREDIT HISTORY</td>

              {internalCrib !== undefined && <>
                <td className="align-middle"><Button color="success" size="sm"><i className="bx bx-check font-size-16 align-middle me-2"></i>Verified</Button></td>
                <td><Link target="_blank" to={`/credit-appraisals/documents/credit-history/${props.clientele.idx}`} className="btn btn-info btn-sm"><i className="bx bxs-report font-size-16 align-middle me-2"></i>Preview</Link></td>
              </>}

              {internalCrib === undefined && <>
                <td className="align-middle"><Button color="warning" size="sm"><i className="bx bx-x font-size-16 align-middle me-2"></i>Data Not Found</Button></td>
                <td></td>
              </>}

            </tr>

            <tr>
              <td className="align-middle grid-text text-info">NADRA BIOMETRIC VERIFICATION</td>
              {rules && rules.map((rule) => {
                if (rule.name === 'RUL_BIOMETRIC_VERIFICATION') {
                  if (rule.status === "Y") {
                    return <>
                      <td className="align-middle"><Button color="success" size="sm"><i className="bx bx-check font-size-16 align-middle me-2"></i>Verified</Button></td>
                      <td><Link target="_blank" to={`/credit-appraisals/documents/biometric/${props.clientele.idx}`} className="btn btn-info btn-sm"><i className="bx bxs-report font-size-16 align-middle me-2"></i>Preview</Link></td>
                    </>
                  } else if (rule.status === "N") {
                    return <>
                      <td className="align-middle"><Button color="danger" size="sm"><i className="bx bx-x font-size-16 align-middle me-2"></i>Not Verified</Button></td>
                      <td></td>
                    </>
                  } else {
                    return <>
                      <td className="align-middle"><Button color="warning" size="sm"><i className="bx bxs-hourglass-bottom font-size-16 align-middle me-2"></i>Pending</Button></td>
                      <td></td>
                    </>
                  }
                }
              })}

            </tr>

            <tr>
              <td className="align-middle grid-text text-info">ECIB VERIFICATION</td>
              {rules && rules.map((rule) => {
                if (rule.name === 'RUL_ECIB_VERIFICATION') {
                  if (rule.status === "Y") {
                    return <>
                      <td className="align-middle"><Button color="success" size="sm"><i className="bx bx-check font-size-16 align-middle me-2"></i>Verified</Button></td>
                      <td><Link target="_blank" to={`/credit-appraisals/documents/ecib/${ecib?.length > 0 ? ecib[0]?.imgPath : ""}`} className="btn btn-info btn-sm"><i className="bx bxs-report font-size-16 align-middle me-2"></i>Preview</Link></td>
                    </>
                  } else if (rule.status === "N") {
                    return <>
                      <td className="align-middle"><Button color="danger" size="sm"><i className="bx bx-x font-size-16 align-middle me-2"></i>Not Verified</Button></td>
                      <td></td>
                    </>
                  } else {
                    return <>
                      <td className="align-middle"><Button color="warning" size="sm"><i className="bx bxs-hourglass-bottom font-size-16 align-middle me-2"></i>Pending</Button></td>
                      <td></td>
                    </>
                  }
                }
              })}
            </tr>
          </tbody>
        </table>
        {objPepName != null && <div className="accordion-item">

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
              <p>POLITICALLY EXPOSED PERSON  INFORMATION</p>

            </button>
          </h2>

          <Collapse
            isOpen={personalCol}
            className="accordion-collapse"
          >

            <div className="accordion-body">

              <Row>
                <div className="text-muted d-flex">
                  <Col md={12}>
                    <table className="table mb-4">
                      <thead>
                        <tr>
                          <th>Date Of Birth</th>
                          <th>Occuptation</th>
                          <th>Address</th>
                          <th>Country</th>
                          <th>CNIC</th>
                          <th>Place  of Birth</th>
                          <th>Father Name/Husband Name</th>
                          <th>Entity</th>

                        </tr>
                      </thead>
                      <tbody>

                        {objPepName != null && JSON.parse(objPepName).data?.map((pepNameObj, index) => {

                          return <tr key={index}>
                            <td>{pepNameObj.dateofbirth ? pepNameObj.dateofbirth : "-"}</td>
                            <td>{pepNameObj.occuptation ? pepNameObj.occuptation : "-"}</td>
                            <td>{pepNameObj.address ? pepNameObj.address : "-"}</td>
                            <td>{pepNameObj.country ? pepNameObj.country : "-"}</td>
                            <td>{pepNameObj.nicnumber ? pepNameObj.nicnumber : "-"}</td>
                            <td>{pepNameObj.placeofbirth ? pepNameObj.placeofbirth : "-"}</td>
                            <td>{pepNameObj.father ? pepNameObj.father : "-"}</td>
                            <td>{pepNameObj.entity ? pepNameObj.entity : "-"}</td>
                          </tr>

                        })}
                      </tbody>
                    </table>
                  </Col>


                </div>
              </Row>

            </div>



          </Collapse>
        </div>
        }



      </Loader>
    </div >
  );
}

IntialDetails.propTypes = {
  clientele: PropTypes.object,
};

export default IntialDetails;