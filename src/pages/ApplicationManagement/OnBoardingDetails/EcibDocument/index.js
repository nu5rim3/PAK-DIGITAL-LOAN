import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Row,
  Col,
  CardTitle,
  Card,
  CardBody,
  Container
} from "reactstrap";

import FileViewer from 'react-file-viewer';

//APIs
import {
  getEcibReport
} from "services/scoring.service";

const EcibDocument = (props) => {

  const [type, setType] = useState(null);
  const [data, setData] = useState(null);

  const onError = (error) => {
    console.error(error, 'error in file-viewer');
  }

  useEffect(async () => {
    var _isMounted = true;
    if (props.match.params.cnic != "") {
      const response = await getEcibReport(props.match.params.cnic);

      if (response != undefined) {
    
        var fileURL = URL.createObjectURL(response.data);
        window.open(fileURL);

        if (_isMounted) {
          setData(fileURL);
          setType('pdf');
        }
      }

      return () => {
        _isMounted = false;
      };
    }
  }, []);

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
                    {props.match.params.cnic != "" && data != null && <FileViewer
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