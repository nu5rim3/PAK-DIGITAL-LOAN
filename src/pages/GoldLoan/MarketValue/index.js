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

//APIs
import { getAllGoldRates } from "services/gold-rate.service";


import Table from "components/Datatable/Table";
import Breadcrumbs from "components/Common/Breadcrumb";
import RegisterGoldRates from "./RegisterGoldRate";
import UpdateGoldRates from "./UpdateGoldRate";
import DeactivateGoldRates from "./DeactivateGoldRate";
import ActivateGoldRates from "./ActivateGoldRates";


const IndexMarcketValue = (props) => {

  const [goldRates, setGoldRates] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isDeactivate, setIsDecivate] = useState(false);
  const [isOpenActivate, setIsOpenActivate] = useState(false);
  const [data, setData] = useState(null);

  const toggelCreateModal = () => {
    setIsOpenCreate(!isOpenCreate);
  };

  const toggelUpdateModal = (data) => {
    setData(data);
    setIsOpenUpdate(!isOpenUpdate);
  };

  const toggelDeactivateModal = (data) => {
    setData(data);
    setIsDecivate(!isDeactivate);
  };

  const toggelActivateModal = (data) => {
    setData(data);
    setIsOpenActivate(!isOpenActivate);
  };

  const getLabel = (item) => {
    item.id = item.id;
    item.creationDate = item.creationDate;
    item.valueAmount = item.valueAmount;
    item.lastModifiedBy = item.lastModifiedBy;
    item.lastModifiedDate = item.lastModifiedDate;
    item.valueComment = item.valueComment;
    if (item.valueStatus === "A") {
      {
        item.valueStatus = "ACTIVE"
      }
      return item;
    } else {
      {
        item.valueStatus = "INACTIVE"
      }
      return item;
    }
  };

  const getActions = (item) => {
    if (item.valueStatus === "ACTIVE") {
      item.actions = (
        <Row>
          <Col>
            <div className="d-flex ">
              <button className="btn btn-warning btn-sm d-flex align-items-space-between m-1"
                onClick={() => toggelUpdateModal(item)}>
                <i className="bx bxs-edit font-size-18"></i>
                <p className="m-0">Update</p>
              </button>
            </div>
          </Col>
          <Col>
            <div className="d-flex ">
              <button className="btn btn-danger btn-sm d-flex align-items-space-between m-1"
                onClick={() => toggelDeactivateModal(item)}>
                <i className="bx bxs-trash font-size-18"></i>
                <p className="m-0">Deactivate</p>
              </button>
            </div>
          </Col>
        </Row>
      )
      return item;
    } else {
      item.actions = (
        <Row>
          <Col>
            <div className="d-flex ">
              <button className="btn btn-success btn-sm d-flex align-items-space-between"
                onClick={() => toggelActivateModal(item)}>
                <i className="bx bx-revision font-size-16"></i>
                <p className="m-0">Activate</p>
              </button>
            </div>
          </Col>
        </Row>
      )
      return item;
    }

  }

  const items = {
    columns: [
      {
        field: 'creationDate',
        label: 'Created Date',
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
      {
        field: 'actions',
        label: 'Action',
        sort: "asc",
      }
    ],
    rows: goldRates

  };

  const modernization = (item) => {
    item = getLabel(item);
    item = getActions(item);
    return item;
  }


  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const allGoldRateResponse = await getAllGoldRates();
      if (_isMounted && allGoldRateResponse !== undefined) {
        var data = allGoldRateResponse.content.map(item => modernization(item));
        setGoldRates(data);
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
            title={"Gold Loan Details"}
            breadcrumbItem={"Gold Rate"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Registered Gold Reates</CardTitle>

                  <div className="d-flex justify-content-between mb-4">
                    <p className="card-title-desc">
                      Here the all registered Gold Rates Per Gram According To The Market Details.
                    </p>

                    <button className="btn btn-primary btn-sm d-flex justify-content-between align-items-center"
                      onClick={() => toggelCreateModal(true)}>
                      <i className="bx bxs-plus-square font-size-18 me-1"></i>
                      <p className="m-0">Register Gold Rate</p>
                    </button>

                  </div>

                  <Table items={items} />

                </CardBody>
              </Card>
            </Col>

            <RegisterGoldRates toggel={toggelCreateModal} isOpen={isOpenCreate} />
            <UpdateGoldRates toggel={toggelUpdateModal} isOpen={isOpenUpdate} data={data} onSuccessfulUpdate={() => console.log('Data Feteched')} />
            <DeactivateGoldRates toggel={toggelDeactivateModal} isOpen={isDeactivate} data={data} onSuccessfulDeactivate={() => console.log('Data Feteched')} />
            <ActivateGoldRates toggel={toggelActivateModal} isOpen={isOpenActivate} data={data} onSuccessfulActivate={() => console.log('Data Feteched')} />

          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}


export default IndexMarcketValue;