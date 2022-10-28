import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

import moment from "moment";

import { useForm } from "react-hook-form";

import Loader from "components/SyncLoader";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import Table from "components/Datatable/Table";

// APIs
import {
  getMisReportSummary, getMisReport
} from "services/report.service";

import {
  getAllBranches
} from "services/common.service";

import {
  getAllUsers, getUserById
} from "services/user.service";



const MisReport = (props) => {

  const [data, setData] = useState([]);

  const [branches, setBranches] = useState([]);

  const [cros, setCros] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [isBranch, setIsBranch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);



  const items = {
    columns: [
      {
        field: 'appraisalId',
        label: 'Appraisal ID',
        sort: "asc",
      },

      {
        field: 'branchDesc',
        label: 'Branch Name',
        sort: "asc",
      },
      {
        field: 'userName',
        label: 'CRO Name',
        sort: "asc",
      },
      {
        field: 'status',
        label: 'Status',
        sort: "asc",
      },
      {
        field: 'loanProduct',
        label: 'Product Name',
        sort: "asc",
      },
      {
        field: 'customerCnic',
        label: 'Customer CNIC',
        sort: "asc",
      },
      {
        field: 'customerName',
        label: 'Customer Name',
        sort: "asc",
      },
      {
        field: 'requestedLoanAmount',
        label: 'Req. Loan Amount',
        sort: "asc",
      },
      {
        field: 'createdDate',
        label: 'Initiated Date',
        sort: "asc",
      },

      {
        field: 'userIdx',
        label: 'Created By',
        sort: "asc",
      },
      {
        field: 'nextActionPendingRole',
        label: 'Next Action Pending Role',
        sort: "asc",
      }

    ],
    rows: data
  };

  const { register, handleSubmit, watch, setValue, setError, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (userDetails.roles[0].code === 'CRO' || userDetails.roles[0].code === 'CO' || userDetails.roles[0].code === 'BHO') {
      data.branch = userDetails.branches[0].code;

    }

    setIsLoading(true);
    const misResponse = await getMisReportSummary(data);
    if (misResponse !== undefined && misResponse !== null) {
      var data = misResponse.map(item => modernization(item));

      setData(data);

      setIsLoading(false);
    }
  }

  const getLabel = (item) => {
    item.appraisalId = item.appraisalId;
    item.branchDesc = item.branchDesc;
    item.userName = item.userName;
    item.status = item.status;
    item.customerCnic = item.clienteleCustomer.identificationNumber;
    item.customerName = item.clienteleCustomer.fullName;
    item.loanProduct = item.creditReportVo.loanProduct;
    item.requestedLoanAmount = item.creditReportVo.requestedLoanAmount;
    item.createdDate = moment(item.createdDate).format("DD-MM-YYYY HH:mm:ss");
    item.userIdx = item.userIdx;
    item.nextActionPendingRole = item.nextActionPendingRole;
    return item;
  }


  const modernization = (item) => {
    item = getLabel(item);

    return item;
  }

  const exportToExcel = async () => {
    var exportData = watch();
    if (userDetails.roles[0].code === 'CRO' || userDetails.roles[0].code === 'CO' || userDetails.roles[0].code === 'BHO') {
      exportData.branch = userDetails.branches[0].code;

    }
    const response = await getMisReport(exportData)

    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `mis-report.xlsx`;
    link.click();
  }



  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const branchResponse = await getAllBranches();

      const userResponse = await getAllUsers(0, 10000);
      const obj = JSON.parse(localStorage.getItem("authUser"));


      const userDetailsResponse = await getUserById(obj.username);

      if (_isMounted) {
        setBranches(branchResponse);
        setUserDetails(userDetailsResponse)
        if (userDetailsResponse.roles[0].code === 'CRO' || userDetailsResponse.roles[0].code === 'CO' || userDetailsResponse.roles[0].code === 'BHO') {
          setIsBranch(false);

        }
        if (userResponse !== undefined) {

          var croList = [];

          userResponse.content.forEach(function (item) {
            if (item.meCode != null) {
              croList.push(item);
            }
          });
          croList.sort((a, b) => a.userName.toLowerCase() > b.userName.toLowerCase() ? 1 : -1);
          setCros(croList);
        }

      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    };
  }, []);






  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={"Report And Summary"}
            breadcrumbItem={"MIS Report"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">MIS Report</CardTitle>
                  <p className="card-title-desc">

                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="my-4">
                      <Col className="col-3">
                        <div className="form-group row">
                          <label
                            htmlFor="example-date-input"
                            className="col-md-4 col-form-label">Status : </label>
                          <div className="col-md-9">
                            <select className="form-control" name="status"
                              {...register("status", { required: false })}>
                              <option value="">-- Select --</option>
                              <option value="P">Pending</option>
                              <option value="R">Returned</option>
                              <option value="C">Approval Pending</option>
                              <option value="A">Approved</option>
                              <option value="J">Rejected</option>
                            </select>
                          </div>
                          {errors.status && <span className="error">This field is required</span>}
                        </div>
                      </Col>
                      <Col className="col-3">
                        <div className="form-group row">
                          <label
                            htmlFor="example-date-input"
                            className="col-md-4 col-form-label">ID : </label>
                          <div className="col-md-9">
                            <input {...register("appraisalId", { required: false })}
                              className="form-control"
                              type="text"
                              name="appraisalId" id="appraisalId" />
                          </div>
                        </div>
                      </Col>
                      <Col className="col-3">
                        <div className="form-group row">
                          <label
                            htmlFor="example-date-input"
                            className="col-md-4 col-form-label">From : </label>
                          <div className="col-md-9">
                            <input {...register("fromDate", { required: false })}
                              className="form-control"
                              type="date"
                              defaultValue={new Date().toISOString().slice(0, 10)}
                              name="fromDate" id="fromDate" />
                          </div>
                        </div>
                      </Col>
                      <Col className="col-3">
                        <div className="form-group row">
                          <label
                            htmlFor="example-date-input"
                            className="col-md-4 col-form-label">To : </label>
                          <div className="col-md-9">
                            <input {...register("toDate", { required: false })}
                              className="form-control"
                              type="date"
                              defaultValue={new Date().toISOString().slice(0, 10)}
                              name="toDate" id="toDate" />
                          </div>
                        </div>
                      </Col>



                    </Row>
                    <Row>
                      {isBranch && <Col className="col-3">
                        <div className="form-group row">
                          <label
                            htmlFor="example-date-input"
                            className="col-md-4 col-form-label">Branch : </label>
                          <div className="col-md-9">

                            <select
                              className="form-control"
                              id="branch"
                              {...register("branch", { required: false })}
                            >
                              <option value="">-- Select --</option>
                              {branches.map((item, index) => <option key={index} value={item.code}>{item.description}</option>)}
                            </select>


                          </div>
                          {/* {errors.branch && <span className="text-danger">This field is required</span>} */}
                        </div>
                      </Col>
                      }
                      <Col className="col-3">
                        <div className="form-group row">
                          <label
                            htmlFor="example-date-input"
                            className="col-md-4 col-form-label">CRO : </label>
                          <div className="col-md-9">

                            <select
                              className="form-control"
                              id="cro"
                              {...register("cro", { required: false })}
                            >
                              <option value="">-- Select --</option>
                              {cros.map((item, index) => <option key={index} value={item.idx}>{item.userName}</option>)}
                            </select>


                          </div>
                          {/* {errors.branch && <span className="text-danger">This field is required</span>} */}
                        </div>
                      </Col>
                      {/* <Col className="col-3">
                        <div className="form-group row">
                          <label
                            htmlFor="example-date-input"
                            className="col-md-4 col-form-label">Product : </label>
                          <div className="col-md-9">

                            <select
                              className="form-control"
                              id="branch"
                              {...register("branch", { required: true })}
                            >
                              <option value="">-- Select --</option>
                              {branches.map((item, index) => <option key={index} value={item.code}>{item.description}</option>)}
                            </select>


                          </div>
                        {errors.branch && <span className="text-danger">This field is required</span>}  
                        </div>
                      </Col> */}
                      <Col className="col-12 mt-4">
                        <div className="d-flex justify-content-end">
                          <div className="p-2">
                            <button
                              type="submit" className="btn btn-primary waves-effect waves-light">
                              <span className="d-flex"><Loader loading={isLoading} /> <p className="m-0">Search</p></span>
                            </button>
                          </div>
                          <div className="p-2">
                            <button onClick={exportToExcel}
                              type="button" className="btn btn-success waves-effect waves-light">
                              <span className="d-flex"><p className="m-0"><i className="dripicons-download"></i>Download</p></span>
                            </button>
                            {/* <Link target="_blank" to={`/pakoman-digital-loan/credit-appraisals/documents/pro-note/reports/${appraisalId}`} className="btn btn-success waves-effect waves-light"><i className="bx bxs-report font-size-16 align-middle me-2"></i>Pro Note Report Preview</Link> */}
                          </div>
                        </div>


                      </Col>
                    </Row>

                  </form>

                  <Table items={items} />

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

MisReport.propTypes = {
  t: PropTypes.any,
};

export default MisReport;