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
  getUserById,
} from "services/user.service";

import {
  getAllApprovalGroups,
  createApprovalUser,
} from "services/approval.service";

const Create = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setErrorMessage] = useState(null);

  const { register, handleSubmit, watch, setError, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    var payload = {
      "group": {
        "code": data.group
      },
      "userIdx": data.userIdx.trim(),
    }

    setIsLoading(true);

    await createApprovalUser(payload).then(res => {
      setIsLoading(false);
      if (res !== undefined) {
        setSuccess("User has been created successfully.");
        reset();
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }
      
      throw res;
    }).catch(err => {
      setIsLoading(false);
      if (err) {
        setErrorMessage(err);
      }

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    });
  };

  const findUser = async() => {
    var user = watch("userIdx");
    if (user === "") {
      setError("userIdx", "required", "User Id is required");
      return;
    }

    const userData = await getUserById(user);
    if (userData !== undefined) {
      setSuccess("User has been found successfully.");
      return;
    } else {
      setErrorMessage("User not found.");
    }
  }

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const groupsResponse = await getAllApprovalGroups();
      if (_isMounted && groupsResponse !== undefined) {
        setGroups(groupsResponse);
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    }
  }, [props.isOpen]);

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
            Create Member
          </h5>
          <button
            onClick={() => {
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
              <Row>
                <Col md={12}>
                  {success && <Alert color="success">{success}</Alert>}
                </Col>
                <Col md={12}>
                  {error && <Alert color="danger">{error}</Alert>}
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="user-profile">User IDX</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter User IDX"
                        {...register("userIdx", { required: true })}
                      />
                      <div className="input-group-append">
                        <button className="btn btn-success"
                          type="button"
                          onClick={() => findUser()}>
                          Find
                        </button>
                      </div>
                    </div>
                    {errors.userIdx && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="approval-group">Group</label>
                    <select
                      className="form-control"
                      id="approval-group"
                      {...register("group", { required: true })}
                    >
                      <option value="">Choose...</option>
                      {groups.map((item, index) => <option key={index} value={item.code}>{item.name}</option>)}
                    </select>
                    {errors.group && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>
              </Row>

              <div className="mt-3 d-flex flex-row-reverse">
                <button type="submit" className="btn btn-primary w-md">
                  <Loader loading={isLoading}>
                    <i className="bx bx-save font-size-16 me-2" ></i>
                    Create
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

Create.propTypes = {
  isOpen: PropTypes.bool,
  toggel: PropTypes.func,
}

export default Create;