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

// APIs
import {
  getAllUsers
} from "services/user.service";

const Member = (props) => {

  const PAGE = 0;

  const SIZE = 1000;

  const [users, setUsers] = useState([]);
  const [data, setData] = useState(null);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const toggelCreateModal = () => {
    setIsOpenCreate(!isOpenCreate);
  }

  const toggelUpdateModal = (data) => {
    setData(data);
    setIsOpenUpdate(!isOpenUpdate);
  }

  const getLabel = (item) => {
    if (item.status === "A") {
      item.status = "Active";
      return item;
    } else {
      item.status = "Inactive";
      return item;
    }
  };

  const getRoles = (item) => {
    if (item.roles.length > 0) {
      item.roles = item.roles.map(role => role.code).join(" , ");
      return item;
    } else {
      item.roles = "";
      return item;
    }
  }

  const getLastModifiedDate = (item) => {
    item.lastModifiedDate = moment(item.lastModifiedDate).format("YYYY-MM-DD");
    return item;
  }

  const getActions = (item) => {
    item.actions = (
      <div className="d-flex align-items-center">
        <button className="btn btn-warning btn-sm d-flex justify-content-between align-items-center"
          onClick={() => toggelUpdateModal(item)}>
          <i className="bx bxs-edit font-size-16 me-1"></i>
          <p className="m-0">Update</p>
        </button>
      </div>
    )
    return item;
  }

  const items = {
    columns: [
      {
        field: 'idx',
        label: 'IDX',
        sort: "asc",
      },
      {
        field: 'userName',
        label: 'User Name',
        sort: "asc",
      },
      {
        field: 'roles',
        label: 'Role',
        sort: "asc",
      },
      {
        field: 'profileUser',
        label: 'Profile User',
        sort: "asc",
      },
      {
        field: 'status',
        label: 'Status',
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
    rows: users,
  };

  const modernization = (item) => {
    item = getRoles(item);
    item = getLabel(item);
    item = getLastModifiedDate(item);
    item = getActions(item);
    return item;
  }

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const userResponse = await getAllUsers(PAGE, SIZE);
      if (_isMounted && userResponse !== undefined) {
        var data = userResponse.content.map(item => modernization(item));
        setUsers(data);
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
            breadcrumbItem={"Members"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">System Members</CardTitle>

                  <div className="d-flex justify-content-between mb-4">
                    <p className="card-title-desc">
                      The system end members of the system refer to the people who use computers to perform their jobs, like desktop operators.
                    </p>

                    <button className="btn btn-primary btn-sm d-flex justify-content-between align-items-center"
                      onClick={() => toggelCreateModal(true)}>
                      <i className="bx bxs-plus-square font-size-16 me-1"></i>
                      <p className="m-0">Create User</p>
                    </button>

                  </div>

                  <Table items={items} />

                </CardBody>
              </Card>
            </Col>

            <Create toggel={toggelCreateModal} isOpen={isOpenCreate} />
            <Update toggel={toggelUpdateModal} isOpen={isOpenUpdate} data={data} onSuccessfulUpdate={() => console.log('Data Feteched')} />

          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

Member.propTypes = {
  t: PropTypes.any,
};

export default Member;