import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Row,
  Col,
  Alert,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";

import { useForm } from "react-hook-form";
import Loader from "components/SyncLoader";

//APIs
import { deacivateGoldRates } from "services/gold-rate.service";

const DeactivateGoldRates = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { register, handleSubmit, watch, setValue, setError, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    setIsLoading(true);

    if (props.data !== undefined && props.data !== null) {
      await deacivateGoldRates(props.data?.id).then(res => {
        if (res?.status === 200) {
          setIsLoading(false);
          setSuccessMessage("Rate Deactivated successfully.");
          reset();
          setTimeout(() => {
            setSuccessMessage(null);
            props.toggel();
            window.location.reload(true);
          }, 2000);
        } else if (res?.status === 500) {
          setIsLoading(false);
          setErrorMessage("Rate Deactivated failed.");
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
    }

  };

  return (
    <Row>
      <Modal
        size="md"
        isOpen={props.isOpen}
      // centered="true"
      >
        <div className="modal-body" >
          <Row>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Col md={12}>
                {successMessage && <Alert color="danger">{successMessage}</Alert>}
              </Col>
              <Col md={12}>
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
              </Col>
              <ModalBody style={{ fontSize: 'medium', color: 'red', display: 'flex', justifyContent: 'center', marginTop: '10px' }} color="danger">
                Are You Sure You Want To Deactivate This Record?
              </ModalBody>

              <div className="mt-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-danger w-md m-1">
                  {/* <i className="bx bx-trash font-size-18 me-2" ></i> */}
                  Deactivate
                </button>
                <button type="submit" className="btn btn-primary w-md m-1" onClick={() => {
                  props.toggel();
                }}>
                  {/* <i className="bx bx-undo font-size-20 me-2" ></i> */}
                  Cancel
                </button>
              </div>
            </form>
          </Row>
        </div>
      </Modal>
    </Row>
  );
}

DeactivateGoldRates.propTypes = {
  isOpen: PropTypes.bool,
  toggel: PropTypes.func,
  onSuccessfulDeactivate: PropTypes.func,
  data: PropTypes.object,
}

export default DeactivateGoldRates;