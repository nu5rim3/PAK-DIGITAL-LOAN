import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";

// Pages Components
import MonthlyEarning from "./MonthlyEarning";
import LatestTranaction from "./LatestTranaction";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";

const Dashboard = props => {

  const reports = [
    { title: "Pending Approval", iconClass: "bx bxs-hourglass-bottom", description: "1" },
    { title: "Review In-Progress", iconClass: "bx bx-pie-chart", description: "7" },
    { title: "Returned Application", iconClass: "bx bx-repost", description: "5" },
    { title: "Rejected Application", iconClass: "bx bx-x", description: "3" },
    { title: "Approved Application", iconClass: "bx bx-check", description: "4" },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | Pakoman Digital Loan | Mobile Solutions - LOITS</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            <Col xl="4">
              {/* <MonthlyEarning /> */}
            </Col>
            <Col xl="8">
              <Row>
                {/* Reports Render */}
                {/* {reports.map((report, key) => (
                  <Col md="4" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))} */}
              </Row>
            </Col>
          </Row>

          <Row>
            <Col xl="12">
              {/* <LatestTranaction /> */}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
