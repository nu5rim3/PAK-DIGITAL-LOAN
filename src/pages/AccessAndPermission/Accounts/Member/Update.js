import PropTypes, { string } from "prop-types"
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

import { useForm, Controller } from "react-hook-form"

import Select from "react-select"

import Loader from "components/SyncLoader"

import { getAllBranches, verifyProfileUser } from "services/common.service"

import { getRoles } from "services/role.service"

import { updateUser } from "services/user.service"

const Update = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [branches, setBranches] = useState([])
  const [data, setData] = useState(null)
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
      status: data.status,
    }

    setIsLoading(true)

    await updateUser(props.data.idx, payload)
      .then(res => {
        if (res?.status === 200) {
          setIsLoading(false)
          setSuccessMessage("User Updated Successfully.")
          reset()
          props.onSuccessfulUpdate()
          setTimeout(() => {
            setSuccessMessage(null)
            props.toggel()
          }, 3000)
        } else if (res?.status === 500) {
          setIsLoading(false)
          setErrorMessage("User Update Failed.")
        } else {
          setIsLoading(false)
          setErrorMessage(res.data?.message)
        }
      })
      .catch(err => console.log(err))
  }

  const getStatusValue = value => {
    if (value === "Active") {
      return "A"
    } else {
      return "I"
    }
  }

  const verifyUser = value => {
    console.log()
  }

  const filterSelectedRoles = (options, value) => {
    let _filteredValue = []
    let _value = ""

    if (!!value && typeof value == "string") {
      _value = value
    }

    _value = _value.replace(/\s/g, "")
    const _formattedValue = _value.split(",")

    if (!!options && !!options.length && options.length > 0) {
      _filteredValue = options.filter(c => _formattedValue.includes(c.value))
    }
    return _filteredValue
  }

  var handleChange = selectedOption => {
    if (
      !!selectedOption &&
      !!selectedOption.length &&
      selectedOption.length > 0
    ) {
      const values = selectedOption.map(option => option.value)
      setValue("role", values.toString())
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

      if (props.data !== null && props.data !== undefined) {
        setValue("idx", props.data.idx)
        setValue("userName", props.data.userName)
        setValue("mobileNo", props.data.mobileNo)
        setValue("email", props.data.email)
        setValue("branch", props.data.branches[0]?.code)
        setValue("role", props.data.roles)
        setValue("device", props.data.devices[0].code)
        setValue("model", props.data.devices[0].model)
        setValue("profileUser", props.data?.profileUser)
        setValue("meCode", props.data?.meCode)
        setValue("status", getStatusValue(props.data?.status))
      }
    }

    fetchData()

    return () => {
      _isMounted = false
    }
  }, [props.data])

  const options = roles.map((item, index) => {
    return { key: index, label: item.description, value: item.code }
  })

  return (
    <Row>
      <Modal size="lg" isOpen={props.isOpen}>
        <div className="modal-header">
          <h5 className="modal-title mt-0">Update System User</h5>
          <button
            onClick={() => {
              setData(null)
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
                      User IDX (AD Login ID)
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
                    <input
                      type="text"
                      className="form-control"
                      placeholder="CRO Code"
                      {...register("profileUser", { required: false })}
                    />
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
                      rules={{ required: true }}
                      render={({ field: { onChange, value, ref, onBlur } }) => (
                        // <Select
                        //   onBlur={onBlur}
                        //   inputRef={ref}
                        //   value={options.filter(c => value.includes(c.value))}
                        //   onChange={val => onChange(val.map(c => c.value))}
                        //   options={options}
                        //   isMulti
                        // />

                        <Select
                          onBlur={onBlur}
                          inputRef={ref}
                          value={filterSelectedRoles(options, value)}
                          onChange={handleChange}
                          options={options}
                          isMulti
                        />
                      )}
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
                      {branches.map((item, index) => (
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

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-status">
                      Status<span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
                      id="user-status"
                      {...register("status", { required: true })}
                    >
                      <option value="">Choose...</option>
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
  onSuccessfulUpdate: PropTypes.func,
}

export default Update
