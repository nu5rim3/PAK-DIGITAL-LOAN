import React, { useEffect, useState, useRef } from "react"
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
import { file } from "helpers/api_helper"

const FormUpload = props => {

  const uploadBtnRef = useRef();
  
  const [selectedFiles, setSelectedFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [warning, setWarning] = useState(null)
  const [mapMessage, setMapMessage] = useState(null)
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)

  const onSubmit = async () => {

    // get coordinates before submit the images.
    if (!navigator.geolocation) {
      setMapMessage("Geolocation is not supported by your browser")
    } else {
      setMapMessage("Locating...")
      navigator.geolocation.getCurrentPosition(
        position => {

          if (position.coords.longitude !== null && position.coords.latitud !== null) {
            
            setMapMessage(null)

            // save the images
            if (selectedFiles.length < 2) {
              setWarning("Minimum two images are required!")

              setTimeout(() => {
                setWarning(false)
              }, 3000);
              return
            }

            setLoading(true)
            setWarning(false)

            // disable button action
            if (uploadBtnRef.current) {
              uploadBtnRef.current.setAttribute("disabled", "disabled");
            }

            selectedFiles?.forEach(async (file, index) => {

              const image = await toBase64(file)
              const base64Content = image.split(",")
              var payload = {
                appraisalIdx: props.appraisalId,
                imgMasterCategory: `GEO_DETAILS_${getUserRole()}`,
                imgSubCategory: `GEO_SUB_${getUserRole()}_${index + 1}`,
                imgOriginalName: `${index}_${file.path}`,
                imgContentType: file.type,
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
                image: base64Content[1],
              }

              var response = await uploadGeoImage(payload)

              if (response != undefined) {
                if (selectedFiles?.length - 1 === index) {
                  setLoading(false)
                  setSelectedFiles([])

                  setMessage("Images uploaded successfully!")

                  setTimeout(() => {
                    window.location.reload()
                  }, 1000)
                }
              }
            });
          }
        },
        () => {
          setMapMessage(
            "Unable to retrieve your location. Please enable your location to continue."
          )
          setVisible(!visible)
        }
      )
    }
  }

  const handleAcceptedFiles = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setSelectedFiles((prevfiles) => prevfiles.concat(files))
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

  const userRoleVerification = () => {
    var role = getUserRole();

    if (role === "CO" || role === "BHO") {
      return true;
    } else return false;
  }

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  const handleClose = () => {
    setVisible(false)
  }

  return (
    <Row>
      <Col className="col-12">
        {userRoleVerification() && <Card>
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
                maxFiles={10}
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
                      <div className="d-flex justify-content-between ">
                        <div className="p-2">
                          <Row className="align-items-center">
                            <Col className="col-auto">
                              <img
                                data-dz-thumbnail=""
                                height="80"
                                className="avatar-sm rounded bg-light" style={{ height: "5rem", width: "5rem"}}
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
                        <div className="text-right">
                          <i
                            onClick={() => {
                              if (i > -1) {
                                var array = [...selectedFiles];
                                var index = array.indexOf(f)
                                if (index !== -1) {
                                  array.splice(index, 1);
                                  setSelectedFiles(array);
                                }
                              }
                            }}
                            className="h4 mt-1 mb-0 text-danger bx bxs-x-circle" />
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </Form>

            <div className="text-center mt-4">
              <div className="d-flex justify-content-between">
                <p className="card-title-desc"></p>

                  <button className="btn btn-info" onClick={onSubmit} ref={uploadBtnRef}>
                    {loading === true && <i className="loader-item fas fa-sync fa-spin text-white"/>}
                    {loading === false && <i className="fa fa-upload me-2"/>}Upload
                  </button>

              </div>
            </div>
          </CardBody>
        </Card>}

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
