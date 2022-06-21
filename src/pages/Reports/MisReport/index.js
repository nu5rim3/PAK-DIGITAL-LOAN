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
  getAllBranches,getAllCros
} from "services/common.service";





const MisReport = (props) => {

  const [data, setData] = useState([]);
  const [downloadData, setDownloadData] = useState([]);
  const [type, setType] = useState(null);
  const [branches, setBranches] = useState([]);

  const [cros, setCros] = useState([]);
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
        field: 'creditReportVo.loanProduct',
        label: 'Product Name',
        sort: "asc",
      },
      {
        field: 'customer.cNic',
        label: 'Customer CNIC',
        sort: "asc",
      },
      {
        field: 'customer.name',
        label: 'Customer Name',
        sort: "asc",
      },
      {
        field: 'creditReportVo.requestedLoanAmount',
        label: 'Req. Loan Amount',
        sort: "asc",
      },
      {
        field: 'createdDate',
        label: 'Initialted Date',
        sort: "asc",
      },

      {
        field: 'userIdx',
        label: 'Created By',
        sort: "asc",
      }
    ],
    rows: data
  };

  const { register, handleSubmit, watch, setValue, setError, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    setIsLoading(true);
    const misResponse = await getMisReportSummary(data);
    if (misResponse !== undefined && misResponse !== null) {
      var data = misResponse.map(item => modernization(item));

      setData(data);

      setIsLoading(false);
    }
  }

  const getLabel = (item) => {
    item.customerCnic = item.clienteles[0].identificationNumber;
    item.customerName = item.clienteles[0].fullName;
    item.createdBy = item.clienteles[0].createdBy;
    item.createdAt = moment(item.lastModifiedDate).format("DD-MM-YYYY HH:mm:ss");
    item.isReturned = item.isReturned;
    return item;
  }

  // const getAction = (item) => {
  //   item.actions = (
  //     <div className="d-flex align-items-center">
  //       <Link to={`/pakoman-digital-loan/credit-appraisals/view/${item.idx}`} className="btn btn-primary btn-sm d-flex justify-content-between align-items-center">
  //         <i className="bx bx-zoom-in font-size-16 me-1"></i>
  //         <p className="m-0">Preview</p>
  //       </Link>
  //     </div>
  //   );

  //   return item;
  // }

  // const getContractNo = (item) => {
  //   if (item.status === "A") {
  //     item.contractNo = JSON.parse(item.contractNo)?.object?.lchdContNo;
  //   } else {
  //     item.contractNo = item.contractNo;
  //   }

  //   return item;
  // }
  // const getBackgroundColor = (item) => {
  //   if (item.isReturned === "Y") {
  //     item.idx = (
  //       <span className="font-size-12  badge bg-warning rounded-pill">{item.idx}</span>
  //     );
  //   } else {
  //     item.idx = (
  //       <span>{item.idx}</span>
  //     );
  //   }
  //   return item;
  // }

  const modernization = (item) => {
    item = getLabel(item);
    // item = getAction(item);
    // item = getContractNo(item);
    // item = getBackgroundColor(item);
    return item;
  }
  const onError = (error) => {
    console.error(error, 'error in file-viewer');
  }

  const download = () => {
    window.open(downloadData);
  }
  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const branchResponse = await getAllBranches();
      const croResponse = await getAllCros();
      if (_isMounted) {
        setBranches(branchResponse);
        setCros(croResponse);

        // setDownloadData(fileURL);
        // setType('pdf');
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
                              <option value="completed">Pending</option>
                              <option value="returned">Returned</option>
                              <option value="active">Approved</option>
                              <option value="rejected">Rejected</option>
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
                      <Col className="col-3">
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
                              {cros.map((item, index) => <option key={index} value={item.code}>{item.mkexName}</option>)}
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
                            <button
                              type="submit" className="btn btn-success waves-effect waves-light">
                              <span className="d-flex"><Loader loading={isLoading} /> <p className="m-0">Download</p></span>
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