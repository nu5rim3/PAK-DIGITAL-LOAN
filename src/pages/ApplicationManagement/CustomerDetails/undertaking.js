import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
} from "reactstrap";

import Grid from '@material-ui/core/Grid'

import Loader from "components/Loader";
import AsyncImage from "pages/ApplicationManagement/ImageDetails/async_images";

// APIs
import {
  getSignature,
  getThumb,
} from "services/customer.service"

const UndertakingDetails = (props) => {

  const { appraisalId } = useParams();

  const [signature, setSignature] = useState([]);
  const [thumb, setThumb] = useState([]);

  const getCustomerAknowledgement = () => {
    return <p style={{ direction: 'rtl' }}>
      میں ا قرار کر تا/کر تی ھوں کہ اوپر دی گئی تمام معلومات میری علم کے مطابق درست ہیں اور کوئی آمر پوشیدہ نہیں رکھا گیا اور دی گئی معلومات اگر غلط ثابت ہوں تو پاک عمان مائکرو فنانس بینک میری قرضے کی درخواست کو مسترد کر سکتا ہے ۔مزید یہ کہہ میں پاک عمان بینک کو یہ حق بھی دیتا/دیتی ہوں کہ وہ میری معلومات کا تبادلہ کسی بھی بینک/کریڈٹ بیورو/فنانشل انسٹیٹیوٹ یا کمپنی کے ساتھ کر سکتا ہے اور یہ حق بھی رکھتا ہے کہ ان معلومات کا تبادلہ اسٹیٹ بینک کے ECIB کے ساتھ بھی کر سکتا ہے
    </p>;
  }

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const signatureResponse = await getSignature(appraisalId, `CUSTOMER1`);
      const thumbResponse = await getThumb(appraisalId, `CUSTOMER1FINGER`);
      if (_isMounted && signatureResponse !== undefined) {
        setSignature(signatureResponse);
        setThumb(thumbResponse);
      }
      
    };

    fetchData();

    return () => {
      _isMounted = false;
    }
  }, [])


  return (
    <Row>
      <Loader loading={false} >
        <Col lg={12}>
          <div className="page-wrapper-context">
            <Row>
              <div className="text-muted d-flex">
                <div className="col-12 col-md-12">
                  <Card className="customer-signature-card">
                    <p style={{ textAlign: 'right' }}>
                      {getCustomerAknowledgement()}
                    </p>
                  </Card>
                </div>
              </div>
            </Row>
            <Row>
              <div className="text-muted d-flex">
                <div className="col-6 col-md-6 col-sm-6">
                  <Card className="customer-signature-card">
                    <p>Customer Thumbnail</p>
                    {thumb && thumb.length > 0 && thumb.map((sign, index) => (
                      sign.status === "A" && <AsyncImage src={sign.hashIdentifier} key={index} />
                    ))}
                  </Card>
                </div>
                <div className="col-6 col-md-6 col-sm-6">
                  <Card className="customer-signature-card">
                    <p>Customer Signature</p>
                    {signature && signature.length > 0 && signature.map((sign, index) => (
                      sign.status === "A" && <AsyncImage src={sign.hashIdentifier} key={index} />
                    ))}
                  </Card>
                </div>
              </div>
            </Row>
          </div>
        </Col>
      </Loader>
    </Row>
  )
}

UndertakingDetails.propTypes = {
  active: PropTypes.string,
};

export default UndertakingDetails;