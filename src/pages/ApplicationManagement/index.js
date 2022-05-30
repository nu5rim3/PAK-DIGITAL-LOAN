import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap"

import "./style.scss"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Local Components
import AccordionBody from "./AccordionBody";
import OnBoardingDetails from "./OnBoardingDetails";
import CustomerDetails from "./CustomerDetails";
import GuarantorDetails from "./GuarantorDetails";
import WitnessDetails from "./WitnessDetails";
import LoanDetails from "./LoanDetails";
import IncomeExpensesDetails from "./IncomeExpensesDetails";
import LiabilityDetails from "./LiabilityDetails";
import CreditScoringDetails from "./CreditScoringDetails";
import ImageDetails from "./ImageDetails";
import ReportDetails from "./ReportDetails";
import ApprovalDetails from "./ApprovalDetails";
// APIs
import {
  getOnBoardClienteles
} from "services/on_board.service";
const Appraisal = () => {

  const { appraisalId } = useParams();

  const [customIconActiveTab, setcustomIconActiveTab] = useState("1");
  const [isReturned, setReturned] = useState({});
  const toggleIconCustom = tab => {
    if (customIconActiveTab !== tab) {
      setcustomIconActiveTab(tab);
    }
  };
  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {

      const response = await getOnBoardClienteles(appraisalId);
      if (_isMounted && response !== undefined) {
        setReturned(response?.isReturned);

      }

    };

    fetchData();

    return () => {
      _isMounted = false;
    };
  });
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Appraisal | Pakoman Digital Loan | Mobile Solutions - LOITS</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Appraisals" breadcrumbItem="Origination Application Details" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Appraisal ID : {appraisalId}  {(isReturned === 'Y') ? '[Returned]' : ''}</CardTitle>

                  <AccordionBody title="ON BOARDING DETAILS">
                    <OnBoardingDetails active={"1"} />
                  </AccordionBody>

                  <AccordionBody title="CUSTOMER DETAILS">
                    <CustomerDetails active={"2"} />
                  </AccordionBody>

                  <AccordionBody title="GUARANTOR DETAILS">
                    <GuarantorDetails active={"3"} />
                  </AccordionBody>

                  <AccordionBody title="WITNESS DETAILS">
                    <WitnessDetails active={"4"} />
                  </AccordionBody>

                  <AccordionBody title="LOAN DETAILS">
                    <LoanDetails active={"5"} />
                  </AccordionBody>

                  <AccordionBody title="CASH FLOW DETAILS">
                    <IncomeExpensesDetails active={"6"} />
                  </AccordionBody>

                  <AccordionBody title="LIABILITY DETAILS">
                    <LiabilityDetails active={"7"} />
                  </AccordionBody>

                  <AccordionBody title="CREDIT SCORE DETAILS">
                    <CreditScoringDetails active={"8"} />
                  </AccordionBody>

                  <AccordionBody title="IMAGE DETAILS">
                    <ImageDetails active={"9"} />
                  </AccordionBody>

                  <AccordionBody title="REPORT DETAILS">
                    <ReportDetails active={"11"} />
                  </AccordionBody>

                  <AccordionBody title="APPROVAL DETAILS">
                    <ApprovalDetails active={"10"} />
                  </AccordionBody>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Appraisal;
