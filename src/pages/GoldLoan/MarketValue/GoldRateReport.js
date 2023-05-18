import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Badge
} from "reactstrap";

import { useForm } from "react-hook-form";

//APIs
import { getGoldRatesByDate } from "services/gold-rate.service";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import CurrencyInput from "../CurrencyInput";
import Table from "components/Datatable/Table";

const GoldRateReport = () => {

  const [goldRates, setGoldRates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getLabel = (item) => {
    item.id = item.id;
    item.valueAmount = item.valueAmount;
    item.lastModifiedBy = item.lastModifiedBy;
    item.lastModifiedDate = item.lastModifiedDate;
    item.valueComment = item.valueComment;
    if (item.valueStatus === "A") {
      {
        item.valueStatus = <Badge
          color="success"
          pill
          style={{ fontSize: 'small' }}
        >
          Active
        </Badge>
      }

      return item;
    } else {
      {
        item.valueStatus = <Badge
          color="danger"
          pill
          style={{ fontSize: 'small' }}
        >
          Inactive
        </Badge>
      }
      return item;
    }
  };

  const items = {
    columns: [
      {
        field: 'id',
        label: 'Gold Rate Record ID',
        sort: "asc",
      },
      {
        field: 'valueAmount',
        label: 'Gold Rate Per Gram',
        sort: "asc",
      },
      {
        field: 'valueAmount',
        label: 'Amount',
        sort: "asc",
      },
      {
        field: 'lastModifiedDate',
        label: 'Updated Date',
        sort: "asc",
      },
      {
        field: 'lastModifiedBy',
        label: 'Updated By',
        sort: "asc",
      },
      {
        field: 'valueStatus',
        label: 'Status',
        sort: "asc",
      },
      {
        field: 'valueComment',
        label: 'Comments',
        sort: "asc",
      },
    ],
    rows: goldRates

  };

  const { register, handleSubmit, watch, setValue, setError, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    console.log(data);
    const ratesByDateResponse = await getGoldRatesByDate(data.valueDate);
    console.log(ratesByDateResponse)
    if (ratesByDateResponse !== undefined && ratesByDateResponse !== null) {
      var data = ratesByDateResponse.map(item => modernization(item));

      setGoldRates(data);
      setIsLoading(false);
    }

    reset();

  }

  const modernization = (item) => {
    item = getLabel(item);
    // item = getActions(item);
    return item;
  }


  // useEffect(() => {
  //   var _isMounted = true;

  //   const fetchData = async () => {
  //     const branchesResponse = await getAllBranches();
  //     if (_isMounted && branchesResponse !== undefined) {
  //       setBranches(branchesResponse);
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //     _isMounted = false;
  //   }
  // }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={"Report and Summery"}
            breadcrumbItem={"Gold Rate Report"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Gold Rate Report</CardTitle>
                  <p className="card-title-desc">

                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="my-4">
                      <Col className="col-3">
                        <div className="form-group row">
                          <label
                            htmlFor="date-input"
                            className="col-md-4 col-form-label">Date : </label>
                          <div className="col-md-9">
                            <input {...register("valueDate", { required: false })}
                              className="form-control"
                              type="date"
                              defaultValue={new Date().toISOString().slice(0, 10)}
                              name="valueDate" id="valueDate" />
                          </div>
                        </div>
                      </Col>
                      <Col className="col-3">
                        <div className="form-group row">
                          <label
                            htmlFor="market-value"
                            className="col-form-label">Market Value : </label>
                          <div className="col-md-12">
                            <input {...register("valueAmount", { required: false })}
                              className="form-control"
                              type="text"
                              name="valueAmount" id="valueAmount" />
                          </div>
                          {errors.valueAmount && <span className="error">This field is required</span>}
                        </div>
                      </Col>
                      <Col style={{ marginTop: "30px" }}>
                        <div className="d-flex justify-content-start">
                          <div className="p-2">
                            <button
                              type="submit" className="btn btn-primary waves-effect waves-light">
                              <span className="d-flex"><p className="m-0">Search</p></span>
                            </button>
                          </div>
                          <div className="p-2">
                            <button
                              type="button" className="btn btn-success waves-effect waves-light">
                              <span className="d-flex"><p className="m-0"><i className="dripicons-download p-1"></i>Download</p></span>
                            </button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>

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

export default GoldRateReport;