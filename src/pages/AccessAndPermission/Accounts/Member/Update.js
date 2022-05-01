import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  Alert,
} from "reactstrap";

import { useForm } from "react-hook-form";

import Loader from "components/SyncLoader";

import {
  getAllBranches,
  verifyProfileUser,
} from "services/common.service";

import {
  getRoles,
} from "services/role.service";

import {
  updateUser
} from "services/user.service";

const Update = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { register, handleSubmit, watch, setValue, setError, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    var payload = {
      "idx": data.idx,
      "userName": data.userName,
      "mobileNo": data.mobileNo,
      "email": data.email,
      "branches": [
        {
          "code": data.branch,
        }
      ],
      "roles": [
        {
          "code": data.role,
        }
      ],
      "devices": [
        {
          "code": data.device,
          "model": data.model,
        }
      ],
      "meCode": data?.meCode,
      "profileUser": data.profileUser,
      "status": data.status,
    }

    setIsLoading(true);

    await updateUser(props.data.idx, payload).then(res => {
      if (res !== undefined && res !== null) {
        setIsLoading(false);
        setSuccessMessage("User updated successfully.");
        reset();
        setTimeout(() => { 
          setSuccessMessage(null); 
          props.toggel(); 
        }, 3000);
      } else {
        setIsLoading(false);
        setErrorMessage("User update failed.");
      }
    });
  };

  const getStatusValue = (value) => {
    if (value === "Active") {
      return "A";
    } else {
      return "I";
    }
  }

  const verifyUser = (value) => {
    console.log();
  }

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const roleResponse = await getRoles();
      const branchResponse = await getAllBranches();
      if (_isMounted) {
        setRoles(roleResponse);
        setBranches(branchResponse);
      }

      if (props.data !== null && props.data !== undefined) {
        setValue("idx", props.data.idx);
        setValue("userName", props.data.userName);
        setValue("mobileNo", props.data.mobileNo);
        setValue("email", props.data.email);
        setValue("branch", props.data.branches[0]?.code);
        setValue("role", props.data.roles);
        setValue("device", props.data.devices[0].code);
        setValue("model", props.data.devices[0].model);
        setValue("profileUser", props.data?.profileUser);
        setValue("meCode", props.data?.meCode);
        setValue("status", getStatusValue(props.data.status));
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    }
  }, [props.data]);

  return (
    <Row>
      <Modal
        size="lg"
        isOpen={props.isOpen}
      >
        <div className="modal-header">
          <h5
            className="modal-title mt-0"
          >
            Update Member
          </h5>
          <button
            onClick={() => {
              setData(null);
              props.toggel();
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
                {successMessage && <Alert color="success">{successMessage}</Alert>}
              </Col>
              <Col md={12}>
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
              </Col>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-idx">User IDX (AD Login ID)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="user-idx"
                      placeholder="Enter User IDX"
                      {...register("idx", { required: true })}
                    />
                    {errors.idx && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-profile">Profile Username (SYUS ID)</label>
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
                    {errors.userName && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-name">User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="user-name"
                      placeholder="Enter User Name"
                      {...register("userName", { required: true })}
                    />
                    {errors.userName && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="user-email"
                      placeholder="Enter User Email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-role">Role</label>
                    <select
                      className="form-control"
                      id="user-role"
                      {...register("role", { required: true })}
                    >
                      <option value="">Choose...</option>
                      {roles.map((item, index) => <option key={index} value={item.code}>{item.description}</option>)}
                    </select>
                    {errors.role && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-branch">Branch</label>
                    <select
                      className="form-control"
                      id="user-branch"
                      {...register("branch", { required: true })}
                    >
                      <option value="">Choose...</option>
                      {branches.map((item, index) => <option key={index} value={item.code}>{item.description}</option>)}
                    </select>
                    {errors.branch && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-contact">Contact</label>
                    <input
                      type="text"
                      className="form-control"
                      id="user-contact"
                      placeholder="Enter User Contact"
                      {...register("mobileNo", { required: false })}
                    />
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
                    <label htmlFor="user-status">Status</label>
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
                    <i className="bx bx-save font-size-16 me-2" ></i>
                    Update
                  </Loader>
                </button>
              </div>
            </form>
          </Row>
        </div>
      </Modal>
    </Row>
  );
}

Update.propTypes = {
  isOpen: PropTypes.bool,
  toggel: PropTypes.func,
  data: PropTypes.object,
}

export default Update;