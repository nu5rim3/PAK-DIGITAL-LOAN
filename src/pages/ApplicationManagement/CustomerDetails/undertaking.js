import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
} from "reactstrap";

import Grid from '@material-ui/core/Grid'

import NumberFormat from "react-number-format";

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
      میں بقائمی ہوش وحواس <u>{""}</u> کو دئیے جانے والے مبلغ <u><NumberFormat value={"10000"} displayType={'text'} thousandSeparator={true} /></u> روپے کے قرض کی ضمانت قبول کرتا ہوں اور بلا مشروط اقرار کرتا ہوں کہ اگر قرض خواہ لیے گئے قرض کو کسی بھی وجہ سے ادا کرنے سے قاصر رہتا ہے تو اس قرض کی مکمل ادائیگی کی ذمہ داری مجھ پر ہوگی اور میں اُوپر دی گئی ذاتی اور قرض خواہ کے بارے میں دی گئی معلومات کے بارے میں پوری طرح متفق ہوں.
    </p>;
  }

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const signatureResponse = await getSignature(appraisalId, `C1`);
      setSignature(signatureResponse);
  
      const thumbResponse = await getThumb(appraisalId, `CUSTOMER1FINGER`);
      setThumb(thumbResponse);
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
                <Grid item xs={12}>
                  <Card className="witness-signature-card">
                    <p style={{ textAlign: 'right' }}>
                      {getCustomerAknowledgement()}
                    </p>
                  </Card>
                </Grid>
              </div>
            </Row>
            <Row>
              <div className="text-muted d-flex">
                <Grid item xs={6}>
                  <Card className="witness-signature-card">
                    <p>Customer Thumbnail</p>
                    {thumb && thumb.length > 0 && thumb.map((sign, index) => (
                      sign.status === "A" && <AsyncImage src={sign.imgPath} key={index} />
                    ))}
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card className="witness-signature-card">
                    <p>Customer Signature</p>
                    {signature && signature.length > 0 && signature.map((sign, index) => (
                      sign.status === "A" && <AsyncImage src={sign.imgPath} key={index} />
                    ))}
                  </Card>
                </Grid>
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