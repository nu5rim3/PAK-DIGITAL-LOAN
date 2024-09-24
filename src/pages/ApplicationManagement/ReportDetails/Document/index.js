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
  Container,
  Button
} from "reactstrap";

import Loader from "components/SyncLoader";

import FileViewer from 'react-file-viewer';

//APIs
import {
  getProNoteReport,
  getIqarNamaReport,
  getLandVerificationReport
} from "services/report.service";

const ReportDocument = (props) => {

  const { reportType } = useParams();
  const { appraisalId } = useParams();

  const [type, setType] = useState(null);
  const [data, setData] = useState(null);

  const onError = (error) => {
    console.error(error, 'error in file-viewer');
  }

  const download = () => {
    window.open(data);
  }

  useEffect(async () => {
    var _isMounted = true;
    if (reportType === 'pro-note') {
      const response = await getProNoteReport(appraisalId);

      if (response != undefined) {
    
        var fileURL = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

        if (_isMounted) {
          setData(fileURL);
          setType('pdf');
        }
      }

      return () => {
        _isMounted = false;
      };
    }

    if (reportType === 'iqar-name') {
      const response = await getIqarNamaReport(appraisalId);

      if (response != undefined) {

        var fileURL = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

        if (_isMounted) {
          setData(fileURL);
          setType('pdf');
        }
      }

      return () => {
        _isMounted = false;
      };
    }

    if (reportType === 'land-verification') {
      const response = await getLandVerificationReport(appraisalId);

      if (response != undefined) {

        var fileURL = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

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
                  <Loader loading={true}><p>test details</p></Loader>
                  <CardTitle className="h4"></CardTitle>
                  <div className="d-flex justify-content-between">
                  <p className="card-title-desc"> Reports.</p>
                  <Button size="md" color="success" onClick={download}><i className="fa fa-download me-2"></i>Download</Button>
                  </div>

                  <div key={1} className="d-flex flex-column document-wrapper">
                    <div className="justify-content-center">
                    {data != null && <FileViewer
                      fileType={type}
                      filePath={data}
                      onError={onError} />}
                    </div>
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

ReportDocument.propTypes = {
  match: PropTypes.any
};

export default ReportDocument;