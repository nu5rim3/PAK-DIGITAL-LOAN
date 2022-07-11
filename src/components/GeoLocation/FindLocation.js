import React, { useState } from "react"
import { Modal, Button, Card, Row, Container } from "react-bootstrap"

//local imports
import "./FindLocation.css"

const GetLocation = () => {
  const [latitude, setLatitude] = useState(null)
  const [longtitude, setLongtitude] = useState(null)
  const [message, setMessage] = useState(null)
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)
  const [btn, setBtn] = useState(false)

  const getCoordinates = () => {
    //set counter to disable the button
    setCount(count + 1)
    if (count === 5) {
      setBtn(true)
    }

    //Requset location
    if (!navigator.geolocation) {
      setMessage("Geolocation is not supported by your browser")
    } else {
      setMessage("Locating...")
      navigator.geolocation.getCurrentPosition(
        position => {
          setMessage(null)
          setLatitude(position.coords.latitude)
          setLongtitude(position.coords.longitude)
          console.log(position)
        },
        () => {
          setMessage(
            "Unable to retrieve your location. Please enable your location to continue."
          )
          setVisible(!visible)
        }
      )
    }
  }

  const handleClose = () => {
    setVisible(false)
  }

  return (
    <div>
      <Container>
        <Row>
          <Card className="card-wrapper">
            <Modal show={visible} backdrop="static" keyboard={false}>
              <Modal.Header>
                <Modal.Title variant="danger">Enable Location!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Card.Text>
                  Unable to retrieve your location. Please enable your location
                  to continue.
                </Card.Text>
                <p>
                  Settings -{">"} Privacy {"&"} Security -{">"} Site Settings -
                  {">"} Permissions -{">"}Location
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Button
              className="btn"
              variant="primary"
              onClick={getCoordinates}
              disabled={btn}
            >
              Get Location
            </Button>
            <h2>Coordinates</h2>
            <Card className="coord-card">
              <div>
                {message}
                {latitude && <p className="coords">Latitude : {latitude}</p>}
                {longtitude && (
                  <p className="coords">Longitude : {longtitude}</p>
                )}
              </div>
            </Card>
          </Card>
        </Row>
      </Container>
    </div>
  )
}

export default GetLocation
