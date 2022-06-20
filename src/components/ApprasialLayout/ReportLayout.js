import React from "react"
import { useParams } from "react-router-dom"
import { Col, Row, CardTitle } from "reactstrap"

//local imports
import BioDetails from "../ApprasialLayout/BioData"
import PepNICDetails from "./PepNICData"
import PepNameDetails from "./PepNameData"
import SancNICDetails from "./SancNICData"
import SancNameDetails from "./SancNameData"
import "./ReportLayout.css"

//Form layout
const CombinedReports = () => {
  const { id } = useParams()

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="p-3">
          <Row>
            <div className="table-wrapper text-muted d-flex">
              <Col md={12}>
                <CardTitle className="h4 col-wrapper">
                  Clietele ID : {id}
                </CardTitle>

                <table className="table mb-4">
                  <thead>
                    <tr>
                      <th
                        className="text-center"
                        style={{ fontSize: "medium" }}
                      >
                        NADRA BIOMETRIC DETAILS
                      </th>
                      <th
                        className="text-center"
                        style={{ fontSize: "medium" }}
                      >
                        PEP NIC DETAILS
                      </th>
                      <th
                        className="text-center"
                        style={{ fontSize: "medium" }}
                      >
                        PEP NAME DETAILS
                      </th>
                      <th
                        className="text-center"
                        style={{ fontSize: "medium" }}
                      >
                        SANCTION NIC DETAILS
                      </th>
                      <th
                        className="text-center"
                        style={{ fontSize: "medium" }}
                      >
                        SANCTION NAME DETAILS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="td-wrapper">
                        <BioDetails />
                      </td>
                      <td className="td-wrapper">
                        <PepNICDetails />
                      </td>
                      <td className="td-wrapper">
                        <PepNameDetails />
                      </td>
                      <td className="td-wrapper">
                        <SancNICDetails />
                      </td>
                      <td className="td-wrapper">
                        <SancNameDetails />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </div>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CombinedReports
