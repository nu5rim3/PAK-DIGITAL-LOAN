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

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import Table from "components/Datatable/Table";

// APIs
import {
  getRoles
} from "services/role.service";

const Role = (props) => {

  const [roles, setRoles] = useState([]);

  const getLabel = (item) => {
    if (item.status === "A") {
      item.status = "Active";
      return item;
    } else {
      item.status = "Inactive";
      return item;
    }
  };

  const items = {
    columns: [
      {
        field: 'code',
        label: 'Code',
        sort: "asc",
      },
      {
        field: 'description',
        label: 'Description',
        sort: "asc",
      },
      {
        field: 'status',
        label: 'Status',
        sort: "asc",
      }
    ],
    rows: roles,
  };

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const roleResponse = await getRoles();
      if (_isMounted && roleResponse !== undefined) {
        var data = roleResponse.map((item) => getLabel(item));
        setRoles(data);
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
            breadcrumbItem={"Roles"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">System User Roles</CardTitle>
                  <p className="card-title-desc">
                    Role-based access control or role-based security is an approach to restricting system access to authorized users.
                  </p>

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

Role.propTypes = {
  t: PropTypes.any,
};

export default Role;