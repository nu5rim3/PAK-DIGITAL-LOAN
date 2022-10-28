import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Col, Row } from "reactstrap"
import Loader from "../Loader"

// API
import { getVerificationDetails } from "services/on_board.service"

//Fetch Sanction Data from Sanction Name
export const SancNameDetails = () => {
  const { id } = useParams()
  const [msasName, setMsasName] = useState([])
  const [eu, setEU] = useState([false])
  const [nabpk, setNABPK] = useState([false])
  const [interpol, setInterpol] = useState([false])
  const [nacta, setNACTA] = useState([false])
  const [dfat, setDFAT] = useState([false])
  const [ukhmt, setUKHMT] = useState([false])
  const [ofac, setOFAC] = useState([false])
  const [unsc, setUNSC] = useState([false])
  const [fia, setFIA] = useState([false])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let _isMounted = true

    setLoading(true)
    const fetchSancNICData = async () => {
      const sancDataResponse = await getVerificationDetails(id)

      if (_isMounted) {
        let sancNameObj = JSON.parse(
          sancDataResponse?.msasDetailsDto?.objSanName
        )

        if (Array.isArray(sancNameObj.data.eu) && sancNameObj.data.eu.length) {
          setEU(sancNameObj.data)
        }

        if (
          Array.isArray(sancNameObj.data.nabpk) &&
          sancNameObj.data.nabpk.length
        ) {
          setNABPK(true)
        }

        if (
          Array.isArray(sancNameObj.data.wanted_interpol) &&
          sancNameObj.data.wanted_interpol.length
        ) {
          setInterpol(true)
        }

        if (
          Array.isArray(sancNameObj.data.nacta) &&
          sancNameObj.data.nacta.length
        ) {
          setNACTA(true)
        }

        if (
          Array.isArray(sancNameObj.data.dfat) &&
          sancNameObj.data.dfat.length
        ) {
          setDFAT(true)
        }

        if (
          Array.isArray(sancNameObj.data.ukhmt) &&
          sancNameObj.data.ukhmt.length
        ) {
          setUKHMT(true)
        }

        if (
          Array.isArray(sancNameObj.data.ofac) &&
          sancNameObj.data.ofac.length
        ) {
          setOFAC(true)
        }

        if (
          Array.isArray(sancNameObj.data.unsc) &&
          sancNameObj.data.unsc.length
        ) {
          setUNSC(true)
        }

        if (
          Array.isArray(sancNameObj.data.fia) &&
          sancNameObj.data.fia.length
        ) {
          setFIA(true)
        }

        setMsasName(sancNameObj.data)
        setLoading(false)
      }
    }
    fetchSancNICData()

    return () => {
      _isMounted = false
    }
  }, [])

  return (
    <React.Fragment>
      <div className="p-3">
        <Loader loading={loading}>
          {msasName?.eu && eu == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasName?.eu[0].entity}</Col>
              </Row>

              <Row>
                <div className="text-muted d-flex">
                  <Col md={12}>
                    <table className="table mb-4">
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>CNIC</th>
                          <th>Father Name</th>
                          <th>Country</th>
                          <th>Address</th>
                          <th>Birth Place</th>
                          <th>Date of Birth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {msasName?.eu != null &&
                          msasName?.eu?.map((pepNameObj, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {pepNameObj.fullname
                                    ? pepNameObj.fullname
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.ninumber
                                    ? pepNameObj.ninumber
                                    : "-"}
                                </td>

                                <td>
                                  {pepNameObj.father ? pepNameObj.father : "-"}
                                </td>
                                <td>
                                  {pepNameObj.country
                                    ? pepNameObj.country
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.entity_address
                                    ? pepNameObj.entity_address
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.placeofbirth
                                    ? pepNameObj.placeofbirth
                                    : "-"}
                                </td>
                                <td>{pepNameObj.dob ? pepNameObj.dob : "-"}</td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </Col>
                </div>
              </Row>
            </div>
          )}

          {msasName?.nabpk && nabpk == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasName?.nabpk[0].entity}</Col>
              </Row>
              <Row>
                <div className="text-muted d-flex">
                  <Col md={12}>
                    <table className="table mb-4">
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>CNIC</th>
                          <th>Father Name</th>
                          <th>Country</th>
                          <th>Address</th>
                          <th>Birth Place</th>
                          <th>Date of Birth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {msasName?.nabpk != null &&
                          msasName?.nabpk?.map((pepNicObj, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {pepNicObj.fullname
                                    ? pepNicObj.fullname
                                    : "-"}
                                </td>
                                <td>
                                  {pepNicObj.ninumber
                                    ? pepNicObj.ninumber
                                    : "-"}
                                </td>

                                <td>
                                  {pepNicObj.father ? pepNicObj.father : "-"}
                                </td>
                                <td>
                                  {pepNicObj.country ? pepNicObj.country : "-"}
                                </td>
                                <td>
                                  {pepNicObj.entity_address
                                    ? pepNicObj.entity_address
                                    : "-"}
                                </td>
                                <td>
                                  {pepNicObj.placeofbirth
                                    ? pepNicObj.placeofbirth
                                    : "-"}
                                </td>
                                <td>{pepNicObj.dob ? pepNicObj.dob : "-"}</td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </Col>
                </div>
              </Row>
            </div>
          )}

          {msasName?.interpol && interpol == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasName?.interpol[0].entity}</Col>
              </Row>
              <Row>
                <div className="text-muted d-flex">
                  <Col md={12}>
                    <table className="table mb-4">
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>CNIC</th>
                          <th>Father Name</th>
                          <th>Country</th>
                          <th>Address</th>
                          <th>Birth Place</th>
                          <th>Date of Birth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {msasName?.interpol != null &&
                          msasName?.interpol?.map((pepNameObj, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {pepNameObj.fullname
                                    ? pepNameObj.fullname
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.ninumber
                                    ? pepNameObj.ninumber
                                    : "-"}
                                </td>

                                <td>
                                  {pepNameObj.father ? pepNameObj.father : "-"}
                                </td>
                                <td>
                                  {pepNameObj.country
                                    ? pepNameObj.country
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.entity_address
                                    ? pepNameObj.entity_address
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.placeofbirth
                                    ? pepNameObj.placeofbirth
                                    : "-"}
                                </td>
                                <td>{pepNameObj.dob ? pepNameObj.dob : "-"}</td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </Col>
                </div>
              </Row>
            </div>
          )}

          {msasName?.nacta && nacta == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasName?.nacta[0].entity}</Col>
              </Row>

              <Row>
                <div className="text-muted d-flex">
                  <Col md={12}>
                    <table className="table mb-4">
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>CNIC</th>
                          <th>Father Name</th>
                          <th>Country</th>
                          <th>Address</th>
                          <th>Birth Place</th>
                          <th>Date of Birth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {msasName?.nacta != null &&
                          msasName?.nacta?.map((pepNameObj, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {pepNameObj.fullname
                                    ? pepNameObj.fullname
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.ninumber
                                    ? pepNameObj.ninumber
                                    : "-"}
                                </td>

                                <td>
                                  {pepNameObj.father ? pepNameObj.father : "-"}
                                </td>
                                <td>
                                  {pepNameObj.country
                                    ? pepNameObj.country
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.entity_address
                                    ? pepNameObj.entity_address
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.placeofbirth
                                    ? pepNameObj.placeofbirth
                                    : "-"}
                                </td>
                                <td>{pepNameObj.dob ? pepNameObj.dob : "-"}</td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </Col>
                </div>
              </Row>
            </div>
          )}

          {msasName?.dfat && dfat == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasName?.dfat[0].entity}</Col>
              </Row>
              <Row>
                <div className="text-muted d-flex">
                  <Col md={12}>
                    <table className="table mb-4">
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>CNIC</th>
                          <th>Father Name</th>
                          <th>Country</th>
                          <th>Address</th>
                          <th>Birth Place</th>
                          <th>Date of Birth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {msasName?.dfat != null &&
                          msasName?.dfat?.map((pepNameObj, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {pepNameObj.fullname
                                    ? pepNameObj.fullname
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.ninumber
                                    ? pepNameObj.ninumber
                                    : "-"}
                                </td>

                                <td>
                                  {pepNameObj.father ? pepNameObj.father : "-"}
                                </td>
                                <td>
                                  {pepNameObj.country
                                    ? pepNameObj.country
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.entity_address
                                    ? pepNameObj.entity_address
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.placeofbirth
                                    ? pepNameObj.placeofbirth
                                    : "-"}
                                </td>
                                <td>{pepNameObj.dob ? pepNameObj.dob : "-"}</td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </Col>
                </div>
              </Row>
            </div>
          )}

          {msasName?.ukhmt && ukhmt == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasName?.ukhmt[0].entity}</Col>
              </Row>
              <Row>
                <div className="text-muted d-flex">
                  <Col md={12}>
                    <table className="table mb-4">
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>CNIC</th>
                          <th>Father Name</th>
                          <th>Country</th>
                          <th>Address</th>
                          <th>Birth Place</th>
                          <th>Date of Birth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {msasName?.ukhmt != null &&
                          msasName?.ukhmt?.map((pepNameObj, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {pepNameObj.fullname
                                    ? pepNameObj.fullname
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.ninumber
                                    ? pepNameObj.ninumber
                                    : "-"}
                                </td>

                                <td>
                                  {pepNameObj.father ? pepNameObj.father : "-"}
                                </td>
                                <td>
                                  {pepNameObj.country
                                    ? pepNameObj.country
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.entity_address
                                    ? pepNameObj.entity_address
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.placeofbirth
                                    ? pepNameObj.placeofbirth
                                    : "-"}
                                </td>
                                <td>{pepNameObj.dob ? pepNameObj.dob : "-"}</td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </Col>
                </div>
              </Row>
            </div>
          )}

          {msasName?.ofac && ofac == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasName?.ofac[0].entity}</Col>
              </Row>
              <Row>
                <div className="text-muted d-flex">
                  <Col md={12}>
                    <table className="table mb-4">
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>CNIC</th>
                          <th>Father Name</th>
                          <th>Country</th>
                          <th>Address</th>
                          <th>Birth Place</th>
                          <th>Date of Birth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {msasName?.ofac != null &&
                          msasName?.ofac?.map((pepNameObj, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {pepNameObj.fullname
                                    ? pepNameObj.fullname
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.ninumber
                                    ? pepNameObj.ninumber
                                    : "-"}
                                </td>

                                <td>
                                  {pepNameObj.father ? pepNameObj.father : "-"}
                                </td>
                                <td>
                                  {pepNameObj.country
                                    ? pepNameObj.country
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.entity_address
                                    ? pepNameObj.entity_address
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.placeofbirth
                                    ? pepNameObj.placeofbirth
                                    : "-"}
                                </td>
                                <td>{pepNameObj.dob ? pepNameObj.dob : "-"}</td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </Col>
                </div>
              </Row>
            </div>
          )}

          {msasName?.unsc && unsc == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasName?.unsc[0].entity}</Col>
              </Row>
              <Row>
                <div className="text-muted d-flex">
                  <Col md={12}>
                    <table className="table mb-4">
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>CNIC</th>
                          <th>Father Name</th>
                          <th>Country</th>
                          <th>Address</th>
                          <th>Birth Place</th>
                          <th>Date of Birth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {msasName?.unsc != null &&
                          msasName?.unsc?.map((pepNameObj, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {pepNameObj.fullname
                                    ? pepNameObj.fullname
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.ninumber
                                    ? pepNameObj.ninumber
                                    : "-"}
                                </td>

                                <td>
                                  {pepNameObj.father ? pepNameObj.father : "-"}
                                </td>
                                <td>
                                  {pepNameObj.country
                                    ? pepNameObj.country
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.entity_address
                                    ? pepNameObj.entity_address
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.placeofbirth
                                    ? pepNameObj.placeofbirth
                                    : "-"}
                                </td>
                                <td>{pepNameObj.dob ? pepNameObj.dob : "-"}</td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </Col>
                </div>
              </Row>
            </div>
          )}

          {msasName?.fia && fia == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasName?.fia[0].entity}</Col>
              </Row>
              <Row>
                <div className="text-muted d-flex">
                  <Col md={12}>
                    <table className="table mb-4">
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>CNIC</th>
                          <th>Father Name</th>
                          <th>Country</th>
                          <th>Address</th>
                          <th>Birth Place</th>
                          <th>Date of Birth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {msasName?.fia != null &&
                          msasName?.fia?.map((pepNameObj, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {pepNameObj.fullname
                                    ? pepNameObj.fullname
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.ninumber
                                    ? pepNameObj.ninumber
                                    : "-"}
                                </td>

                                <td>
                                  {pepNameObj.father ? pepNameObj.father : "-"}
                                </td>
                                <td>
                                  {pepNameObj.country
                                    ? pepNameObj.country
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.entity_address
                                    ? pepNameObj.entity_address
                                    : "-"}
                                </td>
                                <td>
                                  {pepNameObj.placeofbirth
                                    ? pepNameObj.placeofbirth
                                    : "-"}
                                </td>
                                <td>{pepNameObj.dob ? pepNameObj.dob : "-"}</td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </Col>
                </div>
              </Row>
            </div>
          )}
        </Loader>
      </div>
    </React.Fragment>
  )
}

export default SancNameDetails
