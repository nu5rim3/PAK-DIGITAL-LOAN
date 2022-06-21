import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Col, Row } from "reactstrap"
import Loader from "../Loader"

import "./ReportLayout.css"

//API
import { getVerificationDetails } from "services/on_board.service"

//Fetch PEP Data from PEP NIC
const PepNICDetails = () => {
  const { id } = useParams()

  const [pepNICData, setPepNICData] = useState([])
  const [loading, setLoading] = useState(true)
  var _pepNic = []

  useEffect(() => {
    let _isMounted = true
    setLoading(true)
    const fetchPepNICData = async () => {
      const pepDataResponse = await getVerificationDetails(id)

      if (_isMounted) {
        setPepNICData(pepDataResponse?.msasDetailsDto)

        setLoading(false)

        _pepNic = JSON.parse(pepDataResponse?.msasDetailsDto.objPepNic)
      }
    }

    fetchPepNICData()

    return () => {
      _isMounted = false
    }
  }, [])

  return (
    <React.Fragment>
      <div className="p-3">
        <Loader loading={loading}>
          <Row>
            <div className="text-muted d-flex">
              <Col md={12}>
                <table className="table mb-4">
                  <thead>
                    <tr>
                      <th className="th-wrapper">Date Of Birth</th>
                      <th className="th-wrapper">Occuptation</th>
                      <th className="th-wrapper">Address</th>
                      <th className="th-wrapper">Country</th>
                      <th className="th-wrapper">CNIC</th>
                      <th className="th-wrapper">Place of Birth</th>
                      <th className="th-wrapper">Father Name/Husband Name</th>
                      <th className="th-wrapper">Entity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pepNICData?.objPepNic != null &&
                      _pepNic.data?.map((pepNicObj, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {pepNicObj.dateofbirth
                                ? pepNicObj.dateofbirth
                                : "-"}
                            </td>
                            <td>
                              {pepNicObj.occuptation
                                ? pepNicObj.occuptation
                                : "-"}
                            </td>
                            <td>
                              {pepNicObj.address ? pepNicObj.address : "-"}
                            </td>
                            <td>
                              {pepNicObj.country ? pepNicObj.country : "-"}
                            </td>
                            <td>
                              {pepNicObj.nicnumber ? pepNicObj.nicnumber : "-"}
                            </td>
                            <td>
                              {pepNicObj.placeofbirth
                                ? pepNicObj.placeofbirth
                                : "-"}
                            </td>
                            <td>{pepNicObj.father ? pepNicObj.father : "-"}</td>
                            <td>{pepNicObj.entity ? pepNicObj.entity : "-"}</td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </Col>
            </div>
          </Row>
        </Loader>
      </div>
    </React.Fragment>
  )
}

export default PepNICDetails
