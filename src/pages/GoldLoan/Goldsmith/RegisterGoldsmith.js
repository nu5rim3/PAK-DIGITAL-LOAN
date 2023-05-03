import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Alert,
  Modal
} from "reactstrap";

import { useForm } from "react-hook-form";
import Loader from "components/SyncLoader";

// APIs
import { createGoldSmith } from "services/goldsmith.service";
import { getAllBranches } from "services/common.service";

const RegisterGoldSmith = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [branches, setBranches] = useState(null);

  const { register, handleSubmit, watch, setValue, setError, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    var payload = {
      "branchIdFx": data.branchIdFx,
      "shopName": data.shopName,
      "ownerName": data.ownerName,
      "contactNumber": data.contactNumber,
      "address": data.address,
      "addLineOne": data.addLineOne,
      "addLineTwo": data.addLineTwo
    }

    setIsLoading(true);

    await createGoldSmith(payload).then(res => {
      if (res?.status === 200) {
        setIsLoading(false);
        setSuccessMessage("User created successfully.");
        reset();
        setTimeout(() => {
          setSuccessMessage(null);
          props.toggel();
          window.location.reload(true);
        }, 2000);
      } else if (res?.status === 500) {
        setIsLoading(false);
        setErrorMessage("User creation failed.");
        setTimeout(() => {
          setErrorMessage(null);
          props.toggel();
          window.location.reload(true);
        }, 2000);
      } else {
        setIsLoading(false);
        setErrorMessage(res.data?.message);
        setTimeout(() => {
          setErrorMessage(null);
          props.toggel();
          window.location.reload(true);
        }, 2000);
      }
    }).catch(err => console.log(err));
  };

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const branchResponse = await getAllBranches();
      if (_isMounted) {
        setBranches(branchResponse);
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    }
  }, []);

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
            Register Goldsmith
          </h5>
          <button
            onClick={() => {
              window.location.reload(true);
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
                    <label htmlFor="branchIdFx">Branch</label>
                    <select
                      className="form-control"
                      id="branchIdFx"
                      {...register("branchIdFx", { required: true })}
                    >
                      <option value="">Choose...</option>
                      {branches?.map((item, index) => <option key={index} value={item.code}>{item.description}</option>)}
                    </select>
                    {errors.branchIdFx && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="shopName">Shop Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="shopName"
                      placeholder="Enter Shop Name"
                      {...register("shopName", { required: true })}
                    />
                    {errors.shopName && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="ownerName">Owner Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ownerName"
                      placeholder="Enter Owner Name"
                      {...register("ownerName", { required: true })}
                    />
                    {errors.ownerName && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="contactNumber"
                      placeholder="Enter Contact Number"
                      {...register("contactNumber", { required: true, pattern: /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/ })}
                    />
                    {errors.contactNumber && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>
                <Row><label>ADDRESS</label></Row>
                <Col md={4}>
                  <div className="mb-3">
                    <label htmlFor="address">Address Line 1</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Line 1"
                      {...register("address", { required: true })}
                    />
                    {errors.address && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>
                <Col md={4}>
                  <div className="mb-3">
                    <label htmlFor="addLineOne">Address Line 2</label>
                    <input
                      type="text"
                      className="form-control"
                      id="addLineOne"
                      placeholder="Line 2"
                      {...register("addLineOne", { required: true })}
                    />
                    {errors.addLineOne && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>
                <Col md={4}>
                  <div className="mb-3">
                    <label htmlFor="addLineTwo">Address Line 3</label>
                    <input
                      type="text"
                      className="form-control"
                      id="addLineTwo"
                      placeholder="Line 3"
                      {...register("addLineTwo", { required: false })}
                    />
                    {errors.addLineTwo && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>
              </Row>

              <div className="mt-3 d-flex flex-row-reverse">
                <button type="submit" className="btn btn-success w-md">
                  <Loader loading={isLoading}>
                    <i className="bx bx-save font-size-16 me-2" ></i>
                    Save
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

RegisterGoldSmith.propTypes = {
  isOpen: PropTypes.bool,
  toggel: PropTypes.func,
}

export default RegisterGoldSmith;