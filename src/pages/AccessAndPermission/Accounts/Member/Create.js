import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Row, Col, Modal, Alert } from "reactstrap"

import { useForm, Controller } from "react-hook-form"

import Select from "react-select"

import Loader from "components/SyncLoader"

import { getAllBranches, verifyProfileUser } from "services/common.service"

import { getRoles } from "services/role.service"

import { createUser } from "services/user.service"

// TODO: Add validation for all fields * mark

const Create = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [branches, setBranches] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    const userRoles = data.role
      .toString()
      .split(",")
      .map(v => v.trim())
      .map(r => ({ code: r }))

    var payload = {
      idx: data.idx,
      userName: data.userName,
      mobileNo: data.mobileNo,
      email: data.email,
      branches: [
        {
          code: data.branch,
        },
      ],
      roles: userRoles,
      devices: [
        {
          code: data.device,
          model: data.model,
        },
      ],
      meCode: data?.meCode === "" ? null : data.meCode,
      profileUser: data.profileUser,
    }

    setIsLoading(true)

    await createUser(payload)
      .then(res => {
        if (res?.status === 200) {
          setIsLoading(false)
          setSuccessMessage("User created successfully.")
          reset()
          setTimeout(() => {
            setSuccessMessage(null)
            props.toggel()
          }, 3000)
        } else if (res?.status === 500) {
          setIsLoading(false)
          setErrorMessage("User creation failed.")
        } else {
          setIsLoading(false)
          setErrorMessage(res.data?.message)
        }
      })
      .catch(err => console.log(err))
  }

  const verifyUser = async () => {
    setErrorMessage(null)
    var value = watch("profileUser")

    if (value === "") {
      setError("profileUser", "required", "System user code is required")
    } else {
      const profileResponse = await verifyProfileUser(value)
      if (profileResponse !== undefined) {
        setValue("userName", profileResponse.mkexName)
        setValue("branch", profileResponse.mkexMEBranch)
        setValue("meCode", profileResponse.code)
      } else {
        setErrorMessage("System user code is not valid!")
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
    }
  }

  useEffect(() => {
    var _isMounted = true

    const fetchData = async () => {
      const roleResponse = await getRoles()
      const branchResponse = await getAllBranches()
      if (_isMounted) {
        setRoles(roleResponse)
        setBranches(branchResponse)
      }
    }

    fetchData()

    return () => {
      _isMounted = false
    }
  }, [])

  const showRole = __role => {
    switch (__role) {
      case "ADMIN":
        return "Administrator"
      case "BHO":
        return "Branch Head Officer"
      case "CRO":
        return "Customer Relationship Officer"
      case "CO":
        return "Credit Officer"
      case "BM":
        return "Branch Manager"
      case "CC":
        return "Call Center Verification"
      case "IMD":
        return "Islamic Microfinance Division"
      case "CR":
        return "Credit Reviewer"
      case "CA":
        return "Credit Approver"
      case "CAD":
        return "Credit Administrative Division"
      case "AM":
        return "Area Manager"
      case "RBH":
        return "Regional Business Head"
      case "COO":
        return "Chief Operating Officer"
      case "CEO":
        return "Chief Executive Officer"
      case "COP":
        return "Credit Operations"
      default:
        return __role
    }
  }

  const options = roles?.map((item, index) => {
    return { key: index, label: showRole(item.code), value: item.code }
  })

  return (
    <Row>
      <Modal size="lg" isOpen={props.isOpen}>
        <div className="modal-header">
          <h5 className="modal-title mt-0">Create System User</h5>
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
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-idx">
                      User IDX (AD Login ID){" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="user-idx"
                      placeholder="Enter User IDX"
                      {...register("idx", { required: true })}
                    />
                    {errors.idx && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-profile">
                      Profile Username (SYUS ID)
                    </label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Profile Username"
                        {...register("profileUser", { required: false })}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-success"
                          type="button"
                          onClick={() => verifyUser()}
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                    {errors.profileUser && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-name">CRO Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cro-code"
                      placeholder="Enter CRO Code"
                      {...register("meCode", { required: false })}
                    />
                    {errors.userName && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-name">
                      User Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="user-name"
                      placeholder="Enter User Name"
                      {...register("userName", { required: true })}
                    />
                    {errors.userName && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-email">
                      Email<span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="user-email"
                      placeholder="Enter User Email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-role">
                      Role<span className="text-danger">*</span>
                    </label>
                    <Controller
                      control={control}
                      defaultValue={options}
                      name="role"
                      render={({ field: { onChange, value, ref, onBlur } }) => (
                        <Select
                          inputRef={ref}
                          onBlur={onBlur}
                          // value={options.filter(c => value.includes(c.value))}
                          onChange={val => onChange(val.map(c => c.value))}
                          options={options}
                          defaultValue={options && options[6]}
                          isMulti
                        />
                      )}
                      rules={{ required: true }}
                    />
                    {errors.role && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-branch">
                      Branch<span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
                      id="user-branch"
                      {...register("branch", { required: true })}
                    >
                      <option value="">Choose...</option>
                      {branches?.map((item, index) => (
                        <option key={index} value={item.code}>
                          {item.description}
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
                    <label htmlFor="user-contact">
                      Contact<span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="user-contact"
                      placeholder="Enter User Contact"
                      {...register("mobileNo", {
                        required: true,
                        pattern:
                          /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,
                      })}
                    />
                    {errors.mobileNo && (
                      <span className="text-danger">
                        Enter a valid contact number
                      </span>
                    )}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-device">Device</label>
                    <input
                      type="text"
                      className="form-control"
                      id="user-device"
                      placeholder="Enter Device ID"
                      {...register("device", { required: false })}
                    />
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-device-model">Model</label>
                    <input
                      type="text"
                      className="form-control"
                      id="user-device-model"
                      placeholder="Enter Device Model"
                      {...register("model", { required: false })}
                    />
                  </div>
                </Col>
              </Row>

              <div className="mt-3 d-flex flex-row-reverse">
                <button type="submit" className="btn btn-primary w-md">
                  <Loader loading={isLoading}>
                    <i className="bx bx-save font-size-16 me-2"></i>
                    Create
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

Create.propTypes = {
  isOpen: PropTypes.bool,
  toggel: PropTypes.func,
}

export default Create
