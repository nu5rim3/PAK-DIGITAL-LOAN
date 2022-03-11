import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  CardTitle,
  Card,
  Collapse,
  Table,
  CardBody,
  CardText,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  TabContent
} from "reactstrap";

import Grid from '@material-ui/core/Grid'

import classnames from "classnames";

import moment from "moment";

import Loader from "components/Loader";

// APIs
import {
  /* TYPE OF BUSINESS */
  getAllJobs,
  getAllNatureOfEmp,
  getAllApplicantDistance,
  getAllSalaryInformation,
  getAllRepeatCustomers,
  getAllNatureOfBusiness,
  getAllBusinessOwnerships,
  getAllLoanPurpose,
  getValueNatureOfBorrowe,
  getAllCultivationOwnership,
  getAllOwnershipResidance,
  getAllFloodFactors,
  getAllIrrigations,
  getAllMethodUseAgriMachine,
  getAllCultivationProofs,
  getAllFieldVerification,
  getAllOtherIncomeCategories,
  getValueOwnershipOfLand,
} from "services/common.service";
import {
  getTcDetails,
} from "services/tc.service";
import {
  getSalaryLoanDetails,
  getLoanBusinessDetails,
  getLiveStockDetails,
  getCultivationLoanDetails,
  getBaraKarobarLoanEmployeeDetails,
  getBaraKarobarLoanSupplierDetails,
  getBaraKarobarLoanPermanetDetails,
  getBaraKarobarLoanSwotDetails,
  getOtherIncomeDetails,
  getSignature,
} from "services/loan.service";
import {
  getValueByList
} from "services/util.service";

import AsyncImage from "../ImageDetails/async_images";

