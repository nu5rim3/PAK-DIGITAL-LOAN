import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  Alert,
} from "reactstrap"

import { useForm } from "react-hook-form"

import Loader from "components/SyncLoader"

import {
  getAllApprovalGroups,
  updateApprovalUser,
} from "services/approval.service"

const Update = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [groups, setGroups] = useState([])
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    var payload = {
      group: {
        code: data.group,
      },
      userIdx: data.userIdx.trim(),
      status: data.status,
    }

    setIsLoading(true)

    await updateApprovalUser(payload.userIdx, payload)
      .then(res => {
        setIsLoading(false)
        setSuccess("User has been updated successfully.")

        setTimeout(() => {
          setSuccess(null)
          props.toggel()
        }, 3000)
      })
      .catch(err => {
        setIsLoading(false)
        if (err.response.status) {
          setError(err.response.data.message)
        }

        setTimeout(() => {
          setError(null)
        }, 3000)
      })
  }

  const getStatusValue = value => {
    if (value === "Active") {
      return "A"
    } else {
      return "I"
    }
  }

  useEffect(() => {
    var _isMounted = true

    const fetchData = async () => {
      const groupsResponse = await getAllApprovalGroups()
      if (_isMounted && groupsResponse !== undefined) {
        setGroups(groupsResponse)

        if (props.data !== null && props.data !== undefined) {
          setValue("userIdx", props.data.groupUserIdx)
          setValue("group", props.data.groupCode)
          setValue("status", getStatusValue(props.data.status))
        }
      }
    }

    fetchData()

    return () => {
      _isMounted = false
    }
  }, [props.data])

  return (
    <Row>
      <Modal size="lg" isOpen={props.isOpen}>
        <div className="modal-header">
          <h5 className="modal-title mt-0">Update Approval Group Users</h5>
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
              <Row>
                <Col md={12}>
                  {success && <Alert color="success">{success}</Alert>}
                </Col>
                <Col md={12}>
                  {error && <Alert color="danger">{error}</Alert>}
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-profile">
                      User IDX<span className="text-danger">*</span>
                    </label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter User IDX"
                        disabled
                        {...register("userIdx", { required: true })}
                      />
                    </div>
                    {errors.userIdx && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="approval-group">
                      Group<span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
                      id="approval-group"
                      {...register("group", { required: true })}
                    >
                      {groups.map((item, index) => (
                        <option key={index} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.branch && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="approval-user-status">
                      Status<span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
                      id="approval-user-status"
                      {...register("status", { required: true })}
                    >
                      <option value="A">Active</option>
                      <option value="I">Inactive</option>
                    </select>
                  </div>
                </Col>
              </Row>

              <div className="mt-3 d-flex flex-row-reverse">
                <button type="submit" className="btn btn-primary w-md">
                  <Loader loading={isLoading}>
                    <i className="bx bx-save font-size-16 me-2"></i>
                    Update
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

Update.propTypes = {
  isOpen: PropTypes.bool,
  toggel: PropTypes.func,
  data: PropTypes.object,
}

export default Update
