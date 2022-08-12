import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Col, Row } from "reactstrap"
import Loader from "../Loader"

//API
import { getVerificationDetails } from "services/on_board.service"

//Fetch PEP Data from PEP Name
const PepNameDetails = () => {
  const { id } = useParams()

  const [pepNameData, setPepNameData] = useState([])
  const [loading, setLoading] = useState(true)
  var _pepName = []

  useEffect(() => {
    let _isMounted = true
    setLoading(true)
    const fetchPepNameData = async () => {
      const pepDataResponse = await getVerificationDetails(id)
      if (_isMounted) {
        setPepNameData(pepDataResponse?.msasDetailsDto)

        setLoading(false)

        console.log(pepDataResponse?.msasDetailsDto.objPepName)
        console.log(typeof pepDataResponse?.msasDetailsDto.objPepName)
        _pepName = JSON.parse(pepDataResponse?.msasDetailsDto.objPepName)
      }
    }

    fetchPepNameData()

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
                    {pepNameData?.objPepName != null &&
                      _pepName.data?.map((pepNameObj, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {pepNameObj.dateofbirth
                                ? pepNameObj.dateofbirth
                                : "-"}
                            </td>
                            <td>
                              {pepNameObj.occuptation
                                ? pepNameObj.occuptation
                                : "-"}
                            </td>
                            <td>
                              {pepNameObj.address ? pepNameObj.address : "-"}
                            </td>
                            <td>
                              {pepNameObj.country ? pepNameObj.country : "-"}
                            </td>
                            <td>
                              {pepNameObj.nicnumber
                                ? pepNameObj.nicnumber
                                : "-"}
                            </td>
                            <td>
                              {pepNameObj.placeofbirth
                                ? pepNameObj.placeofbirth
                                : "-"}
                            </td>
                            <td>
                              {pepNameObj.father ? pepNameObj.father : "-"}
                            </td>
                            <td>
                              {pepNameObj.entity ? pepNameObj.entity : "-"}
                            </td>
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

export default PepNameDetails