const LoanDetails = (props) => {

  const { appraisalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  /* COMMON */
  const [jobs, setJobs] = useState([]);
  const [natureOfEmp, setNatureOfEmp] = useState([]);
  const [applicantDistance, setApplicantDistance] = useState([]);
  const [salaryInformation, setSalaryInformation] = useState([]);
  const [repeatCustomers, setRepeatCustomers] = useState([]);
  const [natureOfBusiness, setNatureOfBusiness] = useState([]);
  const [businessOwnerships, setBusinessOwnerships] = useState([]);
  const [loanPurpose, setLoanPurpose] = useState([]);
  const [ownOfCultivation, setOwnOfCultivation] = useState([]);
  const [valueNatureOfBorrowe, setValueNatureOfBorrowe] = useState([]);
  const [ownershipResidance, setOwnershipResidance] = useState([]);
  const [floodFactors, setFloodFactors] = useState([]);
  const [irrigations, setIrrigations] = useState([]);
  const [methodUseAgriMachine, setMethodUseAgriMachine] = useState([]);
  const [cultivationProofs, setCultivationProofs] = useState([]);
  const [fieldVerification, setFieldVerification] = useState([]);
  const [otherIncomeCategories, setOtherIncomeCategories] = useState([]);

  const [tcDetails, setTcDetails] = useState({});
  const [salaryLoanDetails, setSalaryLoanDetails] = useState(null);
  const [businessLoanDetails, setBusinessLoanDetails] = useState(null);
  const [liveStockLoanDetails, setLiveStockLoanDetails] = useState(null);
  const [cultivationLoanDetails, setCultivationLoanDetails] = useState(null);
  const [baraKarobarEmployeeLoanDetails, setBaraKarobarEmployeeLoanDetails] = useState(null);
  const [baraKarobarSupplierLoanDetails, setBaraKarobarSupplierLoanDetails] = useState(null);
  const [baraKarobarPermanetLoanDetails, setBaraKarobarPermanetLoanDetails] = useState(null);
  const [baraKarobarSwotLoanDetails, setBaraKarobarSwotLoanDetails] = useState(null);
  const [otherIncomeDetails, setOtherIncomeDetails] = useState(null);
  const [signature, setSignature] = useState([]);

  const [salaryIndividuaDetailsAccn, setSalaryIndividuaDetailsAccn] = useState(true);
  const [loanBusinessDetailsAccn, setLoanBusinessDetailsAccn] = useState(true);
  const [liveStockLoanDetailsAccn, setLiveStockLoanDetailsAccn] = useState(true);
  const [cultivationDetailsAccn, setCultivationDetailsAccn] = useState(true);
  const [baraKarobarLoanDetailsAccn, setBaraKarobarLoanDetailsAccn] = useState(true);
  const [otherIncomeDetailsAccn, setOtherIncomeDetailsAccn] = useState(true);

  const [toggleBusinessVerticalTab, setToggleBusinessVerticalTab] = useState(0);
  const [toggleSupplierVerticalTab, setToggleSupplierVerticalTab] = useState(0);
  const [togglePermanentBusinessVerticalTab, setTogglePermanentBusinessVerticalTab] = useState(0);
  const [toggleOtherIncomeVerticalTab, setToggleOtherIncomeVerticalTab] = useState(0);

  const handleSalaryIndividuaDetails = () => {
    setSalaryIndividuaDetailsAccn(!salaryIndividuaDetailsAccn);
    setLoanBusinessDetailsAccn(false);
    setLiveStockLoanDetailsAccn(false);
    setCultivationDetailsAccn(false);
    setBaraKarobarLoanDetailsAccn(false);
    setOtherIncomeDetailsAccn(false);
  }

  const handleLoanBusinessDetails = () => {
    setSalaryIndividuaDetailsAccn(false);
    setLoanBusinessDetailsAccn(!loanBusinessDetailsAccn);
    setLiveStockLoanDetailsAccn(false);
    setCultivationDetailsAccn(false);
    setBaraKarobarLoanDetailsAccn(false);
    setOtherIncomeDetailsAccn(false);
  }

  const handleLiveStockLoanDetails = () => {
    setSalaryIndividuaDetailsAccn(false);
    setLoanBusinessDetailsAccn(false);
    setLiveStockLoanDetailsAccn(!liveStockLoanDetailsAccn);
    setCultivationDetailsAccn(false);
    setBaraKarobarLoanDetailsAccn(false);
    setOtherIncomeDetailsAccn(false);
  }

  const handleCultivationDetails = () => {
    setSalaryIndividuaDetailsAccn(false);
    setLoanBusinessDetailsAccn(false);
    setLiveStockLoanDetailsAccn(false);
    setCultivationDetailsAccn(!cultivationDetailsAccn);
    setBaraKarobarLoanDetailsAccn(false);
    setOtherIncomeDetailsAccn(false);
  }

  const handleBaraKarobarLoanDetails = () => {
    setSalaryIndividuaDetailsAccn(false);
    setLoanBusinessDetailsAccn(false);
    setLiveStockLoanDetailsAccn(false);
    setCultivationDetailsAccn(false);
    setBaraKarobarLoanDetailsAccn(!baraKarobarLoanDetailsAccn);
    setOtherIncomeDetailsAccn(false);
  }

  const handleOtherIncomeDetails = () => {
    setSalaryIndividuaDetailsAccn(false);
    setLoanBusinessDetailsAccn(false);
    setLiveStockLoanDetailsAccn(false);
    setCultivationDetailsAccn(false);
    setBaraKarobarLoanDetailsAccn(false);
    setOtherIncomeDetailsAccn(!otherIncomeDetailsAccn);
  }

  const toggleBusinessVertical = (tab) => {
    if (toggleBusinessVerticalTab !== tab) setToggleBusinessVerticalTab(tab);
  }

  const toggleSupplierVertical = (tab) => {
    if (toggleSupplierVerticalTab !== tab) setToggleSupplierVerticalTab(tab);
  }

  const togglePermanentBusinessVertical = (tab) => {
    if (togglePermanentBusinessVerticalTab !== tab) setTogglePermanentBusinessVerticalTab(tab);
  }

  const toggleOtherIncomeVertical = (tab) => {
    if (toggleOtherIncomeVerticalTab !== tab) setToggleOtherIncomeVerticalTab(tab);
  }

  useEffect(() => {
    var _isMounted = true;

    setIsLoading(true);

    const fetchData = async () => {
      if (props.active === "5") {

        const tcDetails = await getTcDetails(appraisalId);
        if (_isMounted) {
          setTcDetails(tcDetails);
        }

        /* COMMON */
        if (tcDetails !== undefined) {
          const applicantDistance = await getAllApplicantDistance(tcDetails.pTrhdLType);
          const salaryInfoResponse = await getAllSalaryInformation(tcDetails.pTrhdLType);
          const repeatCusResponse = await getAllRepeatCustomers(tcDetails.pTrhdLType);
          const bnsOwnershipResponse = await getAllBusinessOwnerships(tcDetails.pTrhdLType);
          const loanPurposeResponse = await getAllLoanPurpose(tcDetails.pTrhdLType);
          const cultOwnResponse = await getAllCultivationOwnership(tcDetails.pTrhdLType);
          const ownerResidanceResponse = await getAllOwnershipResidance(tcDetails.pTrhdLType);
          const floodFactResponse = await getAllFloodFactors(tcDetails.pTrhdLType);
          const irrigationResponse = await getAllIrrigations(tcDetails.pTrhdLType);
          const agriMachineResponse = await getAllMethodUseAgriMachine(tcDetails.pTrhdLType);
          const cultivationProofResponse = await getAllCultivationProofs(tcDetails.pTrhdLType);
          const fieldVeriResponse = await getAllFieldVerification(tcDetails.pTrhdLType);
          
          if (_isMounted) {
            setSalaryInformation(salaryInfoResponse);
            setRepeatCustomers(repeatCusResponse);
            setBusinessOwnerships(bnsOwnershipResponse);
            setLoanPurpose(loanPurposeResponse);
            setOwnOfCultivation(cultOwnResponse);
            setOwnershipResidance(ownerResidanceResponse);
            setFloodFactors(floodFactResponse);
            setIrrigations(irrigationResponse);
            setMethodUseAgriMachine(agriMachineResponse);
            setCultivationProofs(cultivationProofResponse);
            setFieldVerification(fieldVeriResponse);
          }
        }

        const jobsResponse = await getAllJobs();
        const natureOfEmpResponse = await getAllNatureOfEmp();
        
        const natureOfBnsResponse = await getAllNatureOfBusiness();
        const incomeCatResponse = await getAllOtherIncomeCategories();
        const signatureResponse = await getSignature(appraisalId, "C");

        const salaryLoanDetails = await getSalaryLoanDetails(appraisalId);
        const businessLoanDetails = await getLoanBusinessDetails(appraisalId);
        const liveStockLoanDetails = await getLiveStockDetails(appraisalId);
        const cultivationLoanDetails = await getCultivationLoanDetails(appraisalId);
        const baraKarobarLoanEmployeeDetails = await getBaraKarobarLoanEmployeeDetails(appraisalId);
        const baraKarobarLoanSupplierDetails = await getBaraKarobarLoanSupplierDetails(appraisalId);
        const baraKarobarLoanPermanetDetails = await getBaraKarobarLoanPermanetDetails(appraisalId);
        const baraKarobarLoanSwotDetails = await getBaraKarobarLoanSwotDetails(appraisalId);
        const otherIncomeDetails = await getOtherIncomeDetails(appraisalId);

        if (_isMounted) {
          /* COMMON */
          setJobs(jobsResponse);
          setNatureOfEmp(natureOfEmpResponse);
          setApplicantDistance(applicantDistance);
          setNatureOfBusiness(natureOfBnsResponse);
          setOtherIncomeCategories(incomeCatResponse);

          setSalaryLoanDetails(salaryLoanDetails);
          setBusinessLoanDetails(businessLoanDetails);
          setLiveStockLoanDetails(liveStockLoanDetails);
          setCultivationLoanDetails(cultivationLoanDetails);
          setBaraKarobarEmployeeLoanDetails(baraKarobarLoanEmployeeDetails);
          setBaraKarobarSupplierLoanDetails(baraKarobarLoanSupplierDetails);
          setBaraKarobarPermanetLoanDetails(baraKarobarLoanPermanetDetails);
          setBaraKarobarSwotLoanDetails(baraKarobarLoanSwotDetails);
          setOtherIncomeDetails(otherIncomeDetails);
          setSignature(signatureResponse);

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
            <div className="accordion accordion-flush">
              
              {salaryLoanDetails && salaryLoanDetails !== undefined && <div className="accordion-item mt-4">
                <h2 className="accordion-header">
                  <button
                    className={classnames(
                      "accordion-button",
                      "fw-medium",
                      { collapsed: !salaryIndividuaDetailsAccn }
                    )}
                    type="button"
                    onClick={handleSalaryIndividuaDetails}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="m-0">SALARY/INDIVIDUAL LOAN</p>
                  </button>
                </h2>

                <Collapse
                  isOpen={salaryIndividuaDetailsAccn}
                  className="accordion-collapse"
                >
                  <div className="accordion-body">
                    <Row>
                      <div className="text-muted d-flex">
                        <Grid container spacing={10}>
                          <Grid item className="grid-text">
                            <p>Profession</p>
                            <p>Source of Income</p>
                            <p>Employer</p>
                            <p>Type of Business</p>
                            <p>Designation</p>
                            <p>Experience</p>
                            <p>Employer address</p>
                            <p>Type of Job</p>
                          </Grid>
                          <Grid item>
                            <p>{salaryLoanDetails && salaryLoanDetails.profession ? salaryLoanDetails.profession : "\u00A0"}</p>
                            <p>{salaryLoanDetails && salaryLoanDetails.sourceOfIncome ? salaryLoanDetails.sourceOfIncome : "\u00A0"}</p>
                            <p>{salaryLoanDetails && salaryLoanDetails.employer ? salaryLoanDetails.employer : "\u00A0"}</p>
                            <p>{salaryLoanDetails && salaryLoanDetails.typeOfBusiness ? getValueByList(natureOfBusiness, salaryLoanDetails.typeOfBusiness) : "\u00A0"}</p>
                            <p>{salaryLoanDetails && salaryLoanDetails.designation ? salaryLoanDetails.designation : "\u00A0"}</p>
                            <p>{salaryLoanDetails && salaryLoanDetails.currEmpPeriod ? salaryLoanDetails.currEmpPeriod : "\u00A0"}</p>
                            <p>{salaryLoanDetails && salaryLoanDetails.empAddress ? salaryLoanDetails.empAddress : "\u00A0"}</p>
                            <p>{salaryLoanDetails && salaryLoanDetails.typeOfJob ? getValueByList(jobs, salaryLoanDetails.typeOfJob) : "\u00A0"}</p>
                          </Grid>

                          <Grid item className="grid-text">
                            <p>Nature of Employment</p>
                            <p>Residence or working place of applicant is above 15km, of branch / service center.</p>
                            <p>Salary information, Proof of Salary</p>
                            <p>Repeat Customer</p>
                            <p>Contact No</p>
                          </Grid>
                          <Grid item>
                            <p>{salaryLoanDetails && salaryLoanDetails.natureOfEmp ? getValueByList(natureOfEmp, salaryLoanDetails.natureOfEmp) : "\u00A0"}</p>
                            <p>{salaryLoanDetails && salaryLoanDetails.residenceOrWorking ? getValueByList(applicantDistance, salaryLoanDetails.residenceOrWorking) : "\u00A0"}</p>
                            <p>{salaryLoanDetails && salaryLoanDetails.proofOfSalary ? getValueByList(salaryInformation, salaryLoanDetails.proofOfSalary) : "\u00A0"}</p>
                            <p>{salaryLoanDetails && salaryLoanDetails.repeatCustomer ? getValueByList(repeatCustomers, salaryLoanDetails.repeatCustomer) : "\u00A0"}</p>
                            <p>{salaryLoanDetails && salaryLoanDetails.contactNo ? salaryLoanDetails.contactNo : "\u00A0"}</p>
                          </Grid>
                        </Grid>
                      </div>
                    </Row>
                  </div>
                </Collapse>
              </div>}

              {businessLoanDetails && businessLoanDetails.length > 0 && <div className="accordion-item mt-4">
                <h2 className="accordion-header">
                  <button
                    className={classnames(
                      "accordion-button",
                      "fw-medium",
                      { collapsed: !loanBusinessDetailsAccn }
                    )}
                    type="button"
                    onClick={handleLoanBusinessDetails}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="m-0">INDIVIDUAL LOAN BUSINESS DETAILS</p>
                  </button>
                </h2>

                <Collapse
                  isOpen={loanBusinessDetailsAccn}
                  className="accordion-collapse"
                >
                  <div className="accordion-body p-0 mt-4">
                    <Row>
                      <Col md="3">
                        <Nav pills className="flex-column">
                          {businessLoanDetails && businessLoanDetails.map((item, index) => (
                            <NavItem key={index}>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  "mb-2": true,
                                  active: toggleBusinessVerticalTab === index,
                                })}
                                onClick={() => {
                                  toggleBusinessVertical(index);
                                }}
                              >
                                Business 0{index + 1}
                              </NavLink>
                            </NavItem>
                          ))}
                        </Nav>
                      </Col>
                      <Col md="9">
                        <TabContent
                          activeTab={toggleBusinessVerticalTab}
                          className="text-muted mt-4 mt-md-0"
                        >
                          {businessLoanDetails && businessLoanDetails.map((item, index) => (
                            <TabPane key={index} tabId={index}>
                              <Row>
                                <div className="text-muted d-flex">
                                  <Grid container spacing={10}>
                                    <Grid item className="grid-text">
                                      <p>Business Name</p>
                                      <p>Nature of Business</p>
                                      <p>Business Address</p>
                                      <p>Phone No</p>
                                      <p>Description</p>
                                      <p>Previous Experience in Business</p>
                                      <p>Ownership of Business Place</p>
                                      <p>Business Assets + Stocks</p>
                                      <p>Repeat Customer</p>
                                    </Grid>
                                    <Grid item>
                                      <p>{item && item.bnsName ? item.bnsName : "\u00A0"}</p>
                                      <p>{item && item.natureOfBns ? getValueByList(natureOfBusiness, item.natureOfBns) : "\u00A0"}</p>
                                      <p>{item && item.bnsAddress ? item.bnsAddress : "\u00A0"}</p>
                                      <p>{item && item.phoneNo ? item.phoneNo : "\u00A0"}</p>
                                      <p>{item && item.description ? item.description : "\u00A0"}</p>
                                      <p>{item && item.prevExpInBns ? item.prevExpInBns : "\u00A0"}</p>
                                      <p>{item && item.ownOfBnsPlace ? getValueOwnershipOfLand(item.ownOfBnsPlace) : "\u00A0"}</p>
                                      <p>{item && item.costOfBns ? item.costOfBns : "\u00A0"}</p>
                                      <p>{item && item.repeatCustomer ? getValueByList(repeatCustomers, item.repeatCustomer) : "\u00A0"}</p>

                                    </Grid>
                                  </Grid>
                                </div>
                              </Row>
                            </TabPane>
                          ))}
                        </TabContent>
                      </Col>
                    </Row>
                  </div>
                </Collapse>
              </div>}

              {liveStockLoanDetails && liveStockLoanDetails !== undefined && <div className="accordion-item mt-4">
                <h2 className="accordion-header">
                  <button
                    className={classnames(
                      "accordion-button",
                      "fw-medium",
                      { collapsed: !liveStockLoanDetailsAccn }
                    )}
                    type="button"
                    onClick={handleLiveStockLoanDetails}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="m-0">LIVE STOCK LOAN DETAILS</p>
                  </button>
                </h2>

                <Collapse
                  isOpen={liveStockLoanDetailsAccn}
                  className="accordion-collapse"
                >
                  <div className="accordion-body">
                    <Row>
                      <div className="text-muted d-flex">
                        <Grid container spacing={10}>
                          <Grid item className="grid-text">
                            <p>Borrower District</p>
                            <p>S/O, W/O, D/O</p>
                            <p>Loan Tenure in Days</p>
                            <p>Insurance Company</p>
                            <p>Date of Policy Issued</p>
                            <p>{'\u00A0'}</p>
                            <p>Premium Paid Receipt No</p>
                            <p>Premium Rate</p>
                            <p>Animal/ Crop</p>
                            <p>Number of Animals Insured</p>
                            <p>{'\u00A0'}</p>
                            <p>{'\u00A0'}</p>
                            <p>Collateral Against which Loan Given</p>
                            <p>Number of Times Claim Lodged</p>
                          </Grid>
                          <Grid item>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.borrowerDistrict ? liveStockLoanDetails.borrowerDistrict : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.sowodo ? liveStockLoanDetails.sowodo : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.loanTenure ? liveStockLoanDetails.loanTenure : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.insCompany ? liveStockLoanDetails.insCompany : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.policyIssuedDate ? new moment(liveStockLoanDetails.policyIssuedDate).format("Y-MM-DD") : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.policyExpiredDate ? new moment(liveStockLoanDetails.policyExpiredDate).format("Y-MM-DD") : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.receiptNo ? liveStockLoanDetails.receiptNo : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.premiumRate ? liveStockLoanDetails.premiumRate : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.animalOrCrop ? liveStockLoanDetails.animalOrCrop : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.buffaloes ? "Buffaloes: " + liveStockLoanDetails.buffaloes : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.cows ? "Cows: " + liveStockLoanDetails.cows : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.bulls ? "Bulls: " + liveStockLoanDetails.bulls : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.collateral ? liveStockLoanDetails.collateral : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.claimLodged ? liveStockLoanDetails.claimLodged : "\u00A0"}</p>
                          </Grid>

                          <Grid item className="grid-text">
                            <p>Animal Tagging</p>
                            <p>Purpose of Loan</p>
                            <p>Nature of the borrower</p>
                            <p>Ownership of Land</p>
                            <p>Floods Factor</p>
                            <p>Irrigation</p>
                            <p>Methods use for Agriculture Machineries</p>
                            <p>Proof of Cultivation</p>
                            <p>Experience in Cultivation</p>
                            <p>Market Check through Field Verification</p>
                            <p>Agri Secured</p>
                          </Grid>
                          <Grid item>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.animalTagging ? liveStockLoanDetails.animalTagging : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.purposeOfLoan ? getValueByList(loanPurpose, liveStockLoanDetails.purposeOfLoan) : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.natureOfTheBorrower ? getValueNatureOfBorrowe(liveStockLoanDetails.natureOfTheBorrower) : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.ownOfLand ? getValueOwnershipOfLand(liveStockLoanDetails.ownOfLand) : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.floodsFactor ? getValueByList(floodFactors, liveStockLoanDetails.floodsFactor) : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.irrigation ? getValueByList(irrigations, liveStockLoanDetails.irrigation) : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.methods ? getValueByList(methodUseAgriMachine, liveStockLoanDetails.methods) : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.proofOfCult ? getValueByList(cultivationProofs, liveStockLoanDetails.proofOfCult) : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.expInCult ? liveStockLoanDetails.expInCult : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.marketCheck ? getValueByList(fieldVerification, liveStockLoanDetails.marketCheck) : "\u00A0"}</p>
                            <p>{liveStockLoanDetails && liveStockLoanDetails.agriSecured ? liveStockLoanDetails.agriSecured : "\u00A0"}</p>
                          </Grid>

                          <Grid item >
                            {/* TODO */}
                            <Card className="witness-signature-card">
                              <p>Customer Signature</p>
                              {signature && signature.length > 0 && signature.map((sign, index) => (
                                sign.status === "A" && <AsyncImage src={sign.imgPath} key={index} />
                              ))}
                            </Card>
                          </Grid>
                        </Grid>
                      </div>
                    </Row>
                  </div>
                </Collapse>
              </div>}

              {cultivationLoanDetails && cultivationLoanDetails !== undefined && <div className="accordion-item mt-4">
                <h2 className="accordion-header">
                  <button
                    className={classnames(
                      "accordion-button",
                      "fw-medium",
                      { collapsed: !cultivationDetailsAccn }
                    )}
                    type="button"
                    onClick={handleCultivationDetails}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="m-0">CULTIVATION DETAILS</p>
                  </button>
                </h2>

                <Collapse
                  isOpen={cultivationDetailsAccn}
                  className="accordion-collapse"
                >
                  <div className="accordion-body">
                    <Row>
                      <div className="text-muted d-flex">
                        <Grid container spacing={10}>
                          <Grid item className="grid-text">
                            <p>Nature of the borrower</p>
                            <p>{'\u00A0'}</p>
                            <p>Ownership of Land</p>
                            <p>Particulars of the owner of the land</p>
                            <p>{'\u00A0'}</p>
                            <p>{'\u00A0'}</p>
                            <p>{'\u00A0'}</p>
                            <p>Land Under Cultivation in Acres</p>
                            <p>{'\u00A0'}</p>
                            <p>{'\u00A0'}</p>
                          </Grid>
                          <Grid item>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.natureOfTheBorrower ? getValueNatureOfBorrowe(cultivationLoanDetails.natureOfTheBorrower) : "\u00A0"}</p>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.ownOfCult ? getValueByList(ownOfCultivation, cultivationLoanDetails.ownOfCult) : "\u00A0"}</p>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.ownOfLand ? getValueOwnershipOfLand(cultivationLoanDetails.ownOfLand) : "\u00A0"}</p>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.ownName ? "Name: " + cultivationLoanDetails.ownName : "\u00A0"}</p>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.ownCNIC ? "CNIC: " + cultivationLoanDetails.ownCNIC : "\u00A0"}</p>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.ownAddress ? "Address: " + cultivationLoanDetails.ownAddress : "\u00A0"}</p>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.ownContact ? "Contact: " + cultivationLoanDetails.ownContact : "\u00A0"}</p>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.acresOwned ? "Owned: " + cultivationLoanDetails.acresOwned : "\u00A0"}</p>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.acresRented ? "Rented: " + cultivationLoanDetails.acresRented : "\u00A0"}</p>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.acresTotal ? "Total: " + cultivationLoanDetails.acresTotal : "\u00A0"}</p>
                          </Grid>

                          <Grid item className="grid-text">
                            <p>Acres of Rabi</p>
                            <p>Harvesting Date</p>
                            <p>Cultivation Date </p>
                          </Grid>
                          <Grid item>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.acresOfRabi ? cultivationLoanDetails.acresOfRabi : "\u00A0"}</p>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.rabiHarvestingDate ? new moment(cultivationLoanDetails.rabiHarvestingDate).format("Y-MM-DD") : "\u00A0"}</p>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.rabiCultivationDate ? new moment(cultivationLoanDetails.rabiCultivationDate).format("Y-MM-DD") : "\u00A0"}</p>
                          </Grid>

                          <Grid item className="grid-text">
                            <p>Acres of Kharif</p>
                            <p>Harvesting Date</p>
                            <p>Cultivation Date</p>
                          </Grid>
                          <Grid item>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.acresOfKharif ? cultivationLoanDetails.acresOfKharif : "\u00A0"}</p>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.kharifHarvestingDate ? new moment(cultivationLoanDetails.kharifHarvestingDate).format("Y-MM-DD") : "\u00A0"}</p>
                            <p>{cultivationLoanDetails && cultivationLoanDetails.kharifCultivationDate ? new moment(cultivationLoanDetails.kharifCultivationDate).format("Y-MM-DD") : "\u00A0"}</p>
                          </Grid>
                        </Grid>
                      </div>
                    </Row>

                    <hr></hr>

                    <Row>
                      <div className="text-muted d-flex">
                        <Col xs={6} className="grid-text">
                          <p>Location of Land</p>
                          <p>{'\u00A0'}</p>
                          <p>Deh/Tehsi/District</p>
                          <p>Crops to be Cultivated</p>
                          <p>{'\u00A0'}</p>
                          <p>Crops Name</p>
                          <p>Land Details</p>
                          <p>Comment</p>
                        </Col>
                        <Col xs={6}>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.ownLandLoc ? cultivationLoanDetails.ownLandLoc : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.rentedLandLoc ? cultivationLoanDetails.rentedLandLoc : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.district ? cultivationLoanDetails.district : "\u00A0"}</p>
                          <Row>
                            <Col>
                              <p>{cultivationLoanDetails && cultivationLoanDetails.cropsToBeCult.length >= 1 ? cultivationLoanDetails.cropsToBeCult[0] : "\u00A0"}</p>
                            </Col>
                            <Col>
                              <p>{cultivationLoanDetails && cultivationLoanDetails.cropsToBeCult.length >= 2 ? cultivationLoanDetails.cropsToBeCult[1] : "\u00A0"}</p>
                            </Col>
                            <Col>
                              <p>{cultivationLoanDetails && cultivationLoanDetails.cropsToBeCult.length >= 3 ? cultivationLoanDetails.cropsToBeCult[2] : "\u00A0"}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p>{cultivationLoanDetails && cultivationLoanDetails.cropsToBeCult.length >= 4 ? cultivationLoanDetails.cropsToBeCult[3] : "\u00A0"}</p>
                            </Col>
                            <Col>
                              <p>{cultivationLoanDetails && cultivationLoanDetails.cropsToBeCult.length >= 5 ? cultivationLoanDetails.cropsToBeCult[4] : "\u00A0"}</p>
                            </Col>
                            <Col>
                              <p>{cultivationLoanDetails && cultivationLoanDetails.cropsToBeCult.length >= 6 ? cultivationLoanDetails.cropsToBeCult[5] : "\u00A0"}</p>
                            </Col>
                          </Row>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.cropsName ? cultivationLoanDetails.cropsName : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.landDetails ? cultivationLoanDetails.landDetails : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.comment ? cultivationLoanDetails.comment : "\u00A0"}</p>
                        </Col>
                      </div>
                    </Row>

                    <hr></hr>

                    <Row>
                      <div className="text-muted d-flex">
                        <Col xs={6} className="grid-text">
                          <p>Loan Limit in line with the SBP s per acre indicative</p>
                          <p>{'\u00A0'}</p>
                          <p>{'\u00A0'}</p>
                          <p>Purpose of Loan</p>
                          <p>Floods Factor</p>
                          <p>Irrigation</p>
                          <p>Methods use for Agriculture Machineries</p>
                          <p>Proof of Cultivation </p>
                          <p>Experience in Cultivation</p>
                          <p>Market Check through Field Verification</p>
                          <p>Agri Secured</p>
                        </Col>
                        <Col xs={6}>
                          <Row>
                            <Col>
                              <p>Rabi</p>
                            </Col>
                            <Col>
                              <p>{cultivationLoanDetails && cultivationLoanDetails.loanLimitRabi ? cultivationLoanDetails.loanLimitRabi : "\u00A0"}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p>Kharif</p>
                            </Col>
                            <Col>
                              <p>{cultivationLoanDetails && cultivationLoanDetails.loanLimitKharif ? cultivationLoanDetails.loanLimitKharif : "\u00A0"}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p>Total</p>
                            </Col>
                            <Col>
                              <p>{cultivationLoanDetails && cultivationLoanDetails.loanLimitTotal ? cultivationLoanDetails.loanLimitTotal : "\u00A0"}</p>
                            </Col>
                          </Row>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.purposeOfLoan ? getValueByList(loanPurpose, cultivationLoanDetails.purposeOfLoan) : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.floodsFactor ? getValueByList(floodFactors, cultivationLoanDetails.floodsFactor) : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.irrigation ? getValueByList(irrigations, cultivationLoanDetails.irrigation) : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.methods ? getValueByList(methodUseAgriMachine, cultivationLoanDetails.methods) : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.proofOfCult ? getValueByList(cultivationProofs, cultivationLoanDetails.proofOfCult) : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.expInCult ? cultivationLoanDetails.expInCult : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.marketCheck ? getValueByList(fieldVerification, cultivationLoanDetails.marketCheck) : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.agriSecured ? cultivationLoanDetails.agriSecured : "\u00A0"}</p>
                        </Col>
                      </div>
                    </Row>

                    <hr></hr>

                    <Row>
                      <div className="text-muted d-flex">
                        <Col xs={12}>
                          <Row>
                            <Col>
                              <p className="grid-text">Ownership</p>
                            </Col>
                            <Col>
                              <p className="grid-text">Quantity</p>
                            </Col>
                            <Col>
                              <p className="grid-text">Amount</p>
                            </Col>
                          </Row>
                          {cultivationLoanDetails && cultivationLoanDetails.assets.length > 0 && cultivationLoanDetails.assets.map((asset, index) => (
                            <Row key={index}>
                              <Col>
                                <p>{asset && asset.ownership}</p>
                              </Col>
                              <Col>
                                <p>{asset && asset.qty}</p>
                              </Col>
                              <Col>
                                <p>{asset && asset.amount}</p>
                              </Col>
                            </Row>
                          ))}
                        </Col>
                      </div>
                    </Row>

                    <p>{'\u00A0'}</p>

                    <Row>
                      <div className="text-muted d-flex">
                        <Col xs={12}>
                          <Row>
                            <Col>
                              <p>{'\u00A0'}</p>
                            </Col>
                            <Col>
                              <p className="grid-text">Total Assets Value</p>
                            </Col>
                            <Col>
                              <p className="grid-text">{cultivationLoanDetails && cultivationLoanDetails.totAssetsValue ? cultivationLoanDetails.totAssetsValue : "\u00A0"}</p>
                            </Col>
                          </Row>
                        </Col>
                      </div>
                    </Row>

                    <hr></hr>

                    <Row>
                      <div className="text-muted d-flex">
                        <Col xs={6} className="grid-text">
                          <p>Loan Tenure in Days</p>
                          <p>Insurance Company</p>
                          <p>Date of Policy Issued</p>
                          <p>{'\u00A0'}</p>
                          <p>Premium Paid Receipt No</p>
                          <p>Premium Rate</p>
                          <p>Premium Rate for Sugarcane</p>
                          <p>Evidence of Land Holding/Cultivation</p>
                          <p>Number of Times Claim Lodged</p>
                          <p>Other Information 1</p>
                          <p>Other Information 2</p>
                          <p>Other Information 3</p>
                        </Col>
                        <Col xs={6}>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.loanTenure ? cultivationLoanDetails.loanTenure : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.insCompany ? cultivationLoanDetails.insCompany : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.policyIssuedDate ? new moment(cultivationLoanDetails.policyIssuedDate).format("Y-MM-DD") : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.policyIssuedDate ? new moment(cultivationLoanDetails.policyIssuedDate).format("Y-MM-DD") : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.receiptNo ? cultivationLoanDetails.receiptNo : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.premiumRate ? cultivationLoanDetails.premiumRate : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.premiumRateForSugar ? cultivationLoanDetails.premiumRateForSugar : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.evidance ? cultivationLoanDetails.evidance : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.claimLodged ? cultivationLoanDetails.claimLodged : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.otherInfo1 ? cultivationLoanDetails.otherInfo1 : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.otherInfo2 ? cultivationLoanDetails.otherInfo2 : "\u00A0"}</p>
                          <p>{cultivationLoanDetails && cultivationLoanDetails.otherInfo3 ? cultivationLoanDetails.otherInfo3 : "\u00A0"}</p>
                        </Col>
                      </div>
                    </Row>

                    <hr></hr>

                    <Col xs={6}>
                      {/* TODO */}
                      <Card className="witness-signature-card">
                        <p>Customer Signature</p>
                        {signature && signature.length > 0 && signature.map((sign, index) => (
                          sign.status === "A" && <AsyncImage src={sign.imgPath} key={index} />
                        ))}
                      </Card>
                    </Col>

                  </div>
                </Collapse>
              </div>}

              {baraKarobarEmployeeLoanDetails && baraKarobarEmployeeLoanDetails !== undefined && <div className="accordion-item mt-4">
                <h2 className="accordion-header">
                  <button
                    className={classnames(
                      "accordion-button",
                      "fw-medium",
                      { collapsed: !baraKarobarLoanDetailsAccn }
                    )}
                    type="button"
                    onClick={handleBaraKarobarLoanDetails}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="m-0">BARA KAROBAR LOAN DETAILS</p>
                  </button>
                </h2>

                <Collapse
                  isOpen={baraKarobarLoanDetailsAccn}
                  className="accordion-collapse"
                >
                  <div className="accordion-body p-0 mt-4">
                    <h5 className="p-3">Employee Classification</h5>
                    <Row>
                      <div className="text-muted d-flex p-4">
                        <Col xs={12}>
                          <Row>
                            <Col>
                              <p className="grid-text">Nature</p>
                            </Col>
                            <Col>
                              <p className="grid-text">No of Employee</p>
                            </Col>
                            <Col>
                              <p className="grid-text">Total Salary</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p>Permanent Paymaster</p>
                            </Col>
                            <Col>
                              <p>{baraKarobarEmployeeLoanDetails && baraKarobarEmployeeLoanDetails.permPayMasterNoOfEmp ? baraKarobarEmployeeLoanDetails.permPayMasterNoOfEmp : "\u00A0"}</p>
                            </Col>
                            <Col>
                              <p>{baraKarobarEmployeeLoanDetails && baraKarobarEmployeeLoanDetails.permPayMasterTotSal ? baraKarobarEmployeeLoanDetails.permPayMasterTotSal : "\u00A0"}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p>Daily Wage Salary</p>
                            </Col>
                            <Col>
                              <p>{baraKarobarEmployeeLoanDetails && baraKarobarEmployeeLoanDetails.dailyWageSalNoOfEmp ? baraKarobarEmployeeLoanDetails.dailyWageSalNoOfEmp : "\u00A0"}</p>
                            </Col>
                            <Col>
                              <p>{baraKarobarEmployeeLoanDetails && baraKarobarEmployeeLoanDetails.dailyWageSalTotSal ? baraKarobarEmployeeLoanDetails.dailyWageSalTotSal : "\u00A0"}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p>Family Members</p>
                            </Col>
                            <Col>
                              <p>{baraKarobarEmployeeLoanDetails && baraKarobarEmployeeLoanDetails.familyMenmberNoOfEmp ? baraKarobarEmployeeLoanDetails.familyMenmberNoOfEmp : "\u00A0"}</p>
                            </Col>
                            <Col>
                              <p>{baraKarobarEmployeeLoanDetails && baraKarobarEmployeeLoanDetails.familyMenmberTotSal ? baraKarobarEmployeeLoanDetails.familyMenmberTotSal : "\u00A0"}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p>Seasonal Worker</p>
                            </Col>
                            <Col>
                              <p>{baraKarobarEmployeeLoanDetails && baraKarobarEmployeeLoanDetails.seasonalWorkerNoOfEmp ? baraKarobarEmployeeLoanDetails.seasonalWorkerNoOfEmp : "\u00A0"}</p>
                            </Col>
                            <Col>
                              <p>{baraKarobarEmployeeLoanDetails && baraKarobarEmployeeLoanDetails.seasonalWorkerTotSal ? baraKarobarEmployeeLoanDetails.seasonalWorkerTotSal : "\u00A0"}</p>
                            </Col>
                          </Row>
                        </Col>
                      </div>
                    </Row>

                    <p>{'\u00A0'}</p>

                    <Row>
                      <div className="text-muted d-flex p-4 mt-0 pt-0">
                        <Col xs={12}>
                          <Row>
                            <Col>
                              <p className="grid-text">Total Monthly Salary</p>
                            </Col>
                            <Col>
                              <p>{'\u00A0'}</p>
                            </Col>
                            <Col>
                              <p className="grid-text">{baraKarobarEmployeeLoanDetails && baraKarobarEmployeeLoanDetails.totmonthlySalary ? baraKarobarEmployeeLoanDetails.totmonthlySalary : "\u00A0"}</p>
                            </Col>
                          </Row>
                        </Col>
                      </div>
                    </Row>

                    <hr></hr>

                    <h5 className="p-3">Details of Permanent Business Suppliers</h5>
                    <Row>
                      <Col md="3">
                        <Nav pills className="flex-column">
                          {baraKarobarSupplierLoanDetails && baraKarobarSupplierLoanDetails.map((item, index) => (
                            <NavItem key={index}>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  "mb-2": true,
                                  active: toggleSupplierVerticalTab === index,
                                })}
                                onClick={() => {
                                  toggleSupplierVertical(index);
                                }}
                              >
                                Supplier 0{index + 1}
                              </NavLink>
                            </NavItem>
                          ))}
                        </Nav>
                      </Col>
                      <Col md="9">
                        <TabContent
                          activeTab={toggleSupplierVerticalTab}
                          className="text-muted mt-4 mt-md-0"
                        >
                          {baraKarobarSupplierLoanDetails && baraKarobarSupplierLoanDetails.map((item, index) => (
                            <TabPane key={index} tabId={index}>
                              <Row>
                                <div className="text-muted d-flex">
                                  <Col xs={4}>
                                    <p>Name</p>
                                    <p>Address</p>
                                    <p>Phone No</p>
                                  </Col>

                                  <Col xs={8}>
                                    <p>{item && item.name}</p>
                                    <p>{item && item.address}</p>
                                    <p>{item && item.phoneNo}</p>
                                  </Col>
                                </div>
                              </Row>
                            </TabPane>
                          ))}
                        </TabContent>
                      </Col>
                    </Row>

                    <hr></hr>

                    <h5 className="p-3">Details of Permanent Customers Associated with the Business</h5>
                    <Row>
                      <Col md="3">
                        <Nav pills className="flex-column">
                          {baraKarobarSupplierLoanDetails && baraKarobarSupplierLoanDetails.map((item, index) => (
                            <NavItem key={index}>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  "mb-2": true,
                                  active: togglePermanentBusinessVerticalTab === index,
                                })}
                                onClick={() => {
                                  togglePermanentBusinessVertical(index);
                                }}
                              >
                                Business 0{index + 1}
                              </NavLink>
                            </NavItem>
                          ))}
                        </Nav>
                      </Col>
                      <Col md="9">
                        <TabContent
                          activeTab={togglePermanentBusinessVerticalTab}
                          className="text-muted mt-4 mt-md-0"
                        >
                          {baraKarobarSupplierLoanDetails && baraKarobarSupplierLoanDetails.map((item, index) => (
                            <TabPane key={index} tabId={index}>
                              <Row>
                                <div className="text-muted d-flex">
                                  <Col xs={4}>
                                    <p>Name</p>
                                    <p>Address</p>
                                    <p>Phone No</p>
                                  </Col>

                                  <Col xs={8}>
                                    <p>{item && item.name}</p>
                                    <p>{item && item.address}</p>
                                    <p>{item && item.phoneNo}</p>
                                  </Col>
                                </div>
                              </Row>
                            </TabPane>
                          ))}
                        </TabContent>
                      </Col>
                    </Row>

                    <hr></hr>

                    <h5 className="p-3">Business Analysis (SWOT Analysis)</h5>
                    <Row>
                      <div className="text-muted d-flex p-4">
                        <Col xs={6}>
                          <p className="grid-text"><u>Strengths</u></p>
                          <p>{baraKarobarSwotLoanDetails && baraKarobarSwotLoanDetails.strengthsVal1 ? baraKarobarSwotLoanDetails.strengthsVal1 : "\u00A0"}</p>
                          <p>{baraKarobarSwotLoanDetails && baraKarobarSwotLoanDetails.strengthsVal2 ? baraKarobarSwotLoanDetails.strengthsVal2 : "\u00A0"}</p>
                          <p>{baraKarobarSwotLoanDetails && baraKarobarSwotLoanDetails.strengthsVal3 ? baraKarobarSwotLoanDetails.strengthsVal3 : "\u00A0"}</p>
                        </Col>

                        <Col xs={6}>
                          <p className="grid-text"><u>Weaknesses</u></p>
                          <p>{baraKarobarSwotLoanDetails && baraKarobarSwotLoanDetails.weeknessesVal1 ? baraKarobarSwotLoanDetails.weeknessesVal1 : "\u00A0"}</p>
                          <p>{baraKarobarSwotLoanDetails && baraKarobarSwotLoanDetails.weeknessesVal2 ? baraKarobarSwotLoanDetails.weeknessesVal2 : "\u00A0"}</p>
                          <p>{baraKarobarSwotLoanDetails && baraKarobarSwotLoanDetails.weeknessesVal3 ? baraKarobarSwotLoanDetails.weeknessesVal3 : "\u00A0"}</p>
                        </Col>
                      </div>
                    </Row>

                    <Row>
                      <div className="text-muted d-flex p-4">
                        <Col xs={6}>
                          <p className="grid-text"><u>Opportunities</u></p>
                          <p>{baraKarobarSwotLoanDetails && baraKarobarSwotLoanDetails.opportunitiesVal1 ? baraKarobarSwotLoanDetails.opportunitiesVal1 : "\u00A0"}</p>
                          <p>{baraKarobarSwotLoanDetails && baraKarobarSwotLoanDetails.opportunitiesVal2 ? baraKarobarSwotLoanDetails.opportunitiesVal2 : "\u00A0"}</p>
                          <p>{baraKarobarSwotLoanDetails && baraKarobarSwotLoanDetails.opportunitiesVal2 ? baraKarobarSwotLoanDetails.opportunitiesVal2 : "\u00A0"}</p>
                        </Col>

                        <Col xs={6}>
                          <p className="grid-text"><u>Threats</u></p>
                          <p>{baraKarobarSwotLoanDetails && baraKarobarSwotLoanDetails.threatsVal1 ? baraKarobarSwotLoanDetails.threatsVal1 : "\u00A0"}</p>
                          <p>{baraKarobarSwotLoanDetails && baraKarobarSwotLoanDetails.threatsVal2 ? baraKarobarSwotLoanDetails.threatsVal2 : "\u00A0"}</p>
                          <p>{baraKarobarSwotLoanDetails && baraKarobarSwotLoanDetails.threatsVal3 ? baraKarobarSwotLoanDetails.threatsVal3 : "\u00A0"}</p>
                        </Col>
                      </div>
                    </Row>

                    <Row>
                      <div className="text-muted d-flex p-4">
                        <Col xs={6}>
                          <p>Ability to Repay Debts</p>
                          <p>Ability to Run a Business</p>
                          <p>Other sources of Income</p>
                        </Col>

                        <Col xs={6}>
                          <p>{baraKarobarSwotLoanDetails && baraKarobarSwotLoanDetails.abilityToRepay ? baraKarobarSwotLoanDetails.abilityToRepay : "\u00A0"}</p>
                          <p>{baraKarobarSwotLoanDetails && baraKarobarSwotLoanDetails.abilityToRunBns ? baraKarobarSwotLoanDetails.abilityToRunBns : "\u00A0"}</p>
                          <p>{baraKarobarSwotLoanDetails && baraKarobarSwotLoanDetails.othSourceOfIncome ? baraKarobarSwotLoanDetails.othSourceOfIncome : "\u00A0"}</p>
                        </Col>
                      </div>
                    </Row>
                  </div>
                </Collapse>
              </div>}

              {otherIncomeDetails && otherIncomeDetails.length > 0 && <div className="accordion-item mt-4">
                <h2 className="accordion-header">
                  <button
                    className={classnames(
                      "accordion-button",
                      "fw-medium",
                      { collapsed: !otherIncomeDetailsAccn }
                    )}
                    type="button"
                    onClick={handleOtherIncomeDetails}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="m-0">OTHER INCOME DETAILS</p>
                  </button>
                </h2>

                <Collapse
                  isOpen={otherIncomeDetailsAccn}
                  className="accordion-collapse"
                >
                  <div className="accordion-body">
                    <h5 className="p-3">Other Incomes</h5>
                    <Row>
                      <Col md="3">
                        <Nav pills className="flex-column">
                          {otherIncomeDetails && otherIncomeDetails.map((item, index) => (
                            <NavItem key={index}>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  "mb-2": true,
                                  active: toggleOtherIncomeVerticalTab === index,
                                })}
                                onClick={() => {
                                  toggleOtherIncomeVertical(index);
                                }}
                              >
                                Incomes 0{index + 1}
                              </NavLink>
                            </NavItem>
                          ))}
                        </Nav>
                      </Col>
                      <Col md="9">
                        <TabContent
                          activeTab={toggleOtherIncomeVerticalTab}
                          className="text-muted mt-4 mt-md-0"
                        >
                          {otherIncomeDetails && otherIncomeDetails.map((item, index) => (
                            <TabPane key={index} tabId={index}>
                              <Row>
                                <div className="text-muted d-flex">
                                  <Col xs={4}>
                                    <p>Other Income Category </p>
                                    <p>Description</p>
                                  </Col>

                                  <Col xs={8}>
                                    <p>{item && getValueByList(otherIncomeCategories, item.incomeCategory)}</p>
                                    <p>{item && item.description}</p>
                                  </Col>
                                </div>
                              </Row>
                            </TabPane>
                          ))}
                        </TabContent>
                      </Col>
                    </Row>
                  </div>
                </Collapse>
              </div>}
            </div>
          </div>
        </Col>
      </Loader>
    </Row>
  )
}

LoanDetails.propTypes = {
  active: PropTypes.string,
};

export default LoanDetails;
