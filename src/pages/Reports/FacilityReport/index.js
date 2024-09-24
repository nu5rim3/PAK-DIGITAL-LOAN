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
    getFacilityReport
} from "services/report.service";



const FacilityReport = (props) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);





    const { register, handleSubmit, watch, setValue, setError, reset, formState: { errors } } = useForm();








    const exportToExcel = async () => {
        var exportData = watch();

        const response = await getFacilityReport(exportData)

        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `facility-report.xlsx`;
        link.click();
    }


 






    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title={"Report And Summary"}
                        breadcrumbItem={"Facility Report"}
                    />

                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Gold Loan Facility Report</CardTitle>
                                    <p className="card-title-desc">

                                    </p>

                                    <form>
                                        <Row className="my-4">
                                            <Col className="col-3">
                                                <div className="form-group row">
                                                    <label
                                                        htmlFor="example-date-input"
                                                        className="col-md-4 col-form-label">Status : </label>
                                                    <div className="col-md-9">
                                                        <select className="form-control" name="status"
                                                            {...register("status", { required: false }) }>
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
                                                        className="col-md-4 col-form-label">From : </label>
                                                    <div className="col-md-9">
                                                        <input {...register("fromDate", { required: false }) }
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
                                                        <input {...register("toDate", { required: false }) }
                                                            className="form-control"
                                                            type="date"
                                                            defaultValue={new Date().toISOString().slice(0, 10)}
                                                            name="toDate" id="toDate" />
                                                    </div>
                                                </div>
                                            </Col>


                                            <Col className="col-3" style={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                alignItems: 'end'
                                            }}>
                                                {/* <div className="form-group row">
                                                    <label
                                                        htmlFor="example-date-input"
                                                        className="col-md-4 col-form-label" ></label>
                                                <div className="col-md-9"> */}
                                                <button onClick={exportToExcel}
                                                    type="button" className="btn btn-success waves-effect waves-light">
                                                    <span className="d-flex"><p className="m-0"><i className="dripicons-download"></i>Download</p></span>
                                                </button>
                                                {/* </div>
                                                </div> */}


                                            </Col>
                                        </Row>


                                    </form>


                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    );
}

FacilityReport.propTypes = {
    t: PropTypes.any,
};

export default FacilityReport;