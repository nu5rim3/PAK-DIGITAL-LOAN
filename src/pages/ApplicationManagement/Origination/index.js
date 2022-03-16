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
  getAllCompletedAppraisals
} from "services/origination.service";

const Origination = (props) => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const items = {
    columns: [
      {
        field: 'idx',
        label: 'Appraisal ID',
        sort: "asc",
      },
      {
        field: 'contractNo',
        label: 'Contarct ID',
        sort: "asc",
      },
      {
        field: 'productName',
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
        field: 'createdAt',
        label: 'Created At',
        sort: "asc",
      },
      {
        field: 'branchName',
        label: 'Branch Name',
        sort: "asc",
      },
      {
        field: 'lastModifiedDate',
        label: 'Created By',
        sort: "asc",
      },
      {
        field: 'actions',
        label: 'Action',
        sort: "asc",
      }
    ],
    rows: data,
  };

  const { register, handleSubmit, watch, setValue, setError, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    setIsLoading(true);
    const originationResponse = await getAllCompletedAppraisals(data);
    if (originationResponse !== undefined && originationResponse !== null) {
      var data = originationResponse.map(item => modernization(item));
      setData(data);

      setIsLoading(false);
    }
  }

  const getLabel = (item) => {
    item.customerCnic = item.clienteles[0].identificationNumber;
    item.customerName = item.clienteles[0].fullName;
    item.createdBy = item.clienteles[0].createdBy;
    item.createdAt = moment(item.clienteles[0].creationDate).format("DD-MM-YYYY HH:mm:ss");
    return item;
  }

  const getAction = (item) => {
    item.actions = (
      <div className="d-flex align-items-center">
        <Link to={`/pakoman-digital-loan/credit-appraisals/view/${item.idx}`} className="btn btn-primary btn-sm d-flex justify-content-between align-items-center">
          <i className="bx bx-zoom-in font-size-16 me-1"></i>
          <p className="m-0">Preview</p>
        </Link>
      </div>
    );

    return item;
  }

  const getContractNo = (item) => {
    if (item.status === "A") {
      item.contractNo = JSON.parse(item.contractNo)?.object?.lchdContNo;
    } else {
      item.contractNo = item.contractNo;
    }

    return item;
  }

  const modernization = (item) => {
    item = getLabel(item);
    item = getAction(item);
    item = getContractNo(item);
    return item;
  }

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      
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
            title={"Approval And Retification"}
            breadcrumbItem={"Origination"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Appraisal Origination</CardTitle>
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
                            {...register("status", { required: true })}>
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
                      <Col className="col-12 mt-4">
                        <div className="d-flex justify-content-end">
                          <button
                            type="submit" className="btn btn-primary waves-effect waves-light">
                            <span className="d-flex"><Loader loading={isLoading} /> <p className="m-0">Search</p></span>
                          </button>
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

Origination.propTypes = {
  t: PropTypes.any,
};

export default Origination;