import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Col, Row } from "reactstrap"
import Loader from "../Loader"

// APIs
import { getVerificationDetails } from "services/on_board.service"

export const SancNICDetails = () => {
  const { id } = useParams()
  const [msasNic, setMsasNic] = useState([])
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
        let sancNicObj = JSON.parse(sancDataResponse?.msasDetailsDto?.objSanNic)

        if (Array.isArray(sancNicObj.data.eu) && sancNicObj.data.eu.length) {
          setEU(sancNicObj.data)
        }

        if (
          Array.isArray(sancNicObj.data.nabpk) &&
          sancNicObj.data.nabpk.length
        ) {
          setNABPK(true)
        }

        if (
          Array.isArray(sancNicObj.data.wanted_interpol) &&
          sancNicObj.data.wanted_interpol.length
        ) {
          setInterpol(true)
        }

        if (
          Array.isArray(sancNicObj.data.nacta) &&
          sancNicObj.data.nacta.length
        ) {
          setNACTA(true)
        }

        if (
          Array.isArray(sancNicObj.data.dfat) &&
          sancNicObj.data.dfat.length
        ) {
          setDFAT(true)
        }

        if (
          Array.isArray(sancNicObj.data.ukhmt) &&
          sancNicObj.data.ukhmt.length
        ) {
          setUKHMT(true)
        }

        if (
          Array.isArray(sancNicObj.data.ofac) &&
          sancNicObj.data.ofac.length
        ) {
          setOFAC(true)
        }

        if (
          Array.isArray(sancNicObj.data.unsc) &&
          sancNicObj.data.unsc.length
        ) {
          setUNSC(true)
        }

        if (Array.isArray(sancNicObj.data.fia) && sancNicObj.data.fia.length) {
          setFIA(true)
        }

        setMsasNic(sancNicObj.data)
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
          {msasNic?.eu && eu == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasNic?.eu[0].entity}</Col>
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
                        {msasNic?.eu != null &&
                          msasNic?.eu?.map((pepNicObj, index) => {
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

          {msasNic?.nabpk && nabpk == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasNic?.nabpk[0].entity}</Col>
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
                        {msasNic?.nabpk != null &&
                          msasNic?.nabpk?.map((pepNicObj, index) => {
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

          {msasNic?.interpol && interpol == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasNic?.interpol[0].entity}</Col>
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
                        {msasNic?.interpol != null &&
                          msasNic?.interpol?.map((pepNicObj, index) => {
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

          {msasNic?.nacta && nacta == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasNic?.nacta[0].entity}</Col>
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
                        {msasNic?.nacta != null &&
                          msasNic?.nacta?.map((pepNicObj, index) => {
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

          {msasNic?.dfat && dfat == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasNic?.dfat[0].entity}</Col>
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
                        {msasNic?.dfat != null &&
                          msasNic?.dfat?.map((pepNicObj, index) => {
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

          {msasNic?.ukhmt && ukhmt == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasNic?.ukhmt[0].entity}</Col>
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
                        {msasNic?.ukhmt != null &&
                          msasNic?.ukhmt?.map((pepNicObj, index) => {
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

          {msasNic?.ofac && ofac == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasNic?.ofac[0].entity}</Col>
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
                        {msasNic?.ofac != null &&
                          msasNic?.ofac?.map((pepNicObj, index) => {
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

          {msasNic?.unsc && unsc == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasNic?.unsc[0].entity}</Col>
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
                        {msasNic?.unsc != null &&
                          msasNic?.unsc?.map((pepNicObj, index) => {
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

          {msasNic?.fia && fia == true && (
            <div className="p-3">
              <Row className="border border-success rounded p-3 mb-3">
                <Col md={6}>
                  <p className="m-0 grid-text">Entity Name</p>
                </Col>

                <Col md={4}>{msasNic?.fia[0].entity}</Col>
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
                        {msasNic?.fia != null &&
                          msasNic?.fia?.map((pepNicObj, index) => {
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
        </Loader>
      </div>
    </React.Fragment>
  )
}

export default SancNICDetails
