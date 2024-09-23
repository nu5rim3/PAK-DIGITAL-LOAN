import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Modal,
    Alert,
} from "reactstrap";

import { useForm, Controller } from "react-hook-form";

import Select from "react-select";

import Loader from "components/SyncLoader";



import {
    createEmployee
} from "services/employee.service";

const Create = (props) => {

    const [isLoading, setIsLoading] = useState(false);


    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const { register, control, handleSubmit, handleInputChange, trigger, watch, setValue, setError, reset, formState: { errors } } = useForm({ mode: "all" });
    const onChange = async (event) => {
        const { name, value } = event.target;
        setValue(name, value); // Update the value in the form state
        await trigger(name); // Trigger validation for the specific field
    };
    const onSubmit = async (data) => {

        var payload = {
            "empNo": data.empNo,
            "empCnic": data.empCnic,
            "empName": data.empName,
            "empDisplayName": data.empDisplayName,
            "empContactNo": data.empContactNo,
            "empEmail": data.empEmail
        }

        setIsLoading(true);

        await createEmployee(payload).then(res => {
            if (res ?.status === 200) {
                setIsLoading(false);
                setSuccessMessage("Employee Created Successfully.");
                reset();
                setTimeout(() => {
                    setSuccessMessage(null);
                    props.toggel();
                    window.location.reload(true);
                }, 3000);
            } else if (res ?.status === 400) {
                console.log("fsdfsdfsd")
                setIsLoading(false);
                setErrorMessage(res.data ?.message);
                setTimeout(() => {
                    setErrorMessage(null);
                    // props.toggel();
                    // window.location.reload(true);
                }, 3000);
            } else if (res ?.status === 500) {
                setIsLoading(false);
                setErrorMessage("Employee Creation Failed.");
                setTimeout(() => {
                    setErrorMessage(null);
                    // props.toggel();
                    // window.location.reload(true);
                }, 3000);
            } else {
                setIsLoading(false);
                setErrorMessage(res.data ?.message);
                setTimeout(() => {
                    setErrorMessage(null);
                    // props.toggel();
                    // window.location.reload(true);
                }, 3000);
            }
        }).catch(err => console.log(err));
    };



    useEffect(() => {
        var _isMounted = true;

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
                        Create Business Introducer
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
                            <Col md={12}>
                                {successMessage && <Alert color="success">{successMessage}</Alert>}
                            </Col>
                            <Col md={12}>
                                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                            </Col>
                            <Row>
                                <Col md={6}>
                                    <div className="mb-3">
                                        <label htmlFor="employee-no">Employee No <span className="text-danger">*</span></label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="employee-no"
                                            placeholder="Enter Employee No"
                                            onChange={handleInputChange}
                                            {...register("empNo", { required: true, minLength: 6, maxLength: 6, pattern: /^[0-9\b]+$/ }) }
                                        />


                                        {errors.empNo ?.type === "required" && (<span className="text-danger">This field is required</span>)}
                                        {errors.empNo ?.type === "minLength" && (<span className="text-danger">Length should be 6 digits</span>)}
                                        {errors.empNo ?.type === "maxLength" && (<span className="text-danger">Length should be 6 digits</span>)}
                                        {errors.empNo ?.type === "pattern" && (<span className="text-danger">Cannot Enter Characters</span>)}
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="mb-3">
                                        <label htmlFor="employee-cnic">Employee CNIC (12345-1234567-8)<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="employee-cnic"
                                            onChange={handleInputChange}
                                            placeholder="Enter Employee CNIC"
                                            {...register("empCnic", { required: true, pattern: /^\d{5}-\d{7}-\d$/ }) }
                                        />
                                        {errors.empCnic ?.type === "required" && (<span className="text-danger">This field is required</span>)}
                                        {errors.empCnic ?.type === "pattern" && (<span className="text-danger">CNIC format is incorrect</span>)}
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="mb-3">
                                        <label htmlFor="employee-name">Employee Name <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="employee-name"
                                            onChange={handleInputChange}
                                            placeholder="Enter Employee Name"
                                            {...register("empName", { required: true }) }
                                        />
                                        {errors.empName && <span className="text-danger">This field is required</span>}
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="mb-3">
                                        <label htmlFor="employee-display-name">Display Name <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="employee-display-name"
                                            onChange={handleInputChange}
                                            placeholder="Enter Display Name"
                                            {...register("empDisplayName", { required: true }) }
                                        />
                                        {errors.empDisplayName && <span className="text-danger">This field is required</span>}
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="mb-3">
                                        <label htmlFor="employee-email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="employee-email"
                                            onChange={handleInputChange}
                                            placeholder="Enter Email"
                                            {...register("empEmail", { required: false, pattern: /^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/ }) }
                                        />

                                        {errors.empEmail ?.type === "pattern" && (<span className="text-danger">Email format is incorrect</span>)}
                                    </div>
                                </Col>




                                <Col md={6}>
                                    <div className="mb-3">
                                        <label htmlFor="employee-contact">Contact No (03075105336)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="employee-contact"
                                            onChange={handleInputChange}
                                            placeholder="Enter Contact No"
                                            {...register("empContactNo", { required: false, pattern: /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/ }) }
                                        />

                                        {errors.empContactNo ?.type === "pattern" && (<span className="text-danger">Mobile No format is incorrect</span>)}
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