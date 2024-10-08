import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Row, Col } from "reactstrap"

import GoogleMapReact from "google-map-react"

import Loader from "components/Loader"

// Internal dependency
import Upload from "./Upload"

// service
import { getAllImages } from "services/images.service"

const GeoDetails = props => {
  const { appraisalId } = useParams()

  const defaultProps = {
    center: {
      lat: 30.3753,
      lng: 69.3451,
    },
    zoom: 7,
  }

  const [isLoading, setIsLoading] = useState(false)
  const [locations, setLocations] = useState([])
  const [active, setActive] = useState(false)

  const verifyUserRole = () => {
    var role = localStorage.getItem("role")

    if (role === "BHO" || role === "CO") {
      return true
    } else return false
  }

  const checkAldreadySubmit = category => {
    var role = localStorage.getItem("role")
    if (role === "CO" && category.includes("GEO_DETAILS_CO")) {
      setActive(true)
      return
    }

    if (role === "BHO" && category.includes("GEO_DETAILS_BHO")) {
      setActive(true)
      return
    }

    setActive(false)
  }

  useEffect(() => {
    var _isMounted = true
    setIsLoading(true)

    const fetchData = async () => {
      if (props.active === "14") {
        const responseImages = await getAllImages(appraisalId)

        console.log("[responseImages] - ", responseImages)
        if (responseImages != undefined && _isMounted) {
          var locationDetails = responseImages?.map(img => {
            checkAldreadySubmit(img?.imgMasterCategory)
            return {
              latitude: img.latitude,
              longitude: img.longitude,
              imgMasterCategory: img.imgMasterCategory,
            }
          })

          setLocations(locationDetails)
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      _isMounted = false
    }
  }, [props.active])

  const getCatagoryColor = category => {
    // console.log("[category] - ", category)
    switch (category) {
      case "GEO_DETAILS_BHO":
        return { color: "#F44546", categoryName: "Branch Manager" }

      case "GEO_DETAILS_CO":
        return { color: "#21409A", categoryName: "Credit Officer" }

      default:
        return { color: "#039C4B", categoryName: "CRO" }
    }
  }
  // TODO: clarification needed
  const Marker = ({ index, text }) => (
    <div className="pin">
      <span className="d-flex flex-column">
        <div>
          <i
            className="bx bxs-map"
            style={{ fontSize: "46px", color: getCatagoryColor(text).color }}
          ></i>
        </div>
        <div style={{ width: "150px" }}>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "800",
              color: "black",
              WebkitTextStroke: "0.5px white",
            }}
          >
            {getCatagoryColor(text).categoryName}
          </p>
        </div>
      </span>
    </div>
  )

  return (
    <Row>
      <Loader loading={isLoading}>
        <Row>
          <Col lg={verifyUserRole() ? 6 : 12}>
            <div className="mt-4">
              <div className="google-map" style={{ height: "100vh" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
                  }}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                >
                  {locations.length > 0 &&
                    locations.map((l, i) => (
                      <Marker
                        key={i}
                        index={i}
                        lat={l.latitude}
                        lng={l.longitude}
                        text={l.imgMasterCategory}
                      />
                    ))}
                </GoogleMapReact>
              </div>
            </div>
          </Col>
          {verifyUserRole() && active === false && (
            <Col md={12} lg={6}>
              <div className="mt-4">
                <Upload appraisalId={appraisalId} />
              </div>
            </Col>
          )}
        </Row>
      </Loader>
    </Row>
  )
}

GeoDetails.propTypes = {
  active: PropTypes.string,
  index: PropTypes.string,
  text: PropTypes.string,
}

export default GeoDetails
