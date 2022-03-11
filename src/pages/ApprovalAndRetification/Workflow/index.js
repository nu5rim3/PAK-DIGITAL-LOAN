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
  getAllApprovalWorkflows,
} from "services/approval.service";

const Workflow = (props) => {

  const [data, setData] = useState([]);

  const items = {
    columns: [
      {
        field: 'name',
        label: 'Code',
        sort: "asc",
      },
      {
        field: 'description',
        label: 'Description',
        sort: "asc",
      },
      {
        field: 'isStepRole',
        label: 'Is Step Role',
        sort: "asc",
      },
      {
        field: 'roleCode',
        label: 'Role Code',
        sort: "asc",
      },
      {
        field: 'isStepGroup',
        label: 'Is Step Group',
        sort: "asc",
      },
      {
        field: 'groupCode',
        label: 'Group Code',
        sort: "asc",
      },
      {
        field: 'order',
        label: 'Order',
        sort: "asc",
      }
    ],
    rows: data,
  };

  const getLabel = (item) => {
    if (item.isStepRole) {
      item.isStepRole = "Yes";
    } else {
      item.isStepRole = "No";
    }

    if (item.isStepGroup) {
      item.isStepGroup = "Yes";
    } else {
      item.isStepGroup = "No";
    }

    if (item.roleCode == null) {
      item.roleCode = "-";
    }

    if (item.groupCode == null) {
      item.groupCode = "-";
    }

    return item;
  }

  const modernization = (item) => {
    item = getLabel(item);
    return item;
  }

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const workflowResponse = await getAllApprovalWorkflows();
      if (_isMounted) {
        setData(workflowResponse.map(item => modernization(item)));
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
            breadcrumbItem={"Workflow"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Approval Workflow</CardTitle>
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

Workflow.propTypes = {
  t: PropTypes.any,
};

export default Workflow;