import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Col, Row } from "reactstrap"
import Loader from "../Loader"

//API
import { getBiometricDetails } from "services/on_board.service"

//Fetch Bio Data
const BioDetails = () => {
  const { id } = useParams()

  const [bioData, setBioData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let _isMounted = true
    setLoading(true)
    const fetchBioData = async () => {
      const bioDataResponse = await getBiometricDetails(id)
      if (_isMounted) {
        setBioData(bioDataResponse)
        setLoading(false)
      }
    }

    fetchBioData()

    return () => {
      _isMounted = false
    }
  }, [])

  return (
    <div>
      <div className="p-3">
        <Loader loading={loading}>
          <Row className="border border-success rounded p-3 mb-3">
            <Col md={4}>
              <p className="m-0 grid-text text-center">Customer Name</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">-</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center font-weight-light">
                {bioData && bioData.length > 0 && bioData[0].name
                  ? bioData[0].name
                  : "-"}
              </p>
            </Col>
          </Row>

          <Row className="border border-success rounded p-3 mb-3">
            <Col md={4}>
              <p className="m-0 grid-text text-center">Customer CNIC</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">-</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">
                {bioData && bioData.length > 0 && bioData[0].cnic
                  ? bioData[0].cnic
                  : "-"}
              </p>
            </Col>
          </Row>

          <Row className="border border-success rounded p-3 mb-3">
            <Col md={4}>
              <p className="m-0 grid-text text-center ">
                Customer Father/Husband Name
              </p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">-</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">
                {bioData && bioData.length > 0 && bioData[0].fatherHusbandName
                  ? bioData[0].fatherHusbandName
                  : "-"}
              </p>
            </Col>
          </Row>

          <Row className="border border-success rounded p-3 mb-3">
            <Col md={4}>
              <p className="m-0 grid-text text-center">Date of Birth</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">-</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">
                {bioData && bioData.length > 0 && bioData[0].dateOfBirth
                  ? bioData[0].dateOfBirth
                  : "-"}
              </p>
            </Col>
          </Row>

          <Row className="border border-success rounded p-3 mb-3">
            <Col md={4}>
              <p className="m-0 grid-text text-center">Expiry Date</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">-</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">
                {bioData && bioData.length > 0 && bioData[0].expireDate
                  ? bioData[0].expireDate
                  : "-"}
              </p>
            </Col>
          </Row>

          <Row className="border border-success rounded p-3 mb-3">
            <Col md={4}>
              <p className="m-0 grid-text text-center">Birth Place</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">-</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">
                {bioData && bioData.length > 0 && bioData[0].birthPlace
                  ? bioData[0].birthPlace
                  : "-"}
              </p>
            </Col>
          </Row>

          <Row className="border border-success rounded p-3 mb-3">
            <Col md={4}>
              <p className="m-0 grid-text text-center">Present Address</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">-</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">
                {bioData && bioData.length > 0 && bioData[0].presentAddress
                  ? bioData[0].presentAddress
                  : "-"}
              </p>
            </Col>
          </Row>

          <Row className="border border-success rounded p-3 mb-3">
            <Col md={4}>
              <p className="m-0 grid-text text-center">Permanent Address</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">-</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">
                {bioData && bioData.length > 0 && bioData[0].permanentAddress
                  ? bioData[0].permanentAddress
                  : "-"}
              </p>
            </Col>
          </Row>

          <Row className="border border-success rounded p-3 mb-3">
            <Col md={4}>
              <p className="m-0 grid-text text-center">Card Type</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">-</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">
                {bioData && bioData.length > 0 && bioData[0].cardType
                  ? bioData[0].cardType
                  : "-"}
              </p>
            </Col>
          </Row>

          <Row className="border border-success rounded p-3 mb-3">
            <Col md={4}>
              <p className="m-0 grid-text text-center">Nadra Response</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">-</p>
            </Col>
            <Col md={4}>
              <p className="m-0 grid-text text-center">
                {bioData && bioData.length > 0 && bioData[0].responseMessage
                  ? bioData[0].responseMessage
                  : "-"}
              </p>
            </Col>
          </Row>
        </Loader>
      </div>
    </div>
  )
}

export default BioDetails
