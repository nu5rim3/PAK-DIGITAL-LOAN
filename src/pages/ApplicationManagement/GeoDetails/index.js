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

// service
import { getAllImages } from "services/images.service"

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
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      if (props.active === "13") {
        const responseImages = await getAllImages(appraisalId);

        if (responseImages != undefined) {
          var locationDetails = responseImages?.map(img => {
            return {latitude: img.latitude, longitude: img.longitude, imgMasterCategory: img.imgMasterCategory}
          });

          setLocations(locationDetails);
        }
      }
    };

    fetchData();

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
                  {locations.length > 0 && locations.map((l, i) => <AnyReactComponent
                    key={i}
                    lat={l.latitude}
                    lng={l.longitude}
                    text={l.imgMasterCategory}
                  />)}
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