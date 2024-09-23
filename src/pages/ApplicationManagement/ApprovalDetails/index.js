import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Collapse,
  Card,
  CardBody,
} from "reactstrap";

import moment from "moment";

import classnames from "classnames";

//Local Components
import Loader from "components/Loader";
import SyncLoader from "components/SyncLoader";

//APIs
import {
  getObExceptionals
} from "services/common.service";
import {
  //getAllOnBoardingApprovals, 
  getAllExceptionalApprovals,
  createApprovalComment,
  getAllApprovalSteps,
  createApprovalStep,
  verifyApprovalUser,
  // getActiveStep,
} from "services/approval.service";

import {
  getAllOriginationApproval
} from "services/origination.service"

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


const ApprovalDetails = (props) => {

  const { appraisalId } = useParams();

  const approvalBtnRef = useRef();
  const caApprovalBtnRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOb, setIsLoadingOb] = useState(false);
  const [isLoadingCa, setIsLoadingCa] = useState(false);
  const [isLoadingStep, setIsLoadingStep] = useState(false);
  const [obRefresh, setObRefresh] = useState(false);
  const [stepRefresh, setStepRefresh] = useState(false);
  const [findUser, setFindUser] = useState(null);
  //const [activeStep, setActiveStep] = useState(null);

  const [steps, setSteps] = useState([]);
  //const [onBoardingApprovals, setOnBoardingApprovals] = useState([]);
  const [exceptionalApprovals, setExceptionalApprovals] = useState([]);
  const [verticalObActiveTab, setVerticalObActiveTab] = useState(0);
  const [verticalCaActiveTab, setVerticalCaActiveTab] = useState(0);

  const [obExceptionalAccn, setObExceptionalAccn] = useState(true);
  const [caExceptionalAccn, setCaExceptionalAccn] = useState(true);
  const [commentAccn, setCommentAccn] = useState(true);

  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState('');

  const [rejectOpen, setRejectOpen] = React.useState(false);
  const [rejectType, setRejectType] = React.useState('');

  const [index1, setIndex1] = useState(0);
  const [item, setItem] = useState({});
  const [caOpen, setCaOpen] = useState(false);
  const [rejectCaOpen, setCaRejectOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [originationApproval, setOriginationApproval] = useState([])

  const [obExceptionalIndex, setObExceptionalIndex] = useState(0);
  const [obExpOpen, setObExpOpen] = useState(false);
  const [obExpRejectOpen, setObExpRejectOpen] = useState(false);

  const handleCaClickOpen = (mIndex, item) => {
    setIndex1(mIndex);
    setItem(item);
    setCaOpen(true);
  };

  const handleCaClose = () => {
    setCaOpen(false);
  };

  const handleCaRejectClickOpen = (mIndex, item) => {
    setIndex1(mIndex);
    setItem(item);
    setCaRejectOpen(true);
  };

  const handleCaRejectClose = () => {
    setCaRejectOpen(false);
  };

  const handleObExceptionalClickApproveOpen = (obIndex, item) => {
    console.log("obIndex", obIndex);
    console.log("item", item);
    setObExceptionalIndex(obIndex);
    setItem(item);
    setObExpOpen(true);
  }

  const handleObExceptionalClose = () => {
    setObExpOpen(false);
  }

  const handleObExceptionalRejectClickOpen = (obIndex, item) => {
    setObExceptionalIndex(obIndex);
    setItem(item);
    setObExpRejectOpen(true);
  }

  const handleObExceptionalRejectClose = () => {
    setObExpRejectOpen(false);
  }

  const handleClickOpen = (type) => {
    setType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setStepRefresh(true);
    setIsLoadingStep(false);
    setOpen(false);
  };

  const handleClickRejectOpen = (type) => {
    setRejectType(type);
    setRejectOpen(true);
  };

  const handleRejectClose = () => {
    setStepRefresh(true);
    setIsLoadingStep(false);
    setRejectOpen(false);
  };

  const toggleObVertical = (tab) => {
    if (verticalObActiveTab !== tab) setVerticalObActiveTab(tab);
  }

  const toggleCaVertical = (tab) => {
    if (verticalCaActiveTab !== tab) setVerticalCaActiveTab(tab);
  }

  const handleObExceptionalAccn = () => {
    setObExceptionalAccn(!obExceptionalAccn);
    setCaExceptionalAccn(false);
    setCommentAccn(false);
  }

  const handleCaExceptionalAccn = () => {
    setCaExceptionalAccn(!caExceptionalAccn);
    setObExceptionalAccn(false);
    setCommentAccn(false);
  }

  const handleCommentAccn = () => {
    setCommentAccn(!commentAccn);
    setObExceptionalAccn(false);
    setCaExceptionalAccn(false);
  }

  const verifyUserWithLevel = (level) => {
    if (level !== "" && level !== null) {
      var role = localStorage.getItem("role");
      return role === level;
    }

    return false;
  }


  // const verifyActiveStepAndUser = () => {
  //   var result = false;
  //   if ((findUser !== null && findUser !== undefined) && (activeStep !== null && activeStep !== undefined)) {
  //     result = (findUser.group.code === activeStep.workflowStep.name && activeStep.stepAction === "P");
  //     return result;
  //   }

  //   if ((activeStep !== null && activeStep !== undefined)) {
  //     var role = localStorage.getItem("role");
  //     result = (role === activeStep.workflowStep.roleCode && activeStep.stepAction === "P");
  //     return result;
  //   }

  //   return result;
  // }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      alert('Please enter a value');
      return;
    }
  };


  const verifyActiveStepAndUser = () => {
    var result = false;
    if ((findUser !== null && findUser !== undefined) && (originationApproval.approvalStepDto !== null && originationApproval.approvalStepDto !== undefined)) {
      result = (findUser.group.code === originationApproval.approvalStepDto.workflowStep.name && originationApproval.approvalStepDto.stepAction === "P");
      return result;
    }

    if ((originationApproval.approvalStepDto !== null && originationApproval.approvalStepDto !== undefined)) {
      var role = localStorage.getItem("role");
      result = (role === originationApproval.approvalStepDto.workflowStep.roleCode && originationApproval.approvalStepDto.stepAction === "P");
      return result;
    }

    return result;
  }

  const verifyExceptionalApprovals = () => {
    return exceptionalApprovals.filter((item) => item.status === "P").length > 0;
  }

  //check this 
  // const verifyOnBoardingApprovals = () => {
  //   if ((onBoardingApprovals !== null && onBoardingApprovals !== undefined) && (activeStep !== null && activeStep !== undefined)) {
  //     return onBoardingApprovals.filter((item) => item.status === "P").length > 0 && activeStep.workflowStep.name === "AG_LEVEL_2";
  //   }
  // }

  const verifyOnBoardingApprovals = () => {
    if ((originationApproval.requestDtoList !== null && originationApproval.requestDtoList !== undefined) && (originationApproval.approvalStepDto !== null && originationApproval.approvalStepDto !== undefined)) {
      return originationApproval.requestDtoList.filter((item) => item.status === "P").length > 0 && originationApproval.approvalStepDto.workflowStep.name === "AG_LEVEL_2";
    }
  }

  const onSubmitObApproval = () => {
    var value = document.getElementById(`ob_comment_${obExceptionalIndex}`).value;
    if (value === "") {
      document.getElementById(`ob_error_comment_${obExceptionalIndex}`).classList.remove("d-none")
      return;
    }

    var payload = {
      "comment": value,
      "appType": "OB",
      "approvalIdx": item.idx,
      "appraisalIdx": item.appraisalIdx,
      "action": "A",
      "clienteleIdx": item.clienteleIdx
    }

    const obApprovalResponse = createObApprovals(payload);
    if (obApprovalResponse !== undefined) {
      setTimeout(() => {
        // window.location.reload();
      }, 500);
    }

  };

  const onSubmitObReject = () => {
    var value = document.getElementById(`ob_comment_${obExceptionalIndex}`).value;
    if (value === "") {
      document.getElementById(`ob_error_comment_${obExceptionalIndex}`).classList.remove("d-none")
      return;
    }

    var payload = {
      "comment": value,
      "appType": "OB",
      "approvalIdx": item.idx,
      "appraisalIdx": item.appraisalIdx,
      "action": "R",
      "clienteleIdx": item.clienteleIdx
    }

    const obRejectResponse = createObApprovals(payload);
    if (obRejectResponse !== undefined) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const onSubmitCaApprove = (index, item) => {
    var value = document.getElementById(`ca_comment_${index}`).value;
    if (value === "") {
      document.getElementById(`ca_error_comment_${index}`).classList.remove("d-none")
      return;
    }

    var payload = {
      "comment": value,
      "appType": "CA",
      "approvalIdx": item.idx,
      "appraisalIdx": item.appraisalIdx,
      "action": "A"
    }

    createCaApprovals(payload);
  };

  const onSubmitCaApproval = () => {

    var value = document.getElementById(`ca_comment_${index1}`).value;
    if (value === "") {
      document.getElementById(`ca_error_comment_${index1}`).classList.remove("d-none")
      return;
    }

    var payload = {
      "comment": value,
      "appType": "CA",
      "approvalIdx": item.idx,
      "appraisalIdx": item.appraisalIdx,
      "action": "A"
    }

    if (caApprovalBtnRef.current) {
      caApprovalBtnRef.current.setAttribute("disabled", "disabled");
    }
    setIsButtonDisabled(true);
    createCaApprovals(payload);

  };

  const onSubmitCaReject = (index, item) => {
    var value = document.getElementById(`ca_comment_${index}`).value;
    if (value === "") {
      document.getElementById(`ca_error_comment_${index}`).classList.remove("d-none")
      return;
    }

    var payload = {
      "comment": value,
      "appType": "CA",
      "approvalIdx": item.idx,
      "appraisalIdx": item.appraisalIdx,
      "action": "R"
    }

    createCaApprovals(payload);
  };

  const onSubmitCaRejection = () => {

    var value = document.getElementById(`ca_comment_${index1}`).value;
    if (value === "") {
      document.getElementById(`ca_error_comment_${index1}`).classList.remove("d-none")
      return;
    }

    var payload = {
      "comment": value,
      "appType": "CA",
      "approvalIdx": item.idx,
      "appraisalIdx": item.appraisalIdx,
      "action": "R"
    }

    if (caApprovalBtnRef.current) {
      caApprovalBtnRef.current.setAttribute("disabled", "disabled");
    }

    setIsButtonDisabled(true);
    createCaApprovals(payload);

  };

  const createObApprovals = async (data) => {
    setIsLoadingOb(true);
    console.log("data ", JSON.stringify(data))
    const commentResponse = await createApprovalComment(data);
    if (commentResponse !== undefined) {
      setIsLoadingOb(false);
      setObRefresh(true);
    }
  }

  const createCaApprovals = async (data) => {
    setIsLoadingCa(true);
    const commentResponse = await createApprovalComment(data);
    if (commentResponse !== undefined) {
      setIsLoadingCa(false);
      setCaOpen(false);
      setCaRejectOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }

  const createActionApprovalStep = async () => {
    var value = document.getElementById(`step_comment`).value;
    if (value === "") {
      setOpen(false);
      setCaOpen(false);
      setCaRejectOpen(false);
      // document.getElementById(`step_error_comment`).classList.remove("d-none")
      document.getElementById(`err_step_comment`).classList.remove("d-none")
      return;
    }

    var payload = {
      "appraisalIdx": appraisalId,
      "stepAction": type,
      "comment": value
    }

    // disable button action
    if (approvalBtnRef.current) {
      approvalBtnRef.current.setAttribute("disabled", "disabled");
    }

    setIsButtonDisabled(true);
    setIsLoadingStep(true);

    const stepResponse = await createApprovalStep(payload);
    if (stepResponse !== null) {
      setStepRefresh(true);
      setIsLoadingStep(false);
      document.getElementById(`step_comment`).value = "";
      setOpen(false);
      setCaOpen(false);
      setCaRejectOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }

  }

  const createActionApprovalRejectStep = async () => {

    var value = document.getElementById(`step_comment`).value;
    if (value === "") {
      setRejectOpen(false);
      // document.getElementById(`step_error_comment`).classList.remove("d-none")
      document.getElementById(`err_step_comment`).classList.remove("d-none")
      return;
    }

    var payload = {
      "appraisalIdx": appraisalId,
      "stepAction": rejectType,
      "comment": value
    }

    // disable button action
    if (approvalBtnRef.current) {
      approvalBtnRef.current.setAttribute("disabled", "disabled");
    }

    setIsButtonDisabled(true);
    setIsLoadingStep(true);

    const stepResponse = await createApprovalStep(payload);
    if (stepResponse !== null) {
      setStepRefresh(true);
      setIsLoadingStep(false);
      document.getElementById(`step_comment`).value = "";
      setRejectOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }

  }
  useEffect(() => {
    var _isMounted = true;

    setIsLoading(true);

    const fetchData = async () => {
      if (props.active === "11") {

        const userDetails = localStorage.getItem("authUser");
        const user = JSON.parse(userDetails);

        //const onBoardingApprovals = await getAllOnBoardingApprovals(appraisalId);
        const exceptionalApprovals = await getAllExceptionalApprovals(appraisalId);
        const userVerify = await verifyApprovalUser(user.username);
        //const activeStep = await getActiveStep(appraisalId);

        const approvalOrigination = await getAllOriginationApproval(appraisalId);
        // console.log(approvalOrigination)
        // console.log(approvalOrigination.approvalStepDto)
        // console.log(approvalOrigination.approvalStepDto.workflowStep)
        // console.log(approvalOrigination.approvalStepDto.workflowStep.name
        // )


        if (_isMounted) {
          //setOnBoardingApprovals(onBoardingApprovals);
          setExceptionalApprovals(exceptionalApprovals);
          setFindUser(userVerify);
          //setActiveStep(activeStep);
          setOriginationApproval(approvalOrigination);
        }

        setIsLoading(false);
        obRefresh && setObRefresh(false);
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    };
  }, [props.active, obRefresh]);

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      if (props.active === "11") {
        const stepsResponse = await getAllApprovalSteps(appraisalId);
        if (_isMounted) {
          setSteps(stepsResponse);
        }
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    };
  }, [props.active, stepRefresh]);

  return (
    <Row>
      <Loader loading={isLoading} >
        <Col lg={12}>
          <div className="page-wrapper-context">
            <div className="mt-4">
              <Row>
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
                          { collapsed: !obExceptionalAccn }
                        )}
                        type="button"
                        onClick={handleObExceptionalAccn}
                        style={{ cursor: "pointer" }}
                      >
                        ON-BOARDING EXCEPTIONAL APPROVALS
                      </button>
                    </h2>

                    <Collapse
                      isOpen={obExceptionalAccn}
                      className="accordion-collapse"
                    >
                      <div className="accordion-body">
                        <Row>
                          <Col md="3">
                            <Nav pills className="flex-column">
                              {originationApproval.requestDtoList ?.map((item, index) => (
                                <NavItem key={index}>
                                  <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                      "mb-2": true,
                                      active: verticalObActiveTab === index,
                                    }, "bg-warning", "text-white")}
                                    onClick={() => {
                                      toggleObVertical(index);
                                    }}
                                  >
                                    <div className="d-flex justify-content-between align-items-center">
                                      <p className="m-0">0{index + 1}. {getObExceptionals(item.type)}</p>
                                      {item.status === "A" && <i className="bx bx-check-square font-size-20" />}
                                      {item.status === "R" && <i className="bx bx-x-circle font-size-20" />}
                                    </div>
                                  </NavLink>
                                </NavItem>
                              ))}
                            </Nav>
                          </Col>
                          <Col md="9">
                            <TabContent
                              activeTab={verticalObActiveTab}
                              className="text-muted" >
                              {originationApproval.requestDtoList ?.map((item, index) => (
                                <TabPane key={index} tabId={index}>
                                  <Row>
                                    <Col md="12">
                                      <table className="table-striped table-bordered table">
                                        <tbody>
                                          <tr>
                                            <td><p className="grid-text m-0">Requester&apos;s Comment :</p></td>
                                            <td><p className="m-0">{item.remark}</p></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div className="exceptional-approval-section">
                                        <div className="form-group">
                                          <textarea className="form-control" id={`ob_comment_${index}`} rows="4"
                                            readOnly={item.comments !== null ? true : false}
                                            defaultValue={item.comments !== null ? item.comments.comment : ""}
                                          ></textarea>
                                          {<span id={`ob_error_comment_${index}`} className="text-danger d-none">This field is required</span>}
                                        </div>
                                        {item.status === "P" && findUser ?.group ?.code === "AG_LEVEL_2" && <div className="form-group mt-3 d-flex justify-content-end align-items-center">
                                          <button onClick={() => handleObExceptionalRejectClickOpen(index, item)} className="btn btn-danger w-md me-2" >
                                            <SyncLoader loading={isLoadingOb}>
                                              <i className="bx bx-x-circle font-size-16 me-2" />
                                              Reject
                                            </SyncLoader>
                                          </button>
                                          <button onClick={() => handleObExceptionalClickApproveOpen(index, item)} className="btn btn-success w-md">
                                            <SyncLoader loading={isLoadingOb}>
                                              <i className="bx bxs-check-circle font-size-16 me-2" />
                                              Approve
                                            </SyncLoader>
                                          </button>
                                        </div>}
                                      </div>
                                    </Col>
                                  </Row>
                                </TabPane>
                              ))}
                            </TabContent>
                          </Col>
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
                          { collapsed: !obExceptionalAccn }
                        )}
                        type="button"
                        onClick={handleCaExceptionalAccn}
                        style={{ cursor: "pointer" }}
                      >
                        EXCEPTIONAL APPROVALS
                      </button>
                    </h2>

                    <Collapse
                      isOpen={obExceptionalAccn}
                      className="accordion-collapse"
                    >
                      <div className="accordion-body">
                        <Row>
                          <Col md="3">
                            <Nav pills className="flex-column">
                              {exceptionalApprovals ?.map((item, index) => (
                                <NavItem key={index}>
                                  <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                      "mb-2": true,
                                      active: verticalCaActiveTab === index,
                                    }, "bg-danger", "text-white")}
                                    onClick={() => {
                                      toggleCaVertical(index);
                                    }}
                                  >
                                    <div className="d-flex justify-content-between align-items-center">
                                      <p className="m-0">0{index + 1}. {item.categoryDec}</p>
                                      {item.status === "A" && <i className="bx bx-check-square font-size-20" />}
                                      {item.status === "R" && <i className="bx bx-x-circle font-size-20" />}
                                    </div>
                                  </NavLink>
                                </NavItem>
                              ))}
                            </Nav>
                          </Col>
                          <Col md="9">
                            <TabContent
                              activeTab={verticalCaActiveTab}
                              className="text-muted" >
                              {exceptionalApprovals ?.map((item, index) => (
                                <TabPane key={index} tabId={index}>
                                  <Row>
                                    <Col md="12">
                                      <table className="table-striped table-bordered table">
                                        <tbody>
                                          <tr>
                                            <td><p className="grid-text m-0">Approval User :</p></td>
                                            <td><p className="m-0">{item.role}</p></td>
                                          </tr>
                                          <tr>
                                            <td><p className="grid-text m-0">Requester&apos;s Comment :</p></td>
                                            <td><p className="m-0">{item.remark}</p></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div className="exceptional-approval-section">
                                        <div className="form-group">
                                          <textarea className="form-control"
                                            id={`ca_comment_${index}`} rows="4"
                                            readOnly={verifyUserWithLevel(item.roleCode) === false ? true : (item.comments !== null ? true : false)}
                                            defaultValue={item.comments !== null ? item.comments.comment : ""}
                                          ></textarea>
                                          {<span id={`ca_error_comment_${index}`} className="text-danger d-none">This field is required</span>}
                                        </div>
                                        {verifyUserWithLevel(item.roleCode) === true && item.status === "P" && <div className="form-group mt-3 d-flex justify-content-end align-items-center">
                                          {/* <button onClick={() => onSubmitCaReject(index, item)} className="btn btn-danger w-md me-2">
                                            <SyncLoader loading={isLoadingCa}>
                                              <i className="bx bx-x-circle font-size-16 me-2" />
                                              Reject
                                            </SyncLoader>
                                          </button> */}
                                          <button onClick={() => handleCaRejectClickOpen(index, item)} className="btn btn-danger w-md me-2"
                                            ref={caApprovalBtnRef}>
                                            <SyncLoader loading={isLoadingCa}>
                                              <i className="bx bx-x-circle font-size-16 me-2" />
                                              Reject
                                            </SyncLoader>
                                          </button>
                                          {/* <button onClick={() => onSubmitCaApprove(index, item)} className="btn btn-success w-md">
                                            <SyncLoader loading={isLoadingCa}>
                                              <i className="bx bxs-check-circle font-size-16 me-2" />
                                              Approve
                                            </SyncLoader>
                                          </button> */}
                                          <button onClick={() => handleCaClickOpen(index, item)} className="btn btn-success w-md"
                                            ref={caApprovalBtnRef}>
                                            <SyncLoader loading={isLoadingCa}>
                                              <i className="bx bxs-check-circle font-size-16 me-2" />
                                              Approve
                                            </SyncLoader>
                                          </button>
                                        </div>}
                                      </div>
                                    </Col>
                                  </Row>
                                </TabPane>
                              ))}
                            </TabContent>
                          </Col>
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
                          { collapsed: !commentAccn }
                        )}
                        type="button"
                        onClick={handleCommentAccn}
                        style={{ cursor: "pointer" }}
                      >
                        COMMENTS HISTORY
                      </button>
                    </h2>

                    <Collapse
                      isOpen={commentAccn}
                      className="accordion-collapse"
                    >
                      <div className="accordion-body">
                        <Row>
                          <Col md="12">
                            <div className="mt-4">
                              <ul className="verti-timeline list-unstyled">
                                {steps.length > 0 && steps.map((item, index) => (
                                  <li key={index} className="event-list mb-3">
                                    <div className="event-timeline-dot">
                                      <i className="bx bx-right-arrow-circle" />
                                    </div>
                                    <div className="d-flex">
                                      <div className="me-3">
                                        {item && item.stepAction === "A" && <i className="bx bxs-check-circle h1 text-success" />}
                                        {item && item.stepAction === "R" && <i className="bx bxs-log-out-circle h1 text-warning" />}
                                        {item && item.stepAction === "J" && <i className="bx bxs-x-circle h1 text-danger" />}
                                        {item && item.stepAction === "P" && <i className="bx bxs-hourglass-top h1 text-info" />}
                                      </div>
                                      <div className="flex-grow-1">
                                        <div>
                                          <h5 className="font-size-14">{item && item.workflowStep.description}</h5>
                                          <div className="d-flex justify-content-between align-items-top">
                                            <p className="text-muted m-0">
                                              {item && item.comment !== null ? item.comment : "Waiting for approval"}
                                            </p>
                                            {item.lastModifiedBy !== null && item && item.stepAction !== "P" && <div className="d-flex justify-content-between align-items-center font-size-12">
                                              <i className="bx bxs-user font-size-14 me-2" />
                                              <p className="m-0 me-2">{item.lastModifiedBy}</p>
                                              <p className="m-0 me-2">{"•"}</p>
                                              <i className="bx bxs-calendar font-size-14 me-2" />
                                              <p className="text-muted m-0">{moment(item.lastModifiedDate).format("YYYY-MM-DD | HH:mm:ss")}</p>
                                            </div>}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </Col>
                          {verifyActiveStepAndUser() == true && (verifyOnBoardingApprovals() == false && verifyExceptionalApprovals() == false) && <Col md="12">
                            <div className="level-approval-section mt-5 mb-5">
                              <div className="form-group">
                                <textarea className="form-control" id="step_comment" rows="4"></textarea>
                                {<span id="err_step_comment" className="text-danger d-none">This field is required</span>}
                              </div>
                              <div className="form-group mt-3 d-flex justify-content-end align-items-center">
                                <button className="btn btn-danger w-md me-2" ref={approvalBtnRef}
                                  onClick={() => handleClickRejectOpen("J")}
                                >
                                  <SyncLoader loading={isLoadingStep}>
                                    <i className="bx bx-x-circle font-size-16 me-2" />
                                    Reject
                                  </SyncLoader>
                                </button>
                                <button className="btn btn-warning w-md me-2" ref={approvalBtnRef}
                                  onClick={() => handleClickOpen("R")}
                                >
                                  <SyncLoader loading={isLoadingStep}>
                                    <i className="bx bxs-log-out-circle font-size-16 me-2" />
                                    Return
                                  </SyncLoader>
                                </button>
                                <button type="submit" className="btn btn-success w-md" ref={approvalBtnRef}
                                  onClick={() => handleClickOpen("A")}
                                >
                                  <SyncLoader loading={isLoadingStep}>
                                    <i className="bx bxs-check-circle font-size-16 me-2" />
                                    Approve
                                  </SyncLoader>
                                </button>
                              </div>
                            </div>
                          </Col>}
                        </Row>
                      </div>
                    </Collapse>
                  </div>
                </div>
              </Row>
            </div>
          </div>
        </Col>
      </Loader>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {
            type == 'R' ? "Return" : type == 'A' ? "Approve" : ""
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{
            type == 'R' ? "Are you sure do you want to return this appriasal?" :
              type == 'A' ? "Are you sure do you want to approve this appriasal?" : ""
          }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'white', backgroundColor: '#34c38f' }}
            onClick={createActionApprovalStep} autoFocus disabled={isButtonDisabled}>
            {
              type == 'R' ? "Return" :
                type == 'A' ? "Approve" : ""
            }
          </Button>
          <Button style={{ color: 'gray' }} onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={rejectOpen}
        onClose={handleRejectClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" style={{ color: '#DC4C64', alignContent: "center" }}>
          {
            rejectType == 'J' ? "Warning!" : ""
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{
            rejectType == 'J' ? "Are you sure do you want to reject this appriasal?" : ""
          }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'white', backgroundColor: '#DC4C64' }}
            onClick={createActionApprovalRejectStep} autoFocus disabled={isButtonDisabled}>
            Reject
          </Button>
          <Button style={{ color: 'gray' }} onClick={handleRejectClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={caOpen}
        onClose={handleCaClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {
            "Approve"
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{
            "Are you sure do you want to approve this exceptional approval?"
          }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'white', backgroundColor: '#34c38f' }}
            onClick={onSubmitCaApproval} autoFocus disabled={isButtonDisabled}>
            {
              "Approve"
            }
          </Button>
          <Button style={{ color: 'gray' }} onClick={handleCaClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={rejectCaOpen}
        onClose={handleCaRejectClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" style={{ color: '#DC4C64', alignContent: "center" }}>
          {
            "Warning!"
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{
            "Are you sure do you want to reject this exceptional approval?"
          }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'white', backgroundColor: '#DC4C64' }}
            onClick={onSubmitCaRejection} autoFocus disabled={isButtonDisabled}>
            Reject
          </Button>
          <Button style={{ color: 'gray' }} onClick={handleCaRejectClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={obExpOpen}
        onClose={handleObExceptionalRejectClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {
            "Approve"
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{
            "Are you sure do you want to approve this exceptional approval?"
          }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'white', backgroundColor: '#34c38f' }}
            onClick={onSubmitObApproval} autoFocus disabled={isButtonDisabled}>
            {
              "Approve"
            }
          </Button>
          <Button style={{ color: 'gray' }} onClick={handleObExceptionalClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={obExpRejectOpen}
        onClose={handleObExceptionalRejectClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" style={{ color: '#DC4C64', alignContent: "center" }}>
          {
            "Warning!"
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{
            "Are you sure do you want to reject this exceptional approval?"
          }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'white', backgroundColor: '#DC4C64' }}
            onClick={onSubmitObReject} autoFocus disabled={isButtonDisabled}>
            Reject
          </Button>
          <Button style={{ color: 'gray' }} onClick={handleObExceptionalRejectClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Row>
  );
}

ApprovalDetails.propTypes = {
  active: PropTypes.string,
  match: PropTypes.any,
}

export default ApprovalDetails;