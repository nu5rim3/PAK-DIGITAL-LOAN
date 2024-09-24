import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
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
import GeoDetails from "./GeoDetails";
import UndertakingDetails from "./CustomerDetails/undertaking";
import ReportDetails from "./ReportDetails";
import ApprovalDetails from "./ApprovalDetails";
import GoldLoanDetails from "./GoldLoanDetails";

// APIs
import {
  getOnBoardClienteles
} from "services/on_board.service";
import {
  getAllOriginationCredit
} from "services/origination.service";
import {
  getTcDetails
} from "services/tc.service";

const Appraisal = (props) => {

  const { appraisalId } = useParams();

  const [customIconActiveTab, setcustomIconActiveTab] = useState("1");
  const [isReturned, setReturned] = useState({});
  const [goldLoanData, isGoldLoanData] = useState({});
  const [goldProduct, isGoldProduct] = useState(false);

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

      // const creditRespose = await getAllOriginationCredit(appraisalId, props.product);
      // console.log(creditRespose);
      // if (_isMounted && creditRespose !== undefined) {
      //   isGoldLoanData(creditRespose);
      // }

      const productResponse = await getTcDetails(appraisalId);
      if (_isMounted && productResponse !== undefined) {
        isGoldLoanData(productResponse);

        if (productResponse.pTrhdLType === 'EG') {
          isGoldProduct(true)
        } else if (productResponse.pTrhdLType === 'GL') {
          isGoldProduct(true)
        } else if (productResponse.pTrhdLType === 'GN') {
          isGoldProduct(true)

        } else if (productResponse.pTrhdLType === 'MG') {
          isGoldProduct(true)
        }
      }

    };

    fetchData();

    return () => {
      _isMounted = false;
    };
  }, [props.product]);
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

                  {goldProduct &&
                    <AccordionBody title="GOLD LOAN DETAILS">
                      <GoldLoanDetails active={"2"} />
                    </AccordionBody>
                  }

                  <AccordionBody title="CUSTOMER DETAILS">
                    <CustomerDetails active={"3"} />
                  </AccordionBody>

                  {!goldProduct &&
                    <AccordionBody title="GUARANTOR DETAILS">
                      <GuarantorDetails active={"4"} />
                    </AccordionBody>
                  }

                  <AccordionBody title="WITNESS DETAILS">
                    <WitnessDetails active={"5"} />
                  </AccordionBody>

                  <AccordionBody title="LOAN DETAILS">
                    <LoanDetails active={"6"} />
                  </AccordionBody>

                  <AccordionBody title="CASH FLOW DETAILS">
                    <IncomeExpensesDetails active={"7"} />
                  </AccordionBody>

                  <AccordionBody title="LIABILITY DETAILS">
                    <LiabilityDetails active={"8"} />
                  </AccordionBody>

                  {!goldProduct &&
                    <AccordionBody title="CREDIT SCORE DETAILS">
                      <CreditScoringDetails active={"9"} />
                    </AccordionBody>
                  }

                  <AccordionBody title="IMAGE DETAILS">
                    <ImageDetails active={"10"} />
                  </AccordionBody>

                  <AccordionBody title="GEO DETAILS">
                    <GeoDetails active={"14"} />
                  </AccordionBody>

                  <AccordionBody title="CUSTOMER UNDERTAKING">
                    <UndertakingDetails active={"13"} />
                  </AccordionBody>

                  <AccordionBody title="REPORT DETAILS">
                    <ReportDetails active={"12"} />
                  </AccordionBody>

                  <AccordionBody title="APPROVAL DETAILS">
                    <ApprovalDetails active={"11"} />
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

Appraisal.propTypes = {
  product: PropTypes.string
}

export default Appraisal;
