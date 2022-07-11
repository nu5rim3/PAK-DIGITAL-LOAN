import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
} from "reactstrap";

import GoogleMapReact from 'google-map-react';

import Loader from "components/Loader";

// Internal dependency
import Upload from "./Upload";

const GeoDetails = (props) => {

  const { appraisalId } = useParams();

  const defaultProps = {
    center: {
      lat: 30.3753,
      lng: 69.3451
    },
    zoom: 7
  };


  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      if (props.active === "13") {

      }
    };

    return () => {
      _isMounted = false;
    };
  }, [props.active]);

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  return (
    <Row>
      <Loader loading={isLoading} >
        <Row>
          <Col md={6}>
            <div className="mt-4">
              <div style={{ height: '100vh' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: "" }}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                >
                  <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                  />
                </GoogleMapReact>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="mt-4">
              <Upload appraisalId={appraisalId} />
            </div>
          </Col>
        </Row>
      </Loader>
    </Row>

  );
}

GeoDetails.propTypes = {
  active: PropTypes.string,
  text: PropTypes.string
};

export default GeoDetails;