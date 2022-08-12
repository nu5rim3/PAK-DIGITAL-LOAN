import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  TabContent,
} from "reactstrap";

import "./style.scss";

import classnames from "classnames";

// Local Component
import Loader from "components/Loader";
import IntialDetails from "./InitialDetails";
import CalculationDetails from "./CalculationDetails";

// APIs
import {
  getOnBoardClienteles
} from "services/on_board.service";
import {
  getValueOfClientele,
} from "services/common.service";

const OnBoardingDetails = (props) => {

  const { appraisalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [clienteles, setClienteles] = useState([]);
  const [verticalActiveTab, setVerticalActiveTab] = useState(0);

  const toggleVertical = (tab) => {
    if (verticalActiveTab !== tab) setVerticalActiveTab(tab);
  }

  useEffect(() => {
    var _isMounted = true;

    setIsLoading(true);

    const fetchData = async () => {
      if (props.active === "1") {
        const response = await getOnBoardClienteles(appraisalId);
        if (_isMounted && response !== undefined) {
          setClienteles(response?.clienteles?.sort((a, b) => a.type.toLowerCase().localeCompare(b.type.toLowerCase())));
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    };
  }, [props.active]);


  return (
    <Row>
      <Loader loading={isLoading}>
        <Col lg={12}>
          <div className="page-wrapper-context">
            <div className="mt-4">
              <Row>
                <Col md="3">
                  <Nav pills className="flex-column">
                    {clienteles && clienteles.map((clientele, index) => (
                      <NavItem key={index}>
                        {clientele?.status === "A" && <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            "mb-2": true,
                            active: verticalActiveTab === index,
                          })}
                          onClick={() => {
                            toggleVertical(index);
                          }}
                        >
                          {getValueOfClientele(clientele?.type)} - {clientele?.fullName}
                        </NavLink>}
                      </NavItem>
                    ))}
                  </Nav>
                </Col>
                <Col md="9">
                  <TabContent
                    activeTab={verticalActiveTab}
                    className="text-muted"
                  >
                    {clienteles && clienteles.map((clientele, index) => (
                      <TabPane key={index} tabId={index}>
                        <Row>
                          <div id="initial-details">
                            <IntialDetails clientele={clientele} />
                          </div>

                          {clientele.type === "C" && (
                            <div id="rental-calculation-details">
                              <h5 className="p-2 mt-4">Loan Installment Calculation</h5>
                              <CalculationDetails clientele={clientele} />
                            </div>
                          )}
                        </Row>
                      </TabPane>
                    ))}
                  </TabContent>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Loader>
    </Row>
  );
}

OnBoardingDetails.propTypes = {
  active: PropTypes.string,
};

export default OnBoardingDetails;