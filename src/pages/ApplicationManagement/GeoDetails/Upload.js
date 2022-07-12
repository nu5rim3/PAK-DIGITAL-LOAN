import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  Row,
  Button,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
import Dropzone from "react-dropzone"

import { Link } from "react-router-dom"

import SyncLoader from "components/SyncLoader"

// service
import { uploadGeoImage } from "services/geo_details.service"

const FormUpload = props => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [warning, setWarning] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [longtitude, setLongtitude] = useState(null)
  const [mapMessage, setMapMessage] = useState(null)
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)
  const [btn, setBtn] = useState(false)

  const onSubmit = () => {
    getCoordinates()

    if (visible === false) {
      if (selectedFiles.length < 2) {
        setWarning("Minimum two images are required!")
        return
      }

      setLoading(true)
      setWarning(true)

      selectedFiles?.forEach(async (file, index) => {
        const image = await toBase64(file)
        const base64Content = image.split(",")
        var payload = {
          appraisalIdx: props.appraisalId,
          imgMasterCategory: `GEO_DETAILS_${getUserRole()}`,
          imgSubCategory: `GEO_SUB_${getUserRole()}_${index}`,
          imgOriginalName: file.path,
          imgContentType: file.type,
          longitude: longtitude,
          latitude: latitude,
          image: base64Content[1],
        }

        var response = await uploadGeoImage(payload)

        if (response != undefined) {
          if (selectedFiles?.length - 1 === index) {
            setLoading(false)
            setMessage(response?.message)
            setSelectedFiles([])

            setTimeout(() => {
              window.location.reload()
            }, 1000)
          }
        }
      })
    }
  }

  const handleAcceptedFiles = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setSelectedFiles(files)
  }

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })

  const getUserRole = () => {
    return localStorage.getItem("role")
  }

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  const getCoordinates = () => {
    //set counter to disable the button
    setCount(count + 1)
    if (count === 5) {
      setBtn(true)
    }

    //Requset location
    if (!navigator.geolocation) {
      setMapMessage("Geolocation is not supported by your browser")
    } else {
      setMapMessage("Locating...")
      navigator.geolocation.getCurrentPosition(
        position => {
          setMapMessage(null)
          setLatitude(position.coords.latitude)
          setLongtitude(position.coords.longitude)
        },
        () => {
          setMapMessage(
            "Unable to retrieve your location. Please enable your location to continue."
          )
          setVisible(!visible)
        }
      )
    }

    return visible
  }

  const handleClose = () => {
    setVisible(false)
  }

  return (
    <Row>
      <Col className="col-12">
        <Card>
          <CardBody>
            <CardTitle className="h4">GEO Location Images</CardTitle>
            <p className="card-title-desc">
              {" "}
              Upload the GEO location images (Two images required!).
            </p>
            <p className="mt-1">
              {message && <Alert color="success">{message}</Alert>}
              {warning && <Alert color="danger">{warning}</Alert>}
            </p>
            <Form>
              <Dropzone
                onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles)}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone">
                    <div className="dz-message needsclick" {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="mb-3">
                        <i className="display-4 text-muted bx bxs-cloud-upload" />
                      </div>
                      <h4>Drop files here or click to upload.</h4>
                    </div>
                  </div>
                )}
              </Dropzone>
              <div className="dropzone-previews mt-3" id="file-previews">
                {selectedFiles?.map((f, i) => {
                  return (
                    <Card
                      className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                      key={i + "-file"}
                    >
                      <div className="p-2">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <img
                              data-dz-thumbnail=""
                              height="80"
                              className="avatar-sm rounded bg-light"
                              alt={f.name}
                              src={f.preview}
                            />
                          </Col>
                          <Col>
                            <Link
                              to="#"
                              className="text-muted font-weight-bold"
                            >
                              {f.name}
                            </Link>
                            <p className="mb-0">
                              <strong>{f.formattedSize}</strong>
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </Form>

            <div className="text-center mt-4">
              <div className="d-flex justify-content-between">
                <p className="card-title-desc"></p>
                <SyncLoader loading={loading}>
                  <Button size="md" color="info" onClick={onSubmit}>
                    <i className="fa fa-upload me-2"></i>Upload
                  </Button>
                </SyncLoader>
              </div>
            </div>
          </CardBody>
        </Card>

        <Modal isOpen={visible} backdrop="static" keyboard={false}>
          <ModalHeader>
            <h4 color="danger">Enable Location!</h4>
          </ModalHeader>
          <ModalBody>
            <p>
              Unable to retrieve your location. Please enable your location to
              continue.
            </p>
            <p>
              Settings -{">"} Privacy {"&"} Security -{">"} Site Settings -{">"}{" "}
              Permissions -{">"}Location
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </Col>
    </Row>
  )
}

FormUpload.propTypes = {
  appraisalId: PropTypes.string,
}

export default FormUpload
