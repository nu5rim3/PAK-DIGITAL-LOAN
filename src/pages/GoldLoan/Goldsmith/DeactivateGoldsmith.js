import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Row,
  Col,
  Alert,
  Modal,
  ModalBody,
} from "reactstrap";

import { useForm } from "react-hook-form";
import Loader from "components/SyncLoader";

//APIs
import { deactivateGoldsmith } from "services/goldsmith.service";

const DeactivateGoldsmith = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { register, handleSubmit, watch, setValue, setError, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    setIsLoading(true);

    if (props.data !== undefined && props.data !== null) {
      await deactivateGoldsmith(props.data?.id).then(res => {
        if (res?.status === 200) {
          setIsLoading(false);
          setSuccessMessage("User Deactivated successfully.");
          reset();
          setTimeout(() => {
            setSuccessMessage(null);
            props.toggel();
            window.location.reload(true);
          }, 3000);
        } else if (res?.status === 500) {
          setIsLoading(false);
          setErrorMessage("User Deactivated failed.");
          setTimeout(() => {
            setErrorMessage(null);
            props.toggel();
            window.location.reload(true);
          }, 3000);
        } else {
          setIsLoading(false);
          setErrorMessage(res.data?.message);
          setTimeout(() => {
            setErrorMessage(null);
            props.toggel();
            window.location.reload(true);
          }, 3000);
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
        <div className="modal-body"
        // style={{ background: 'rgba(242, 131, 131,.5)' }}
        >
          <Row>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Col md={12}>
                {successMessage && <Alert color="danger">{successMessage}</Alert>}
              </Col>
              <Col md={12}>
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
              </Col>
              <ModalBody style={{ fontSize: 'medium', color: 'red', display: 'flex', justifyContent: 'center', marginTop: '10px' }} color="danger">
                Are You Sure You Want To Deactivate This User?
              </ModalBody>

              <div className="mt-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-danger w-md m-1">
                  <Loader loading={isLoading}>
                    <i className="bx bx-trash font-size-18 me-2" ></i>
                    Deactivate
                  </Loader>
                </button>
                <button type="submit" className="btn btn-primary w-md m-1" onClick={() => {
                  props.toggel();
                }}>
                  <Loader loading={isLoading}>
                    <i className="bx bx-undo font-size-20 me-2" ></i>
                    Cancel
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

DeactivateGoldsmith.propTypes = {
  isOpen: PropTypes.bool,
  toggel: PropTypes.func,
  onSuccessfulDeactivate: PropTypes.func,
  data: PropTypes.object,
}

export default DeactivateGoldsmith;