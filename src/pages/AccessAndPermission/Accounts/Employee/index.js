import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

import moment from "moment";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import Table from "components/Datatable/Table";

// Local Components
import Create from "./Create";
import Update from "./Update";
import DeActivateEmployee from "./DeActivateEmployee";
import ActivateEmployee from "./ActivateEmployee";
// APIs
import {
  getAllEmployees
} from "services/employee.service";

const Employee = (props) => {

  const PAGE = 0;

  const SIZE = 1000;

  const [employees, setEmployees] = useState([]);
  const [data, setData] = useState(null);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isDeactivate, setIsDecivate] = useState(false);
  const [isOpenActivate, setIsOpenActivate] = useState(false);

  const toggelCreateModal = () => {
    setIsOpenCreate(!isOpenCreate);
  }
  const toggelDeactivateModal = (data) => {
    setData(data);
    setIsDecivate(!isDeactivate);
  };
  const toggelActivateModal = (data) => {
    setData(data);
    setIsOpenActivate(!isOpenActivate);
  };

  const toggelUpdateModal = (data) => {
    setData(data);
    setIsOpenUpdate(!isOpenUpdate);
  }

  const getLabel = (item) => {
    if (item.status === "A") {
      item.status = "ACTIVE";
      return item;
    } else {
      item.status = "INACTIVE";
      return item;
    }
  };



  const getLastModifiedDate = (item) => {
    item.lastModifiedDate = moment(item.lastModifiedDate).format("YYYY-MM-DD");
    return item;
  }

  const getActions = (item) => {
    if (item.status === "ACTIVE") {
      item.actions = (
        <Row>
          <Col>
            <div className="d-flex align-items-center">
              <button className="btn btn-warning btn-sm d-flex justify-content-between align-items-center"
                onClick={() => toggelUpdateModal(item)}>
                <i className="bx bxs-edit font-size-16 me-1"></i>
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
              <button className="btn btn-success btn-sm d-flex align-items-space-between m-1"
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
        field: 'empNo',
        label: 'Employee No',
        sort: "asc",
      },
      {
        field: 'empName',
        label: 'Employee Name',
        sort: "asc",
      },
      {
        field: 'empDisplayName',
        label: 'Display Name',
        sort: "asc",
      },
      {
        field: 'lastModifiedDate',
        label: 'Last Modified Date',
        sort: "asc",
      },
      {
        field: 'status',
        label: 'Status',
        sort: "asc",
      },
      {
        field: 'actions',
        label: 'Action',
        sort: "asc",
      }
    ],
    rows: employees,
  };

  const modernization = (item) => {
    item = getLabel(item);
    item = getLastModifiedDate(item);
    item = getActions(item);
    return item;
  }

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const employeeResponse = await getAllEmployees(PAGE, SIZE);

      if (_isMounted && employeeResponse !== undefined) {
        var data = employeeResponse.data.content.map(item => modernization(item));
        setEmployees(data);
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
            title={"Access & Permission"}
            breadcrumbItem={"Business Introducers"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">System Business Introducers</CardTitle>

                  <div className="d-flex justify-content-between mb-4">
                    <p className="card-title-desc">
                      The system end Business Introducers of the system refer to the people who use computers to perform their jobs, like desktop operators.
                    </p>

                    <button className="btn btn-primary btn-sm d-flex justify-content-between align-items-center"
                      onClick={() => toggelCreateModal(true)}>
                      <i className="bx bxs-plus-square font-size-8 me-1"></i>
                      <p className="m-0">Create</p>
                    </button>

                  </div>

                  <Table items={items} />

                </CardBody>
              </Card>
            </Col>

            <Create toggel={toggelCreateModal} isOpen={isOpenCreate} />
            <Update toggel={toggelUpdateModal} isOpen={isOpenUpdate} data={data} onSuccessfulUpdate={() => console.log('Data Feteched')} />
            <DeActivateEmployee toggel={toggelDeactivateModal} isOpen={isDeactivate} data={data} onSuccessfulDeactivate={() => console.log('Data Feteched')} />
            <ActivateEmployee toggel={toggelActivateModal} isOpen={isOpenActivate} data={data} onSuccessfulActivate={() => console.log('Data Feteched')} />

          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

Employee.propTypes = {
  t: PropTypes.any,
};

export default Employee;