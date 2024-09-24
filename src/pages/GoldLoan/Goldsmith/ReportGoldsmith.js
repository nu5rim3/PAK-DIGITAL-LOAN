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

// APIs
import { getGoldsmithByBranchCode } from "services/goldsmith.service";
import { getAllBranches } from "services/common.service";

import Table from "components/Datatable/Table";
import Breadcrumbs from "components/Common/Breadcrumb";
import { useForm } from "react-hook-form";

const ReportGoldSmith = (props) => {

  const [goldsmith, setGoldsmith] = useState([]);
  const [branches, setBranches] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const getLabel = (item) => {
    item.branchIdFx = item.branchIdFx;
    item.shopName = item.shopName;
    item.ownerName = item.ownerName;
    item.lastModifiedDate = item.lastModifiedDate;
    if (item.goldsmithStatus === "A") {
      {
        item.goldsmithStatus = <Badge
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
        item.goldsmithStatus = <Badge
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
        label: 'Goldsmith ID',
        sort: "asc",
      },
      {
        field: 'branchIdFx',
        label: 'Branch',
        sort: "asc",
      },

      {
        field: 'shopName',
        label: 'Shop Name',
        sort: "asc",
      },
      {
        field: 'ownerName',
        label: 'Owner Name',
        sort: "asc",
      },
      {
        field: 'lastModifiedDate',
        label: 'Updated Date',
        sort: "asc",
      },
      {
        field: 'goldsmithStatus',
        label: 'Status',
        sort: "asc",
      }
    ],
    rows: goldsmith

  };
  const { register, handleSubmit, watch, setValue, setError, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    console.log(data)
    // if (data.branchIdFx === "" && data.shopName === "") {
    //   // const allGoldsmithsResponse = await getAllGoldsmiths();
    //   // if (allGoldsmithsResponse !== undefined && allGoldsmithsResponse !== null) {
    //   //   var data = allGoldsmithsResponse.map(item => modernization(item.content));

    //   //   setGoldsmith(data);
    //   //   setIsLoading(false);
    //   // }
    // } else if (data.branchIdFx !== "") {
    const branchIdRespose = await getGoldsmithByBranchCode(data.branchIdFx);
    console.log(branchIdRespose)
    if (branchIdRespose !== undefined && branchIdRespose !== null) {
      var data = branchIdRespose.map(item => modernization(item));

      setGoldsmith(data);
      setIsLoading(false);
    }


    reset();

  }

  const modernization = (item) => {
    item = getLabel(item);
    // item = getActions(item);
    return item;
  }


  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const branchesResponse = await getAllBranches();
      if (_isMounted && branchesResponse !== undefined) {
        setBranches(branchesResponse);
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    }
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={"Report and Summery"}
            breadcrumbItem={"Goldsmith Report"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Goldsmith Report</CardTitle>
                  <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Row className="my-4">
                        <Col className="col-3">
                          <div className="form-group row">
                            <label
                              htmlFor="example-date-input"
                              className="col-form-label">Select Branch : </label>
                            <div className="col-md-12">
                              <select className="form-control" name="branchIdFx"
                                {...register("branchIdFx", { required: false })}>
                                <option value="">-- Select --</option>
                                {branches?.map((item, index) => <option key={index} value={item.code}>{item.description}</option>)}
                              </select>
                            </div>
                            {errors.branchIdFx && <span className="error">This field is required</span>}
                          </div>
                        </Col>
                        <Col className="col-3">
                          <div className="form-group row">
                            <label
                              htmlFor="example-date-input"
                              className="col-form-label">Shop Name : </label>
                            <div className="col-md-12">
                              <input {...register("shopName", { required: false })}
                                className="form-control"
                                type="text"
                                placeholder="-- Shop Name --"
                                name="shopName" id="shopName" />
                            </div>
                            {errors.shopName && <span className="error">This field is required</span>}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="col-12 mt-0">
                          <div className="d-flex justify-content-end">
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
                    </form>
                  </div>

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


export default ReportGoldSmith;