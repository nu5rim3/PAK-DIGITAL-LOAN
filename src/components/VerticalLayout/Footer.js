import React from "react"
import { Container, Row, Col } from "reactstrap"
import pkg from "../../../package.json"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={4}>
              {new Date().getFullYear()} © LOLC Technology Services Ltd.
            </Col>
            <Col md={4} className="text-center">
              version {pkg.version}
            </Col>
            <Col md={4}>
              <div className="text-sm-end d-none d-sm-block">
                Design & Develop by Mobile Solutions
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
