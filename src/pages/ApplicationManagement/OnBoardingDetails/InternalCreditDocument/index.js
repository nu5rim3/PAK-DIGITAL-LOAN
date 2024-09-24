import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MetaTags from "react-meta-tags";
import {
  Row,
  Col,
  CardTitle,
  Card,
  CardBody,
  Container
} from "reactstrap";

// Local components
import InternalCribDetails from "./InternalCribDetails";

//APIs
const InternalCreditDocument = (props) => {

  const { id } = useParams();

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Report | Pakoman Digital Loan | Mobile Solutions - LOITS</title>
        </MetaTags>

        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Clietele ID : {id}</CardTitle>
                  <p className="card-title-desc">
                    INTERNAL CREDIT HISTORY
                  </p>

                  <InternalCribDetails clientele={id} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

InternalCreditDocument.propTypes = {
  match: PropTypes.any
};

export default InternalCreditDocument;