import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  CardTitle,
  Card,
  Collapse,
  CardBody,
  Button,
} from "reactstrap";

import NumberFormat from "react-number-format";

import Grid from '@material-ui/core/Grid'

import classnames from "classnames";

import Loader from "components/Loader";
import AsyncImage from "pages/ApplicationManagement/ImageDetails/async_images";

// APIs
import {
  getAllMaritialStatus,
  getAllCnicStatus,
  getAllTitiles,
  getAllGenders,
  getAllEducationalLevels,
  getAllHeadOfFamily,
  getAllHouseHoldContribution,
  getAllCommiunities,
  getAllResidantals,
  getValueAddressType,
} from "services/common.service";
import {
  getTcDetails,
  getAmountsOfTcDetails,
} from "services/tc.service";
import {
  getMasterData,
  masterInformation,
  contactInformation,
  residentialInformation,
  incomeInformation,
  getSignature,
  getThumb,
} from "services/guarantor.service";
import {
  getValueByList
} from "services/util.service";

const GuarantorDetails = (props) => {

  const { appraisalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  /* COMMON */
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [cnicStatus, setCnicStatus] = useState([]);
  const [titles, setTitles] = useState([]);
  const [genders, setGenders] = useState([]);
  const [educationalLevels, setEducationalLevels] = useState([]);
  const [headOfFamily, setHeadOfFamily] = useState([]);
  const [houseHoldContribution, setHouseHoldContribution] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [residantals, setResidantals] = useState([]);

  const [tcDetails, setTcDetails] = useState({});
  const [peoples, setPeoples] = useState([]);
  const [master, setMaster] = useState(null);
  const [contact, setContact] = useState([]);
  const [residentials, setResidentials] = useState([]);
  const [income, setIncome] = useState(null);
  const [signature, setSignature] = useState([]);
  const [thumb, setThumb] = useState([]);
  const [customer, setCustomer] = useState({});
  const [loanDetails, setLoanDetails] = useState({});

  const [personalCol, setPersonalCol] = useState(true);
  const [addressCol, setAddressCol] = useState(true);
  const [insuranceCol, setInsuranceCol] = useState(true);
  const [otherCol, setOtherCol] = useState(true);

  const handlePersonalAccn = () => {
    setPersonalCol(!personalCol);
    setAddressCol(false);
    setInsuranceCol(false);
    setOtherCol(false);
  };

  const handleAddressAccn = () => {
    setPersonalCol(false);
    setAddressCol(!addressCol);
    setInsuranceCol(false);
    setOtherCol(false);
  };

  const handleInsuranceAccn = () => {
    setPersonalCol(false);
    setAddressCol(false);
    setInsuranceCol(!insuranceCol);
    setOtherCol(false);
  };

  const handleOtherAccn = () => {
    setPersonalCol(false);
    setAddressCol(false);
    setInsuranceCol(false);
    setOtherCol(!otherCol);
  };

  const format = (value) => {
    return (
      <NumberFormat
        value={value}
        displayType={'text'}
        thousandSeparator={true}
        renderText={(value, props) => <p className="m-0" {...props}>{value}</p>}
      />
    );
  }

  const getGuarantorAknowledgement = () => {
    return <p style={{ direction: 'rtl' }}>
      میں بقائمی ہوش وحواس <u>{customer?.stkCusName}</u> کو دئیے جانے والے مبلغ <u><NumberFormat value={loanDetails?.object?.loanAmount} displayType={'text'} thousandSeparator={true} /></u> روپے کے قرض کی ضمانت قبول کرتا ہوں اور بلا مشروط اقرار کرتا ہوں کہ اگر قرض خواہ لیے گئے قرض کو کسی بھی وجہ سے ادا کرنے سے قاصر رہتا ہے تو اس قرض کی مکمل ادائیگی کی ذمہ داری مجھ پر ہوگی اور میں اُوپر دی گئی ذاتی اور قرض خواہ کے بارے میں دی گئی معلومات کے بارے میں پوری طرح متفق ہوں.
    </p>;
  }

  const onLoadData = async (obj, index) => {
    setIsLoading(true);

    const masterResponse = await masterInformation(obj.idx);
    setMaster(masterResponse);

    const residentialResponse = await residentialInformation(obj.idx);
    setResidentials(residentialResponse);

    const contactResponse = await contactInformation(obj.idx);
    setContact(contactResponse);

    const incomeResponse = await incomeInformation(obj.idx);
    setIncome(incomeResponse[0]);

    const signatureResponse = await getSignature(appraisalId, `G${index + 1}`);
    setSignature(signatureResponse);

    const thumbResponse = await getThumb(appraisalId, `G${index + 1}FINGER`);
    setThumb(thumbResponse);

    setIsLoading(false);
  };

  useEffect(() => {
    var _isMounted = true;

    setIsLoading(true);

    const fetchData = async () => {
      if (props.active === "4") {

        const tcDetails = await getTcDetails(appraisalId);
        if (_isMounted) {
          setTcDetails(tcDetails);
        }

        if (tcDetails !== undefined) {
          const loanDetails = await getAmountsOfTcDetails(tcDetails.tcNo);
          if (_isMounted) {
            setLoanDetails(loanDetails);
          }
        }

        const masterResponse = await getMasterData(appraisalId);
        if (_isMounted && masterResponse.length > 0) {
          setPeoples(masterResponse.filter(item => item.stkType === "G"));
          setCustomer(masterResponse.filter(item => item.stkType === "C")[0]);
        }

        /* COMMON */
        const maritalStatusResponse = await getAllMaritialStatus();
        const cnicStatusResponse = await getAllCnicStatus();
        const titlesResponse = await getAllTitiles();
        const genderResponse = await getAllGenders();
        const educationalLevelsResponse = await getAllEducationalLevels();
        const communitiesResponse = await getAllCommiunities();
        const residantalsResponse = await getAllResidantals();

        if (tcDetails !== undefined) {
          const headOfFamilyResponse = await getAllHeadOfFamily(tcDetails.pTrhdLType);
          const houseHoldContributionResponse = await getAllHouseHoldContribution(tcDetails.pTrhdLType);
          if (_isMounted) {
            setHeadOfFamily(headOfFamilyResponse);
            setHouseHoldContribution(houseHoldContributionResponse);
          }
        }

        if (_isMounted) {
          /* COMMON */
          setMaritalStatus(maritalStatusResponse);
          setCnicStatus(cnicStatusResponse);
          setTitles(titlesResponse);
          setGenders(genderResponse);
          setEducationalLevels(educationalLevelsResponse);
          setCommunities(communitiesResponse);
          setResidantals(residantalsResponse);

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
                id="accordionGuarantorDetails"
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

                {master !== null && <div className="accordion-item">
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
                      GUARANTOR PERSONAL INFORMATION
                    </button>
                  </h2>

                  <Collapse
                    isOpen={personalCol}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <div className="text-muted d-flex">
                          <div className="container row">

                            <div className="table-responsive-md col-12 col-md-12 col-sm-12">
                              <table className="table table-borderless table-sm">
                                <tbody>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Organization Type</p></td>
                                    <td className="m-1"><p>{master && master.stkOrgType ? master.stkOrgType : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>CNIC Expired Date</p></td>
                                    <td className="m-1"><p>{master && master.stkCNicExpDate ? master.stkCNicExpDate : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>{master && master.stkInitials ? master.stkInitials : "\u00A0"}</p><p>Initials</p></td>
                                    <td className="m-1"></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Date of Birth</p></td>
                                    <td className="m-1"><p>{master && master.stkDob ? master.stkDob : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Marital Status</p></td>
                                    <td className="m-1"><p>{master && master.stkMaritialStatus ? getValueByList(maritalStatus, master.stkMaritialStatus) : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>No.of Dependents</p></td>
                                    <td className="m-1"><p>{master && master.stkNumOfDependents ? master.stkNumOfDependents : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Customer Code</p></td>
                                    <td className="m-1"></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Description of Disability</p></td>
                                    <td className="m-1"><p>{master && master.stkPhysDisability ? master.stkPhysDisability : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Health Condition of Customer</p></td>
                                    <td className="m-1"><p>{master && master.healthCondition ? master.healthCondition : "\u00A0"}</p></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>



                            {/* <div item className="col-6 col-md-6 col-sm-6 grid-text">
                              <p>Organization Type</p>
                              <p>CNIC Expired Date</p>
                              <p>Initials</p>
                              <p>Date of Birth</p>
                              <p>Marital Status</p>
                              <p>No.of Dependents</p>
                              <p>Customer Code</p>
                              <p>Description of Disability</p>
                              <p>Health Condition of Customer</p>
                            </div>
                            <div item className="col-6 col-md-6 col-sm-6">
                              <p>{master && master.stkOrgType ? master.stkOrgType : "\u00A0"}</p>
                              <p>{master && master.stkCNicExpDate ? master.stkCNicExpDate : "\u00A0"}</p>
                              <p>{master && master.stkInitials ? master.stkInitials : "\u00A0"}</p>
                              <p>{master && master.stkDob ? master.stkDob : "\u00A0"}</p>
                              <p>{master && master.stkMaritialStatus ? getValueByList(maritalStatus, master.stkMaritialStatus) : "\u00A0"}</p>
                              <p>{master && master.stkNumOfDependents ? master.stkNumOfDependents : "\u00A0"}</p>
                              <p>{master && master.stkPhysDisability ? master.stkPhysDisability : "\u00A0"}</p>
                              <p>{master && master.healthCondition ? master.healthCondition : "\u00A0"}</p>
                            </div> */}

                            <div className="table-responsive-md col-12 col-md-12 col-sm-12">
                              <table className="table table-borderless table-sm">
                                <tbody>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Customer CNIC</p></td>
                                    <td className="m-1"><p>{master && master.stkCNic ? master.stkCNic : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>CNIC Status</p></td>
                                    <td className="m-1"><p>{master && master.stkCNicStatus ? getValueByList(cnicStatus, master.stkCNicStatus) : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Surname</p></td>
                                    <td className="m-1"><p>{master && master.stkSurName ? master.stkSurName : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Age</p></td>
                                    <td className="m-1"><p>{master && master.stkAge ? master.stkAge : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Title</p></td>
                                    <td className="m-1"><p>{master && master.stkTitle ? getValueByList(titles, master.stkTitle) : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>No.of Earners</p></td>
                                    <td className="m-1"><p>{master && master.stkNumOfEarners ? master.stkNumOfEarners : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"> <p>Group/ Reference No</p></td>
                                    <td className="m-1"><p>{master && master.stkGrpRefNo ? master.stkGrpRefNo : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Head of Family</p></td>
                                    <td className="m-1"><p>{master && master.headOfFamily ? getValueByList(headOfFamily, master.headOfFamily) : "\u00A0"}</p></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            {/* <div item className="col-6 col-md-6 col-sm-6 grid-text">
                              <p>Customer CNIC</p>
                              <p>CNIC Status</p>
                              <p>Surname</p>
                              <p>Age</p>
                              <p>Title</p>
                              <p>No.of Earners</p>
                              <p>Group/ Reference No</p>
                              <p>Head of Family</p>
                            </div>
                            <div item className="col-6 col-md-6 col-sm-6">
                              <p>{master && master.stkCNic ? master.stkCNic : "\u00A0"}</p>
                              <p>{master && master.stkCNicStatus ? getValueByList(cnicStatus, master.stkCNicStatus) : "\u00A0"}</p>
                              <p>{master && master.stkSurName ? master.stkSurName : "\u00A0"}</p>
                              <p>{master && master.stkAge ? master.stkAge : "\u00A0"}</p>
                              <p>{master && master.stkTitle ? getValueByList(titles, master.stkTitle) : "\u00A0"}</p>
                              <p>{master && master.stkNumOfEarners ? master.stkNumOfEarners : "\u00A0"}</p>
                              <p>{master && master.stkGrpRefNo ? master.stkGrpRefNo : "\u00A0"}</p>
                              <p>{master && master.headOfFamily ? getValueByList(headOfFamily, master.headOfFamily) : "\u00A0"}</p>
                            </div> */}

                            <div className="table-responsive-md col-12 col-md-12 col-sm-12">
                              <table className="table table-borderless table-sm">
                                <tbody>
                                  <tr>
                                    <td className="m-0 grid-text"><p>CNIC Issued Date</p></td>
                                    <td className="m-1"><p>{master && master.stkCNicIssuedDate ? master.stkCNicIssuedDate : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Customer Name</p></td>
                                    <td className="m-1"><p>{master && master.stkCusName ? master.stkCusName : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Other Name</p></td>
                                    <td className="m-1"><p>{master && master.stkOtherName ? master.stkOtherName : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Gender</p></td>
                                    <td className="m-1"><p>{master && master.stkGender ? getValueByList(genders, master.stkGender) : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Father/ Husband Name</p></td>
                                    <td className="m-1"><p>{master && master.stkFatherOrHusName ? master.stkFatherOrHusName : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Educational Qualification</p></td>
                                    <td className="m-1"><p>{master && master.stkEduLevel ? getValueByList(educationalLevels, master.stkEduLevel) : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>There is a Physical Disability</p></td>
                                    <td className="m-1"><p>{master && master.stkPhysDisabilityDesce ? master.stkPhysDisabilityDesce : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>House Hold Contribution</p></td>
                                    <td className="m-1"><p>{master && master.houseHoldCont ? getValueByList(houseHoldContribution, master.houseHoldCont) : "\u00A0"}</p></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            {/* <div item className="col-6 col-md-6 col-sm-6 grid-text">
                              <p>CNIC Issued Date</p>
                              <p>Customer Name</p>
                              <p>Other Name</p>
                              <p>Gender</p>
                              <p>Father/ Husband Name</p>
                              <p>Educational Qualification</p>
                              <p>There is a Physical Disability</p>
                              <p>House Hold Contribution</p>
                            </div>
                            <div item className="col-6 col-md-6 col-sm-6">
                              <p>{master && master.stkCNicIssuedDate ? master.stkCNicIssuedDate : "\u00A0"}</p>
                              <p>{master && master.stkCusName ? master.stkCusName : "\u00A0"}</p>
                              <p>{master && master.stkOtherName ? master.stkOtherName : "\u00A0"}</p>
                              <p>{master && master.stkGender ? getValueByList(genders, master.stkGender) : "\u00A0"}</p>
                              <p>{master && master.stkFatherOrHusName ? master.stkFatherOrHusName : "\u00A0"}</p>
                              <p>{master && master.stkEduLevel ? getValueByList(educationalLevels, master.stkEduLevel) : "\u00A0"}</p>
                              <p>{master && master.stkPhysDisabilityDesce ? master.stkPhysDisabilityDesce : "\u00A0"}</p>
                              <p>{master && master.houseHoldCont ? getValueByList(houseHoldContribution, master.houseHoldCont) : "\u00A0"}</p>
                            </div> */}
                          </div>
                        </div>
                      </Row>
                    </div>
                  </Collapse>
                </div>}

                {contact.length > 0 && <div className="accordion-item">
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
                            <div className="container row" key={index}>
                              <div className="col-6 col-md-6 col-sm-6 grid-text">
                                <span key={index}>
                                  <p>Phone No Type</p>
                                  <p>Phone No</p>
                                </span>
                              </div>
                              <div className="col-6 col-md-6 col-sm-6">
                                <span key={index}>
                                  <p>{item.phoneNoType}</p>
                                  <p>{item.phoneNo}</p>
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Row>

                      <hr></hr>

                      <Row>
                        <div className="table-responsive-lg text-muted d-flex">
                          {residentials.map((residential, index) => (
                            <table className="table table-sm" key={index}>
                              <tbody>
                                <tr>
                                  <td><p className="m-0 grid-text">Address Type</p></td>
                                  <td><p className="m-1">{residential && residential.addressType ? getValueAddressType(residential.addressType) : "\u00A0"}</p></td>
                                </tr>
                                {/* <tr>
                                  <td><p className="m-0 grid-text">Same as the Residential Address</p></td>
                                  <td><p className="m-0">{residential && residential.same ? residential.same : "\u00A0"}</p></td>
                                </tr> */}
                                <tr>
                                  <td><p className="m-0 grid-text">Address Line 1</p></td>
                                  <td><p className="m-1">{residential && residential.addressLine1 ? residential.addressLine1 : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Address Line 2</p></td>
                                  <td><p className="m-1">{residential && residential.addressLine2 ? residential.addressLine2 : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Address Line 3</p></td>
                                  <td><p className="m-1">{residential && residential.addressLine3 ? residential.addressLine3 : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Address Line 4</p></td>
                                  <td><p className="m-1">{residential && residential.addressLine4 ? residential.addressLine4 : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Area</p></td>
                                  <td><p className="m-1">{residential && residential.area ? residential.area : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">City</p></td>
                                  <td><p className="m-1">{residential && residential.city ? residential.city : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Distric</p></td>
                                  <td><p className="m-1">{residential && residential.district ? residential.district : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Province</p></td>
                                  <td><p className="m-1">{residential && residential.province ? residential.province : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Community</p></td>
                                  <td><p className="m-1">{residential && residential.community ? getValueByList(communities, residential.community) : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Nearby Popular Places</p></td>
                                  <td><p className="m-1">{residential && residential.nearByPopPlc ? residential.nearByPopPlc : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Duration of Current Location</p></td>
                                  <td><p className="m-1">{residential && residential.durOfCurrLoc ? residential.durOfCurrLoc : "\u00A0"}</p></td>
                                </tr>
                                <tr>
                                  <td><p className="m-0 grid-text">Residence Type</p></td>
                                  <td><p className="m-1">{residential && residential.residenceType ? getValueByList(residantals, residential.residenceType) : "\u00A0"}</p></td>
                                </tr>
                              </tbody>
                            </table>
                            // <div className="container row" key={index}>
                            //   <div item className="col-6 col-md-6 col-sm-6 grid-text">
                            //     <p>Address Type</p>
                            //     <p>Same as the Residential Address</p>
                            //     <p>Address Line 1</p>
                            //     <p>Address Line 2</p>
                            //     <p>Address Line 3</p>
                            //     <p>Address Line 4</p>
                            //     <p>Area</p>
                            //     <p>City</p>
                            //     <p>Distric</p>
                            //     <p>Province</p>
                            //     <p>Community</p>
                            //     <p>Nearby Popular Places</p>
                            //     <p>Duration of Current Location</p>
                            //     <p>Residence Type</p>
                            //   </div>
                            //   <div item className="col-6 col-md-6 col-sm-6">
                            //     <p>{residential && residential.addressType ? getValueAddressType(residential.addressType) : "\u00A0"}</p>
                            //     <p>{residential && residential.same ? residential.same : "\u00A0"}</p>
                            //     <p>{residential && residential.addressLine1 ? residential.addressLine1 : "\u00A0"}</p>
                            //     <p>{residential && residential.addressLine2 ? residential.addressLine2 : "\u00A0"}</p>
                            //     <p>{residential && residential.addressLine3 ? residential.addressLine3 : "\u00A0"}</p>
                            //     <p>{residential && residential.addressLine4 ? residential.addressLine4 : "\u00A0"}</p>
                            //     <p>{residential && residential.area ? residential.area : "\u00A0"}</p>
                            //     <p>{residential && residential.city ? residential.city : "\u00A0"}</p>
                            //     <p>{residential && residential.district ? residential.district : "\u00A0"}</p>
                            //     <p>{residential && residential.province ? residential.province : "\u00A0"}</p>
                            //     <p>{residential && residential.community ? getValueByList(communities, residential.community) : "\u00A0"}</p>
                            //     <p>{residential && residential.nearByPopPlc ? residential.nearByPopPlc : "\u00A0"}</p>
                            //     <p>{residential && residential.durOfCurrLoc ? residential.durOfCurrLoc : "\u00A0"}</p>
                            //     <p>{residential && residential.residenceType ? getValueByList(residantals, residential.residenceType) : "\u00A0"}</p>
                            //   </div>
                            // </div>
                          ))}
                        </div>
                      </Row>
                    </div>
                  </Collapse>
                </div>}

                {income !== null && <div className="accordion-item">
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
                      GUARANTOR INCOME/ASSET DETAILS
                    </button>
                  </h2>
                  <Collapse
                    isOpen={insuranceCol}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <Row>
                        <div className="text-muted d-flex">
                          <div className="container row">
                            <div className="table-responsive-md col-12 col-md-12 col-sm-12">
                              <table className="table table-borderless table-sm">
                                <tbody>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Source of Income</p></td>
                                    <td className="m-1"><p>{income && income.sourceOfIncome ? income.sourceOfIncome : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Monthly Income</p></td>
                                    <td className="m-1"><p>{income && income.monthlyIncome ? format(income.monthlyIncome) : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Asset Description</p></td>
                                    <td className="m-1"><p>{income && income.assetsDesc ? income.assetsDesc : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Total Value Assets</p></td>
                                    <td className="m-1"><p>{income && income.totValAssets ? income.totValAssets : "\u00A0"}</p></td>
                                  </tr>
                                  <tr>
                                    <td className="m-0 grid-text"><p>Total Monthly Income</p></td>
                                    <td className="m-1"><p>{income && income.totMonIncome ? income.totMonIncome : "\u00A0"}</p></td>
                                  </tr>
                                </tbody>

                              </table>
                            </div>
                            {/* <div item className="col-6 col-md-6 col-sm-6 grid-text">
                              <p>Source of Income</p>
                              <p>Monthly Income</p>
                              <p>Asset Description</p>
                              <p>Total Value Assets</p>
                              <p>Total Monthly Income</p>
                            </div>
                            <div item className="col-6 col-md-6 col-sm-6">
                              <p>{income && income.sourceOfIncome ? income.sourceOfIncome : "\u00A0"}</p>
                              <p>{income && income.monthlyIncome ? format(income.monthlyIncome) : "\u00A0"}</p>
                              <p>{income && income.assetsDesc ? income.assetsDesc : "\u00A0"}</p>
                              <p>{income && income.totValAssets ? income.totValAssets : "\u00A0"}</p>
                              <p>{income && income.totMonIncome ? income.totMonIncome : "\u00A0"}</p>
                            </div> */}
                          </div>
                        </div>
                      </Row>
                    </div>
                  </Collapse>
                </div>}

                {signature.length > 0 && <div className="accordion-item">
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
                      GUARANTOR ACKNOWLEDGEMENT AND SIGNATURE
                    </button>
                  </h2>
                  <Collapse
                    isOpen={otherCol}
                    className="accordion-collapse"
                  >
                    {/* TODO */}
                    <div className="accordion-body">
                      <Row>
                        <div className="text-muted d-flex">
                          <div className="col-12 col-md-12 col-sm-12">
                            <Card className="witness-signature-card">
                              <p style={{ textAlign: 'right' }}>
                                {getGuarantorAknowledgement()}
                              </p>
                            </Card>
                          </div>
                        </div>
                      </Row>
                      <Row>
                        <div className="text-muted d-flex">
                          <div className="col-6 col-md-6 col-sm-6">
                            <Card className="witness-signature-card">
                              <p>Guarantor Thumbnail</p>
                              {thumb && thumb.length > 0 && thumb.map((sign, index) => (
                                sign.status === "A" && <AsyncImage src={sign.hashIdentifier} key={index} />
                              ))}
                            </Card>
                          </div>
                          <div className="col-6 col-md-6 col-sm-6">
                            <Card className="witness-signature-card">
                              <p>Guarantor Signature</p>
                              {signature && signature.length > 0 && signature.map((sign, index) => (
                                sign.status === "A" && <AsyncImage src={sign.hashIdentifier} key={index} />
                              ))}
                            </Card>
                          </div>
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

GuarantorDetails.propTypes = {
  active: PropTypes.string
};

export default GuarantorDetails;
