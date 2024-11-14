import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Alert, Modal } from "reactstrap"

import { useForm } from "react-hook-form"
import Loader from "components/SyncLoader"

// APIs
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
    var payload = {
      empNo: data.empNo,
      empCnic: data.empCnic,
      empName: data.empName,
      empDisplayName: data.empDisplayName,
      empContactNo: data.empContactNo,
      empEmail: data.empEmail,
      status: data.status,
    }

    setIsLoading(true)

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
          setErrorMessage("Employee Update failed.")
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

  const getStatusValue = value => {
    if (value === "ACTIVE") {
      return "A"
    } else {
      return "I"
    }
  }

  useEffect(() => {
    var _isMounted = true

    const fetchData = async () => {
      if (props.data !== null && props.data !== undefined) {
        setValue("empNo", props.data.empNo)
        setValue("empCnic", props.data.empCnic)
        setValue("empName", props.data.empName)
        setValue("empDisplayName", props.data.empDisplayName)
        setValue("empContactNo", props.data.empContactNo)
        setValue("empEmail", props.data.empEmail)
      }
    }

    fetchData()

    return () => {
      _isMounted = false
    }
  }, [props.data])

  return (
    <Row>
      <Modal size="md" isOpen={props.isOpen}>
        <div className="modal-header">
          <h5 className="modal-title mt-0">Activate Employee</h5>
          <button
            onClick={() => {
              props.toggel()
            }}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <Row>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Col md={12}>
                {successMessage && (
                  <Alert color="success">{successMessage}</Alert>
                )}
              </Col>
              <Col md={12}>
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
              </Col>
              <Row>
                <Col md={12}>
                  <div className="form-group row">
                    <label htmlFor="status" className="col-form-label">
                      Status <span className="text-danger">*</span>{" "}
                    </label>
                    <div className="col-md-12">
                      <select
                        className="form-control"
                        id="valueStatus"
                        placeholder="Select status"
                        {...register("status", { required: false })}
                      >
                        <option value="A">Activate</option>
                        <option value="I">Deactivate</option>
                      </select>
                    </div>
                    {errors.valueStatus && (
                      <span className="error">This field is required</span>
                    )}
                  </div>
                </Col>
              </Row>
              <div className="mt-3 d-flex flex-row-reverse">
                <button type="submit" className="btn btn-success w-md">
                  <Loader loading={isLoading}>
                    <i className="bx bx-save font-size-16 me-2"></i>
                    Save
                  </Loader>
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
  data: PropTypes.object,
  onSuccessfulUpdate: PropTypes.func,
}

export default ActivateEmployee
