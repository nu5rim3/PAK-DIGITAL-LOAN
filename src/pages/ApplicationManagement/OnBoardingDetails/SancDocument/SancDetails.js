import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Row,
    Col,
} from "reactstrap";

import Loader from "components/Loader";

// APIs
import {
    getVerificationDetails
} from "services/on_board.service";

const SancDetails = () => {

    const { id } = useParams();
    const [msas, setMsas] = useState([]);
    const [eu, setEU] = useState([false]);
    const [nabpk, setNABPK] = useState([false]);
    const [interpol, setInterpol] = useState([false]);
    const [nacta, setNACTA] = useState([false]);
    const [dfat, setDFAT] = useState([false]);
    const [ukhmt, setUKHMT] = useState([false]);
    const [ofac, setOFAC] = useState([false]);
    const [unsc, setUNSC] = useState([false]);
    const [fia, setFIA] = useState([false]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        var _isMounted = true;

        setLoading(true);
        const fetchData = async () => {
            const verificationResponse = await getVerificationDetails(id);

            if (_isMounted) {


                let jsonObj = JSON.parse(verificationResponse?.msasDetailsDto?.objSanName);

                if (Array.isArray(jsonObj.data.eu) && jsonObj.data.eu.length) {
                    setEU(true);
                }

                if (Array.isArray(jsonObj.data.nabpk) && jsonObj.data.nabpk.length) {
                    setNABPK(true);
                }
                if (Array.isArray(jsonObj.data.wanted_interpol) && jsonObj.data.wanted_interpol.length) {
                    setInterpol(true);
                }
                if (Array.isArray(jsonObj.data.nacta) && jsonObj.data.nacta.length) {
                    setNACTA(true);
                }

                if (Array.isArray(jsonObj.data.dfat) && jsonObj.data.dfat.length) {
                    setDFAT(true);
                }
                if (Array.isArray(jsonObj.data.ukhmt) && jsonObj.data.ukhmt.length) {
                    setUKHMT(true);
                }
                if (Array.isArray(jsonObj.data.ofac) && jsonObj.data.ofac.length) {
                    setOFAC(true);
                }
                if (Array.isArray(jsonObj.data.unsc) && jsonObj.data.unsc.length) {
                    setUNSC(true);
                }
                if (Array.isArray(jsonObj.data.fia) && jsonObj.data.fia.length) {
                    setFIA(true);
                }
                setMsas(jsonObj.data);
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            _isMounted = false;
        };
    }, []);


    return (

        <div className="p-3">
            <Loader loading={loading}>
                {msas?.eu && eu == true && <div className="p-3">

                    <Row className="border border-success rounded p-3 mb-3">
                        <Col md={6}>
                            <p className="m-0 grid-text">Entity Name</p>
                        </Col>

                        <Col md={4}>
                            {msas?.eu[0].entity}

                        </Col>
                    </Row>
                    <Row>
                        <div className="text-muted d-flex">
                            <Col md={12}>
                                <table className="table mb-4">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>CNIC</th>
                                            <th>Father Name</th>
                                            <th>Country</th>
                                            <th>Address</th>
                                            <th>Birth Place</th>
                                            <th>Date of Birth</th>


                                        </tr>
                                    </thead>
                                    <tbody>

                                        {

                                            msas?.eu != null && msas?.eu?.map((pepNameObj, index) => {

                                                return <tr key={index}>
                                                    <td>{pepNameObj.fullname ? pepNameObj.fullname : "-"}</td>
                                                    <td>{pepNameObj.ninumber ? pepNameObj.ninumber : "-"}</td>

                                                    <td>{pepNameObj.father ? pepNameObj.father : "-"}</td>
                                                    <td>{pepNameObj.country ? pepNameObj.country : "-"}</td>
                                                    <td>{pepNameObj.entity_address ? pepNameObj.entity_address : "-"}</td>
                                                    <td>{pepNameObj.placeofbirth ? pepNameObj.placeofbirth : "-"}</td>
                                                    <td>{pepNameObj.dob ? pepNameObj.dob : "-"}</td>

                                                </tr>

                                            })}
                                    </tbody>
                                </table>
                            </Col>


                        </div>
                    </Row>
                </div>
                }
                {msas?.nabpk && nabpk == true && <div className="p-3">

                    <Row className="border border-success rounded p-3 mb-3">
                        <Col md={6}>
                            <p className="m-0 grid-text">Entity Name</p>
                        </Col>

                        <Col md={4}>
                            {msas?.nabpk[0].entity}

                        </Col>
                    </Row>
                    <Row>
                        <div className="text-muted d-flex">
                            <Col md={12}>
                                <table className="table mb-4">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>CNIC</th>
                                            <th>Father Name</th>
                                            <th>Country</th>
                                            <th>Address</th>
                                            <th>Birth Place</th>
                                            <th>Date of Birth</th>


                                        </tr>
                                    </thead>
                                    <tbody>

                                        {

                                            msas?.nabpk != null && msas?.nabpk?.map((pepNameObj, index) => {

                                                return <tr key={index}>
                                                    <td>{pepNameObj.fullname ? pepNameObj.fullname : "-"}</td>
                                                    <td>{pepNameObj.ninumber ? pepNameObj.ninumber : "-"}</td>

                                                    <td>{pepNameObj.fathername ? pepNameObj.fathername : "-"}</td>
                                                    <td>{pepNameObj.country ? pepNameObj.country : "-"}</td>
                                                    <td>{pepNameObj.address ? pepNameObj.address : "-"}</td>
                                                    <td>{pepNameObj.placeofbirth ? pepNameObj.placeofbirth : "-"}</td>
                                                    <td>{pepNameObj.dob ? pepNameObj.dob : "-"}</td>

                                                </tr>

                                            })}
                                    </tbody>
                                </table>
                            </Col>


                        </div>
                    </Row>
                </div>
                }
                {msas?.interpol && interpol == true && <div className="p-3">

                    <Row className="border border-success rounded p-3 mb-3">
                        <Col md={6}>
                            <p className="m-0 grid-text">Entity Name</p>
                        </Col>

                        <Col md={4}>
                            {msas?.interpol[0].entity}

                        </Col>
                    </Row>
                    <Row>
                        <div className="text-muted d-flex">
                            <Col md={12}>
                                <table className="table mb-4">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>CNIC</th>
                                            <th>Father Name</th>
                                            <th>Country</th>
                                            <th>Address</th>
                                            <th>Birth Place</th>
                                            <th>Date of Birth</th>


                                        </tr>
                                    </thead>
                                    <tbody>

                                        {

                                            msas?.interpol != null && msas?.interpol?.map((pepNameObj, index) => {

                                                return <tr key={index}>
                                                    <td>{pepNameObj.fullname ? pepNameObj.fullname : "-"}</td>
                                                    <td>{pepNameObj.ninumber ? pepNameObj.ninumber : "-"}</td>

                                                    <td>{pepNameObj.fathername ? pepNameObj.fathername : "-"}</td>
                                                    <td>{pepNameObj.country ? pepNameObj.country : "-"}</td>
                                                    <td>{pepNameObj.address ? pepNameObj.address : "-"}</td>
                                                    <td>{pepNameObj.placeofbirth ? pepNameObj.placeofbirth : "-"}</td>
                                                    <td>{pepNameObj.dob ? pepNameObj.dob : "-"}</td>

                                                </tr>

                                            })}
                                    </tbody>
                                </table>
                            </Col>


                        </div>
                    </Row>
                </div>
                }
                {msas?.nacta && nacta == true && <div className="p-3">

                    <Row className="border border-success rounded p-3 mb-3">
                        <Col md={6}>
                            <p className="m-0 grid-text">Entity Name</p>
                        </Col>

                        <Col md={4}>
                            {msas?.nacta[0].entity}

                        </Col>
                    </Row>
                    <Row>
                        <div className="text-muted d-flex">
                            <Col md={12}>
                                <table className="table mb-4">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>CNIC</th>
                                            <th>Father Name</th>
                                            <th>Country</th>
                                            <th>Address</th>
                                            <th>Birth Place</th>
                                            <th>Date of Birth</th>


                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            msas?.nacta != null && msas?.nacta?.map((pepNameObj, index) => {

                                                return <tr key={index}>
                                                    <td>{pepNameObj.fullname ? pepNameObj.fullname : "-"}</td>
                                                    <td>{pepNameObj.ninumber ? pepNameObj.ninumber : "-"}</td>

                                                    <td>{pepNameObj.fathername ? pepNameObj.fathername : "-"}</td>
                                                    <td>{pepNameObj.country ? pepNameObj.country : "-"}</td>
                                                    <td>{pepNameObj.address ? pepNameObj.address : "-"}</td>
                                                    <td>{pepNameObj.placeofbirth ? pepNameObj.placeofbirth : "-"}</td>
                                                    <td>{pepNameObj.dob ? pepNameObj.dob : "-"}</td>

                                                </tr>


                                            })}


                                    </tbody>
                                </table>
                            </Col>


                        </div>
                    </Row>
                </div>
                }


                {msas?.dfat && dfat == true && <div className="p-3">

                    <Row className="border border-success rounded p-3 mb-3">
                        <Col md={6}>
                            <p className="m-0 grid-text">Entity Name</p>
                        </Col>

                        <Col md={4}>
                            {msas?.dfat[0].entity}

                        </Col>
                    </Row>
                    <Row>
                        <div className="text-muted d-flex">
                            <Col md={12}>
                                <table className="table mb-4">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>CNIC</th>
                                            <th>Father Name</th>
                                            <th>Country</th>
                                            <th>Address</th>
                                            <th>Birth Place</th>
                                            <th>Date of Birth</th>


                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            msas?.dfat != null && msas?.dfat?.map((pepNameObj, index) => {

                                                return <tr key={index}>
                                                    <td>{pepNameObj.fullname ? pepNameObj.fullname : "-"}</td>
                                                    <td>{pepNameObj.ninumber ? pepNameObj.ninumber : "-"}</td>

                                                    <td>{pepNameObj.fathername ? pepNameObj.fathername : "-"}</td>
                                                    <td>{pepNameObj.country ? pepNameObj.country : "-"}</td>
                                                    <td>{pepNameObj.address ? pepNameObj.address : "-"}</td>
                                                    <td>{pepNameObj.placeofbirth ? pepNameObj.placeofbirth : "-"}</td>
                                                    <td>{pepNameObj.dob ? pepNameObj.dob : "-"}</td>

                                                </tr>


                                            })}


                                    </tbody>
                                </table>
                            </Col>


                        </div>
                    </Row>
                </div>
                }
                {msas?.ukhmt && ukhmt == true && <div className="p-3">

                    <Row className="border border-success rounded p-3 mb-3">
                        <Col md={6}>
                            <p className="m-0 grid-text">Entity Name</p>
                        </Col>

                        <Col md={4}>
                            {msas?.ukhmt[0].entity}

                        </Col>
                    </Row>
                    <Row>
                        <div className="text-muted d-flex">
                            <Col md={12}>
                                <table className="table mb-4">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>CNIC</th>
                                            <th>Father Name</th>
                                            <th>Country</th>
                                            <th>Address</th>
                                            <th>Birth Place</th>
                                            <th>Date of Birth</th>


                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            msas?.ukhmt != null && msas?.ukhmt?.map((pepNameObj, index) => {

                                                return <tr key={index}>
                                                    <td>{pepNameObj.fullname ? pepNameObj.fullname : "-"}</td>
                                                    <td>{pepNameObj.ninumber ? pepNameObj.ninumber : "-"}</td>

                                                    <td>{pepNameObj.fathername ? pepNameObj.fathername : "-"}</td>
                                                    <td>{pepNameObj.country ? pepNameObj.country : "-"}</td>
                                                    <td>{pepNameObj.address ? pepNameObj.address : "-"}</td>
                                                    <td>{pepNameObj.placeofbirth ? pepNameObj.placeofbirth : "-"}</td>
                                                    <td>{pepNameObj.dateofbirth ? pepNameObj.dateofbirth : "-"}</td>

                                                </tr>


                                            })}


                                    </tbody>
                                </table>
                            </Col>


                        </div>
                    </Row>
                </div>
                }


                {msas?.ofac && ofac == true && <div className="p-3">

                    <Row className="border border-success rounded p-3 mb-3">
                        <Col md={6}>
                            <p className="m-0 grid-text">Entity Name</p>
                        </Col>

                        <Col md={4}>
                            {msas?.ofac[0].entity}

                        </Col>
                    </Row>
                    <Row>
                        <div className="text-muted d-flex">
                            <Col md={12}>
                                <table className="table mb-4">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>CNIC</th>
                                            <th>Father Name</th>
                                            <th>Country</th>
                                            <th>Address</th>
                                            <th>Birth Place</th>
                                            <th>Date of Birth</th>


                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            msas?.ofac != null && msas?.ofac?.map((pepNameObj, index) => {

                                                return <tr key={index}>
                                                    <td>{pepNameObj.fullname ? pepNameObj.fullname : "-"}</td>
                                                    <td>{pepNameObj.ninumber ? pepNameObj.ninumber : "-"}</td>

                                                    <td>{pepNameObj.fathername ? pepNameObj.fathername : "-"}</td>
                                                    <td>{pepNameObj.country ? pepNameObj.country : "-"}</td>
                                                    <td>{pepNameObj.address ? pepNameObj.address : "-"}</td>
                                                    <td>{pepNameObj.placeofbirth ? pepNameObj.placeofbirth : "-"}</td>
                                                    <td>{pepNameObj.dateofbirth ? pepNameObj.dateofbirth : "-"}</td>

                                                </tr>


                                            })}


                                    </tbody>
                                </table>
                            </Col>


                        </div>
                    </Row>
                </div>
                }



                {msas?.unsc && unsc == true && <div className="p-3">

                    <Row className="border border-success rounded p-3 mb-3">
                        <Col md={6}>
                            <p className="m-0 grid-text">Entity Name</p>
                        </Col>

                        <Col md={4}>
                            {msas?.unsc[0].entity}

                        </Col>
                    </Row>
                    <Row>
                        <div className="text-muted d-flex">
                            <Col md={12}>
                                <table className="table mb-4">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>CNIC</th>
                                            <th>Father Name</th>
                                            <th>Country</th>
                                            <th>Address</th>
                                            <th>Birth Place</th>
                                            <th>Date of Birth</th>


                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            msas?.unsc != null && msas?.unsc?.map((pepNameObj, index) => {

                                                return <tr key={index}>
                                                    <td>{pepNameObj.fullname ? pepNameObj.fullname : "-"}</td>
                                                    <td>{pepNameObj.ninumber ? pepNameObj.ninumber : "-"}</td>

                                                    <td>{pepNameObj.fathername ? pepNameObj.fathername : "-"}</td>
                                                    <td>{pepNameObj.country ? pepNameObj.country : "-"}</td>
                                                    <td>{pepNameObj.address ? pepNameObj.address : "-"}</td>
                                                    <td>{pepNameObj.placeofbirth ? pepNameObj.placeofbirth : "-"}</td>
                                                    <td>{pepNameObj.dateofbirth ? pepNameObj.dateofbirth : "-"}</td>

                                                </tr>


                                            })}


                                    </tbody>
                                </table>
                            </Col>


                        </div>
                    </Row>
                </div>
                }


                {msas?.fia && fia == true && <div className="p-3">

                    <Row className="border border-success rounded p-3 mb-3">
                        <Col md={6}>
                            <p className="m-0 grid-text">Entity Name</p>
                        </Col>

                        <Col md={4}>
                            {msas?.fia[0].entity}

                        </Col>
                    </Row>
                    <Row>
                        <div className="text-muted d-flex">
                            <Col md={12}>
                                <table className="table mb-4">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>CNIC</th>
                                            <th>Father Name</th>
                                            <th>Country</th>
                                            <th>Address</th>
                                            <th>Birth Place</th>
                                            <th>Date of Birth</th>


                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            msas?.fia != null && msas?.fia?.map((pepNameObj, index) => {

                                                return <tr key={index}>
                                                    <td>{pepNameObj.fullname ? pepNameObj.fullname : "-"}</td>
                                                    <td>{pepNameObj.ninumber ? pepNameObj.ninumber : "-"}</td>

                                                    <td>{pepNameObj.fathername ? pepNameObj.fathername : "-"}</td>
                                                    <td>{pepNameObj.country ? pepNameObj.country : "-"}</td>
                                                    <td>{pepNameObj.address ? pepNameObj.address : "-"}</td>
                                                    <td>{pepNameObj.placeofbirth ? pepNameObj.placeofbirth : "-"}</td>
                                                    <td>{pepNameObj.dateofbirth ? pepNameObj.dateofbirth : "-"}</td>

                                                </tr>


                                            })}


                                    </tbody>
                                </table>
                            </Col>


                        </div>
                    </Row>
                </div>
                }
            </Loader>
        </div>

    );
}

export default SancDetails;