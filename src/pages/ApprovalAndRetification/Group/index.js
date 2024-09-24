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
  getAllApprovalGroups,
} from "services/approval.service";

const Group = (props) => {

  const [data, setData] = useState([]);

  const items = {
    columns: [
      {
        field: 'code',
        label: 'Code',
        sort: "asc",
      },
      {
        field: 'name',
        label: 'Description',
        sort: "asc",
      },
      {
        field: 'status',
        label: 'Status',
        sort: "asc",
      }
    ],
    rows: data,
  };

  const getLabel = (item) => {
    if (item.status === "A") {
      item.status = "Active";
      return item;
    } else {
      item.status = "Inactive";
      return item;
    }
  }

  const modernization = (item) => {
    item = getLabel(item);
    return item;
  }

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const approvalGroupResponse = await getAllApprovalGroups();
      if (_isMounted && approvalGroupResponse !== undefined) {
        var data = approvalGroupResponse.map(item => modernization(item));
        setData(approvalGroupResponse);
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
            title={"Approval And Retification"}
            breadcrumbItem={"Groups"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Approval Groups</CardTitle>
                  <p className="card-title-desc">

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

Group.propTypes = {
  t: PropTypes.any,
};

export default Group;