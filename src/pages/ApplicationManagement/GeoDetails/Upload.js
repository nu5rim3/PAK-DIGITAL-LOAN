import React, { Component } from "react"
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  Row,
  Button,
  Alert
} from "reactstrap"
import Dropzone from "react-dropzone"

import { Link } from "react-router-dom"

import SyncLoader from "components/SyncLoader";

// service
import { uploadGeoImage } from "services/geo_details.service";

class FormUpload extends Component {
  constructor(props) {
    super(props)
    this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this)
    this.state = { selectedFiles: [], loading: false, message: null, warning: null }
  }

  onSubmit = () => {

    if (this.state.selectedFiles.length < 2) {
      this.setState({warning: "Minimum two images are required!"})
      return;
    }

    this.setState({loading: true, warning: null});

    this.state.selectedFiles?.forEach(async (file, index) => {
      const image = await this.toBase64(file);
      const base64Content = image.split(",");
      var payload = {
        "appraisalIdx": this.props.appraisalId,
        "imgMasterCategory": `GEO_DETAILS_${this.getUserRole()}`,
        "imgSubCategory": `GEO_SUB_${this.getUserRole()}_${index}`,
        "imgOriginalName": file.path,
        "imgContentType": file.type,
        "longitude": "1.44",
        "latitude": "2.40",
        "image": base64Content[1]
      };

      var response = await uploadGeoImage(payload);

      if (response != undefined) {
        if ((this.state.selectedFiles?.length - 1) === index) {
          this.setState({loading: false, message: response?.message, selectedFiles: []});
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    });
  }

  handleAcceptedFiles = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: this.formatBytes(file.size),
      })
    )

    this.setState({ selectedFiles: files })
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  getUserRole = () => {
    return localStorage.getItem("role");
  }

  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  render() {
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
                {this.state.message && <Alert color="success">{this.state.message}</Alert>}
                {this.state.warning && <Alert color="danger">{this.state.warning}</Alert>}
              </p>
              <Form>
                <Dropzone
                  onDrop={acceptedFiles =>
                    this.handleAcceptedFiles(acceptedFiles)
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <div className="dropzone">
                      <div
                        className="dz-message needsclick"
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <div className="mb-3">
                          <i className="display-4 text-muted bx bxs-cloud-upload" />
                        </div>
                        <h4>Drop files here or click to upload.</h4>
                      </div>
                    </div>
                  )}
                </Dropzone>
                <div
                  className="dropzone-previews mt-3"
                  id="file-previews"
                >
                  {this.state.selectedFiles?.map((f, i) => {
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
                  <SyncLoader loading={this.state.loading}>
                    <Button size="md" color="info" onClick={this.onSubmit}><i className="fa fa-upload me-2"></i>Upload</Button>
                  </SyncLoader>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

FormUpload.propTypes = {
  appraisalId: PropTypes.string
};

export default FormUpload
