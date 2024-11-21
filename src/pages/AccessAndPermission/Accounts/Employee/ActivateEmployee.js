import PropTypes from "prop-types"
import React, { useState } from "react"
import { Row, Col, Alert, Modal, ModalBody, ModalHeader } from "reactstrap"

import { useForm } from "react-hook-form"
import Loader from "components/SyncLoader"

//APIs
import { updateEmployee } from "services/employee.service"

const ActivateEmployee = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    setIsLoading(true)

    if (props.data !== undefined && props.data !== null) {
      var payload = {
        empNo: props.data.empNo,
        empCnic: props.data.empCnic,
        empName: props.data.empName,
        empDisplayName: props.data.empDisplayName,
        empContactNo: props.data.empContactNo,
        empEmail: props.data.empEmail,
        status: "A",
      }

      await updateEmployee(props.data.empNo, payload)
        .then(res => {
          if (res?.status === 200) {
            setIsLoading(false)
            setSuccessMessage("Employee Activated Successfully.")
            reset()
            setTimeout(() => {
              setSuccessMessage(null)
              props.toggel()
              window.location.reload(true)
            }, 2000)
          } else if (res?.status === 500) {
            setIsLoading(false)
            setErrorMessage("Employee Activated Failed.")
            setTimeout(() => {
              setErrorMessage(null)
              props.toggel()
              window.location.reload(true)
            }, 2000)
          } else {
            setIsLoading(false)
            setErrorMessage(res.data?.message)
            setTimeout(() => {
              setErrorMessage(null)
              props.toggel()
              window.location.reload(true)
            }, 2000)
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <Row>
      <Modal size="md" isOpen={props.isOpen}>
        <div className="modal-body">
          <Row>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Col md={12}>
                {successMessage && (
                  <Alert color="success">{successMessage}</Alert>
                )}
              </Col>
              <Col md={12}>
                {errorMessage && <Alert color="success">{errorMessage}</Alert>}
              </Col>
              <ModalBody
                style={{
                  fontSize: "medium",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                Are You Sure You Want To Activate?
              </ModalBody>

              <div className="mt-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-success w-md m-1">
                  Activate
                </button>
                <button
                  type="submit"
                  className="btn btn-primary w-md m-1"
                  onClick={() => {
                    props.toggel()
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Row>
        </div>
      </Modal>
    </Row>
  )
}

ActivateEmployee.propTypes = {
  isOpen: PropTypes.bool,
  toggel: PropTypes.func,
  onSuccessfulDeactivate: PropTypes.func,
  data: PropTypes.object,
}

export default ActivateEmployee
