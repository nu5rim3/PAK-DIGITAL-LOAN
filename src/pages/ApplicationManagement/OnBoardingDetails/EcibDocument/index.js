import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Row,
  Col,
  CardTitle,
  Card,
  Collapse,
  Table,
  CardBody,
  CardText,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Label,
  Button,
  Modal,
  Container
} from "reactstrap";

import FileViewer from 'react-file-viewer';

//APIs
import {
  viewPdf
} from "services/on_board.service";

const EcibDocument = (props) => {

  const [type, setType] = useState(null);
  const [data, setData] = useState(null);

  const onError = (error) => {
    logger.error(error, 'error in file-viewer');
  }

  useEffect(async () => {
    var _isMounted = true;
    if (props.match.params.path != "") {
      const response = await viewPdf(props.match.params.path);

      if (response != undefined && response.status == 200) {
        const data = `data:${response.headers['content-type']};base64,${new Buffer(response.data).toString('base64')}`;

        if (_isMounted) {
          setData(data);
          setType(response.headers['content-type'].split("/")[1]);
        }
      }

      return () => {
        _isMounted = false;
      };
    }
  }, [data]);

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
                  <CardTitle className="h4"></CardTitle>
                  <p className="card-title-desc">
                    eCIB Report.
                  </p>

                  <div key={1} className="document-wrapper">
                    {props.match.params.path != "" && data != null && <FileViewer
                      fileType={type}
                      filePath={data}
                      onError={onError} />}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

EcibDocument.propTypes = {
  match: PropTypes.any
};

export default EcibDocument;