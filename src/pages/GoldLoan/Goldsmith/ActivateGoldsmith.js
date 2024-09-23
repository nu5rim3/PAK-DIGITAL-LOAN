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

import { updateGoldsmith } from "services/goldsmith.service";
import { getAllBranches } from "services/common.service";

const ActivateGoldsmith = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [branches, setBranches] = useState(null);
  const [data, setData] = useState(null);

  const { register, handleSubmit, watch, setValue, setError, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    var payload = {
      "id": data.id,
      "branchIdFx": data.branchIdFx,
      "shopName": data.shopName,
      "ownerName": data.ownerName,
      "contactNumber": data.contactNumber,
      "address": data.address,
      "addLineOne": data.addLineOne,
      "addLineTwo": data.addLineTwo,
      "goldsmithStatus": data.goldsmithStatus
    }

    setIsLoading(true);

    await updateGoldsmith(props.data.id, payload).then(res => {
      if (res?.status === 200) {
        setIsLoading(false);
        setSuccessMessage("User updated successfully.");
        reset();
        setTimeout(() => {
          setSuccessMessage(null);
          props.toggel();
          window.location.reload(true);
        }, 2000);
      } else if (res?.status === 500) {
        setIsLoading(false);
        setErrorMessage("User updated failed.");
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

  const getStatusValue = (value) => {
    if (value === "ACTIVE") {
      return "A";
    } else {
      return "D";
    }
  }

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      const branchResponse = await getAllBranches();
      if (_isMounted) {
        setBranches(branchResponse);
      }

      if (props.data !== null && props.data !== undefined) {
        setValue("branchIdFx", props.data.branchIdFx);
        setValue("shopName", props.data.shopName);
        setValue("ownerName", props.data.ownerName);
        setValue("contactNumber", props.data.contactNumber);
        setValue("address", props.data.address);
        setValue("addLineOne", props.data.addLineOne);
        setValue("addLineTwo", props.data.addLineTwo);
        setValue("goldsmithStatus", getStatusValue(props.data.goldsmithStatus));
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
        size="md"
        isOpen={props.isOpen}
      >
        <div className="modal-header">
          <h5
            className="modal-title mt-0"
          >
            Activate Goldsmith
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
                <Col md={12}>
                  <div className="mb-3">
                    <label htmlFor="goldsmithStatus">Status</label>
                    <select
                      className="form-control"
                      id="goldsmithStatus"
                      {...register("goldsmithStatus", { required: false })}
                    >
                      <option value="A">Activate</option>
                      <option value="D">Deactivate</option>
                    </select>
                    {errors.goldsmithStatus && <span className="text-danger">This field is required</span>}
                  </div>
                </Col>
              </Row>

              <div className="mt-3 d-flex flex-row-reverse">
                <button type="submit" className="btn btn-success w-md">
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

ActivateGoldsmith.propTypes = {
  isOpen: PropTypes.bool,
  toggel: PropTypes.func,
  data: PropTypes.object,
  onSuccessfulActivate: PropTypes.func,
}

export default ActivateGoldsmith;