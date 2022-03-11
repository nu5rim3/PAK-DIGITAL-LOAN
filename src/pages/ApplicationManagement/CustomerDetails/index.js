import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Collapse,
} from "reactstrap";

import Grid from '@material-ui/core/Grid'

import classnames from "classnames";

import Loader from "components/Loader";

// APIs
import {
  getAllOrganizations,
  getAllMaritialStatus,
  getAllCnicStatus,
  getAllTitiles,
  getAllGenders,
  getAllEducationalLevels,
  getAllHeadOfFamily,
  getAllHouseHoldContribution,
  getAllHelthConditions,
  getAllCommiunities,
  getAllResidantals,
  getAllOccupations,
  getAllProvinces,
  /* SUB OCCUPATION */
  getAllInformationSources,
  getAllSectors,
  getAllSubSectors,
  /* HWT DECLARATION */
  getValuePoliticallyExposed,
  getAllBanks,
  getValueAccountTitle,
  getValueAddressType,
} from "services/common.service";
import {
  getTcDetails,
} from "services/tc.service";
import {
  getMasterData,
  contactInformation,
  residentialInformation,
  recipientInformation,
  otherInformation,
  pdChequeInformation
} from "services/customer.service";
import {
  getValueByList
} from "services/util.service";

const CustomerDetails = (props) => {

  const { appraisalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  /* COMMON */
  const [organizations, setOrganizations] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [cnicStatus, setCnicStatus] = useState([]);
  const [titles, setTitles] = useState([]);
  const [genders, setGenders] = useState([]);
  const [educationalLevels, setEducationalLevels] = useState([]);
  const [headOfFamily, setHeadOfFamily] = useState([]);
  const [houseHoldContribution, setHouseHoldContribution] = useState([]);
  const [healthConditions, setHealthConditions] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [residantals, setResidantals] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [informationSources, setInformationSources] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [subSectors, setSubSectors] = useState([]);
  const [banks, setBanks] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const [tcDetails, setTcDetails] = useState({});
  const [master, setMaster] = useState({});
  const [contact, setContact] = useState([]);
  const [residentials, setResidentials] = useState([]);
  const [recipient, setRecipient] = useState({});
  const [other, setOther] = useState({});
  const [cheque, setCheque] = useState({});

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

  const handleAddressAccn = () => {
    setPersonalCol(false);
    setAddressCol(!addressCol);
    setInsuranceCol(false);
    setOtherCol(false);
    setPdCol(false);
  };

  const handleInsuranceAccn = () => {
    setPersonalCol(false);
    setAddressCol(false);
    setInsuranceCol(!insuranceCol);
    setOtherCol(false);
    setPdCol(false);
  };

  const handleOtherAccn = () => {
    setPersonalCol(false);
    setAddressCol(false);
    setInsuranceCol(false);
    setOtherCol(!otherCol);
    setPdCol(false);
  };

  const handlePdCol = () => {
    setPersonalCol(false);
    setAddressCol(false);
    setInsuranceCol(false);
    setOtherCol(false);
    setPdCol(!pdCol);
  };

  useEffect(() => {
    var _isMounted = true;

    setIsLoading(true);

    const fetchData = async () => {
      if (props.active === "2") {

        var idx = null;

        const tcDetails = await getTcDetails(appraisalId);
        if (_isMounted) {
          setTcDetails(tcDetails);
        }

        /* COMMON */
        const organizations = await getAllOrganizations();
        const maritalStatusResponse = await getAllMaritialStatus();
        const cnicStatusResponse = await getAllCnicStatus();
        const titlesResponse = await getAllTitiles();
        const genderResponse = await getAllGenders();
        const educationalLevelsResponse = await getAllEducationalLevels();
        const communitiesResponse = await getAllCommiunities();
        const residantalsResponse = await getAllResidantals();
        const occupationsResponse = await getAllOccupations();
        const informationSourcesResponse = await getAllInformationSources();
        const sectorsResponse = await getAllSectors();
        const subSectorsResponse = await getAllSubSectors();
        const banksResponse = await getAllBanks();
        const provinceResponse = await getAllProvinces();

        if (tcDetails !== undefined) {
          const headOfFamilyResponse = await getAllHeadOfFamily(tcDetails.pTrhdLType);
          const houseHoldContributionResponse = await getAllHouseHoldContribution(tcDetails.pTrhdLType);
          const healthConditionsResponse = await getAllHelthConditions(tcDetails.pTrhdLType);

          if (_isMounted) {
            setHeadOfFamily(headOfFamilyResponse);
            setHouseHoldContribution(houseHoldContributionResponse);
            setHealthConditions(healthConditionsResponse);
          }
        }

        /* APPRAISAL */
        const masterResponse = await getMasterData(appraisalId);
        if (_isMounted && masterResponse.length > 0) {
          var obj = masterResponse.filter(item => item.stkType === "C")[0];
          if (obj != null) {
            idx = obj.idx;
            setMaster(obj);
          }
        }

        const contactResponse = await contactInformation(idx);
        const residentialResponse = await residentialInformation(idx);
        const recipientResponse = await recipientInformation(idx);
        const otherResponse = await otherInformation(idx);
        const chequeResponse = await pdChequeInformation(idx);

        if (_isMounted) {
          /* COMMON */
          setOrganizations(organizations);
          setMaritalStatus(maritalStatusResponse);
          setCnicStatus(cnicStatusResponse);
          setTitles(titlesResponse);
          setGenders(genderResponse);
          setEducationalLevels(educationalLevelsResponse);
          setCommunities(communitiesResponse);
          setResidantals(residantalsResponse);
          setOccupations(occupationsResponse);
          setInformationSources(informationSourcesResponse);
          setSectors(sectorsResponse);
          setSubSectors(subSectorsResponse);
          setBanks(banksResponse);
          setProvinces(provinceResponse);

          setContact(contactResponse);
          setResidentials(residentialResponse);
          setRecipient(recipientResponse[0]);
          setOther(otherResponse[0]);
          setCheque(chequeResponse[0]);

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
                id="accordionCustomerDetails"
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
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
                      CUSTOMER PERSONAL INFORMATION
                    </button>
                  </h2>

                  <Collapse
                    isOpen={personalCol}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <div className="text-muted d-flex">

                          <table className="table table-borderless">
                            <tbody>
                              <tr>
                                <td><p className="m-0 grid-text">Organization Type</p></td>
                                <td><p className="m-0">{master && master.stkOrgType ? getValueByList(organizations, master.stkOrgType) : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">Customer CNIC</p></td>
                                <td><p className="m-0">{master && master.stkCNic ? master.stkCNic : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">CNIC Issued Date</p></td>
                                <td><p className="m-0">{master && master.stkCNicIssuedDate ? master.stkCNicIssuedDate : "\u00A0"}</p></td>
                              </tr>

                              <tr>
                                <td><p className="m-0 grid-text">CNIC Expired Date</p></td>
                                <td><p className="m-0">{master && master.stkCNicExpDate ? master.stkCNicExpDate : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">CNIC Status</p></td>
                                <td><p className="m-0">{master && master.stkCNicStatus ? getValueByList(cnicStatus, master.stkCNicStatus) : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">Customer Name</p></td>
                                <td><p className="m-0">{master && master.stkCusName ? master.stkCusName : "\u00A0"}</p></td>
                              </tr>

                              <tr>
                                <td><p className="m-0 grid-text">Initials</p></td>
                                <td><p className="m-0">{master && master.stkInitials ? master.stkInitials : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">Surname</p></td>
                                <td><p className="m-0">{master && master.stkSurName ? master.stkSurName : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">Other Name</p></td>
                                <td><p className="m-0">{master && master.stkOtherName ? master.stkOtherName : "\u00A0"}</p></td>
                              </tr>

                              <tr>
                                <td><p className="m-0 grid-text">Date of Birth</p></td>
                                <td><p className="m-0">{master && master.stkDob ? master.stkDob : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">Age</p></td>
                                <td><p className="m-0">{master && master.stkAge ? master.stkAge : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">Gender</p></td>
                                <td><p className="m-0">{master && master.stkGender ? getValueByList(genders, master.stkGender) : "\u00A0"}</p></td>
                              </tr>

                              <tr>
                                <td><p className="m-0 grid-text">Marital Status</p></td>
                                <td><p className="m-0">{master && master.stkMaritialStatus ? getValueByList(maritalStatus, master.stkMaritialStatus) : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">Title</p></td>
                                <td><p className="m-0">{master && master.stkTitle ? getValueByList(titles, master.stkTitle) : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">Father/ Husband Name</p></td>
                                <td><p className="m-0">{master && master.stkFatherOrHusName ? master.stkFatherOrHusName : "\u00A0"}</p></td>
                              </tr>

                              <tr>
                                <td><p className="m-0 grid-text">No.of Dependents</p></td>
                                <td><p className="m-0">{master && master.stkNumOfDependents ? master.stkNumOfDependents : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">No.of Earners</p></td>
                                <td><p className="m-0">{master && master.stkNumOfEarners ? master.stkNumOfEarners : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">Educational Qualification</p></td>
                                <td><p className="m-0">{master && master.stkEduLevel ? getValueByList(educationalLevels, master.stkEduLevel) : "\u00A0"}</p></td>
                              </tr>

                              <tr>
                                <td><p className="m-0 grid-text">Customer Code</p></td>
                                <td><p className="m-0">{master && master.stkPhysDisability ? master.stkPhysDisability : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">Group/ Reference No</p></td>
                                <td><p className="m-0">{master && master.stkGrpRefNo ? master.stkGrpRefNo : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">There is a Physical Disability</p></td>
                                <td><p className="m-0">{master && master.stkPhysDisabilityDesce ? master.stkPhysDisabilityDesce : "\u00A0"}</p></td>
                              </tr>

                              <tr>
                                <td><p className="m-0 grid-text">Description of Disability</p></td>
                                <td><p className="m-0">{master && master.healthCondition ? getValueByList(healthConditions, master.healthCondition) : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">Head of Family</p></td>
                                <td><p className="m-0">{master && master.headOfFamily ? getValueByList(headOfFamily, master.headOfFamily) : "\u00A0"}</p></td>

                                <td><p className="m-0 grid-text">House Hold Contribution</p></td>
                                <td><p className="m-0">{master && master.houseHoldCont ? getValueByList(houseHoldContribution, master.houseHoldCont) : "\u00A0"}</p></td>
                              </tr>

                              {/* <tr>
                                <td><p className="m-0 grid-text">Health Condition of Customer</p></td>
                              </tr> */}

                            </tbody>
                          </table>

                        </div>
                      </Row>
                    </div>
                  </Collapse>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFlushTwo">
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !addressCol }
                      )}
                      type="button"
                      onClick={handleAddressAccn}
                      style={{ cursor: "pointer" }}
                    >
                      CONTACT & ADDRESS INFORMATION
                    </button>
                  </h2>

                  <Collapse
                    isOpen={addressCol}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <div className="text-muted d-flex">
                          {contact.map((item, index) => (
                            <Grid container spacing={12} key={index}>
                              <Grid item className="grid-text">
                                <span key={index}>
                                  <p>Phone No Type</p>
                                  <p>Phone No</p>
                                </span>
                              </Grid>
                              <Grid item>
                                <span key={index}>
                                  <p>{item.phoneNoType}</p>
                                  <p>{item.phoneNo}</p>
                                </span>
                              </Grid>
                            </Grid>
                          ))}
                        </div>
                      </Row>

                      {contact.length > 0 && <hr></hr>}

                      <Row>
                        <div className="text-muted d-flex">
                          {residentials.map((residential, index) => (
                            <table className="table table-borderless" key={index}>
                              <tbody>
                                <tr>
                                  <td><p className="m-0 grid-text">Address Type</p></td>
                                  <td><p className="m-0">{residential && residential.addressType ? getValueAddressType(residential.addressType) : "\u00A0"}</p></td>
                                </tr>
                                {/* <tr>
                                  <td><p className="m-0 grid-text">Same as the Residential Address</p></td>
                                  <td><p className="m-0">{residential && residential.same ? residential.same : "\u00A0"}</p></td>
                                </tr> */}
                                <tr>
                                  <td><p className="m-0 grid-text">Address Line 1</p></td>
                                  <td><p className="m-0">{residential && residential.addressLine1 ? residential.addressLine1 : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Address Line 2</p></td>
                                  <td><p className="m-0">{residential && residential.addressLine2 ? residential.addressLine2 : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Address Line 3</p></td>
                                  <td><p className="m-0">{residential && residential.addressLine3 ? residential.addressLine3 : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Address Line 4</p></td>
                                  <td><p className="m-0">{residential && residential.addressLine4 ? residential.addressLine4 : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Area</p></td>
                                  <td><p className="m-0">{residential && residential.area ? residential.area : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">City</p></td>
                                  <td><p className="m-0">{residential && residential.city ? residential.city : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Distric</p></td>
                                  <td><p className="m-0">{residential && residential.district ? residential.district : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Province</p></td>
                                  <td><p className="m-0">{residential && residential.province ? getValueByList(provinces, residential.province) : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Community</p></td>
                                  <td><p className="m-0">{residential && residential.community ? getValueByList(communities, residential.community) : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Nearby Popular Places</p></td>
                                  <td><p className="m-0">{residential && residential.nearByPopPlc ? residential.nearByPopPlc : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Duration of Current Location</p></td>
                                  <td><p className="m-0">{residential && residential.durOfCurrLoc ? residential.durOfCurrLoc : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Residence Type</p></td>
                                  <td><p className="m-0">{residential && residential.residenceType ? getValueByList(residantals, residential.residenceType) : "\u00A0"}</p></td>
                                </tr>
                              </tbody>
                            </table>
                          ))}
                        </div>
                      </Row>
                    </div>
                  </Collapse>
                </div>
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !insuranceCol }
                      )}
                      type="button"
                      onClick={handleInsuranceAccn}
                      style={{ cursor: "pointer" }}
                    >
                      INSURANCE RECIPIENT/ NOMINEE INFORMATION
                    </button>
                  </h2>
                  <Collapse
                    isOpen={insuranceCol}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <div className="text-muted d-flex">
                          <Grid container spacing={12}>
                            <Grid item className="grid-text">
                              <p>Recipient Name</p>
                              <p>Relationship</p>
                              <p>CNIC No</p>
                              <p>Phone No</p>
                            </Grid>
                            <Grid item>
                              <p>{recipient && recipient.recipientName ? recipient.recipientName : "\u00A0"}</p>
                              <p>{recipient && recipient.relationship ? recipient.relationship : "\u00A0"}</p>
                              <p>{recipient && recipient.cNicNo ? recipient.cNicNo : "\u00A0"}</p>
                              <p>{recipient && recipient.phoneNo ? recipient.phoneNo : "\u00A0"}</p>
                            </Grid>
                          </Grid>
                        </div>
                      </Row>
                    </div>
                  </Collapse>
                </div>
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !otherCol }
                      )}
                      type="button"
                      onClick={handleOtherAccn}
                      style={{ cursor: "pointer" }}
                    >
                      OTHER INFORMATION
                    </button>
                  </h2>
                  <Collapse
                    isOpen={otherCol}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <div className="text-muted d-flex">
                          <Grid container spacing={12}>
                            <Grid item className="grid-text">
                              <p>Occupation</p>
                              <p>Sub Occupation</p>
                              <p>How Did You Know About Us</p>
                              <p>Sector</p>
                              <p>Sub Sector</p>
                            </Grid>
                            <Grid item>
                              <p>{other && other.occupation ? getValueByList(occupations, other.occupation) : "\u00A0"}</p>
                              <p>{other && other.subOccupation ? other.subOccupation : "\u00A0"}</p>
                              <p>{other && other.howDidYouKnow ? getValueByList(informationSources, other.howDidYouKnow) : "\u00A0"}</p>
                              <p>{other && other.sector ? getValueByList(sectors, other.sector) : "\u00A0"}</p>
                              <p>{other && other.subSector ? getValueByList(subSectors, other.subSector) : "\u00A0"}</p>
                            </Grid>

                            <Grid item className="grid-text">
                              <p>Savings Account Required</p>
                              <p>WHT Declaration</p>
                              <p>PoliticallyExposedPerson</p>
                            </Grid>
                            <Grid item>
                              <p>{other && other.savingsReq ? other.savingsReq : "\u00A0"}</p>
                              <p>{other && other.whtDec ? other.whtDec : "\u00A0"}</p>
                              <p>{other && other.poliExpo ? getValuePoliticallyExposed(other.poliExpo) : "\u00A0"}</p>
                            </Grid>
                          </Grid>
                        </div>
                      </Row>
                    </div>
                  </Collapse>
                </div>
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="headingFlushThree"
                  >
                    <button
                      className={classnames(
                        "accordion-button",
                        "fw-medium",
                        { collapsed: !pdCol }
                      )}
                      type="button"
                      onClick={handlePdCol}
                      style={{ cursor: "pointer" }}
                    >
                      POST DATED CHEQUE INFORMATION
                    </button>
                  </h2>
                  <Collapse
                    isOpen={pdCol}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <div className="text-muted d-flex">
                          <Grid container spacing={12}>
                            <Grid item className="grid-text">
                              <p>Bank</p>
                              <p>Cheque No</p>
                              <p>Account No</p>
                              <p>Account Title</p>
                            </Grid>
                            <Grid item>
                              <p>{cheque && cheque.bank ? getValueByList(banks, cheque.bank) : "\u00A0"}</p>
                              <p>{cheque && cheque.chequeNo ? cheque.chequeNo : "\u00A0"}</p>
                              <p>{cheque && cheque.accountNo ? cheque.accountNo : "\u00A0"}</p>
                              <p>{cheque && cheque.accountTitle ? getValueAccountTitle(cheque.accountTitle) : "\u00A0"}</p>
                            </Grid>

                            {/* <Grid item className="grid-text">
                            <p>Bank</p>
                            <p>Branch</p>
                            <p>Account No</p>
                            <p>Status</p>
                          </Grid>
                          <Grid item>
                            <p>{cheque && cheque.bank ? cheque.bank : "\u00A0"}</p>
                            <p>{cheque && cheque.poliExpo ? cheque.poliExpo : "\u00A0"}</p>
                            <p>{cheque && cheque.poliExpo ? cheque.poliExpo : "\u00A0"}</p>
                            <p>{cheque && cheque.status ? cheque.status : "\u00A0"}</p>
                          </Grid> */}
                          </Grid>
                        </div>
                      </Row>
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
          </div>
        </Col >
      </Loader>
    </Row >
  )
};

CustomerDetails.propTypes = {
  active: PropTypes.string
};

export default CustomerDetails;
