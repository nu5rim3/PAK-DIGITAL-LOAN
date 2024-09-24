import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import {
	Progress,
	Row,
	Col,
	Card,
	CardBody,
	Collapse,
	Button,
} from 'reactstrap';
// APIs
import {
	getCustomerCreditScoreDetails

} from "services/scoring.service";
import Loader from "components/Loader";
const SummaryBar = (props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [progressColour, setProgressColour] = useState('')
	const [customerDetails, setCustomerDetails] = useState(null);
	const [cutOffValue, setCutOffValue] = useState(null);
	const [totalCreditScore, setTotalCreditScore] = useState(0);
	var setColour = null;
	useEffect(() => {
		var _isMounted = true;
		setIsLoading(true);
		const fetchData = async () => {

			if (props.product != "" && props.appraisalId != "") {
				const customerResponse = await getCustomerCreditScoreDetails(props.product, props.appraisalId);

				if (_isMounted) {
					setCustomerDetails(customerResponse);
					setCutOffValue(customerResponse.cutOffValue);
					setTotalCreditScore(customerResponse.totalCreditScore);
					prgColour(customerResponse.totalCreditScore);
					setIsLoading(false);

				}
			}
		};
		const prgColour = async (totalCreditScore) => {

			if (totalCreditScore < 50.00) {
				setColour = 'danger';
				setProgressColour(setColour);
			} else if (totalCreditScore < 60.00) {
				setColour = 'warning';
				setProgressColour(setColour);
			} else if (totalCreditScore < 70.00) {
				setColour = 'info';
				setProgressColour(setColour);
			} else {
				setColour = 'success';
				setProgressColour(setColour);
			}

		};


		fetchData();
		return () => {
			_isMounted = false;
		};
	}, [props.product]);


	// const radius = 100; // Radius of the semi-circle
	// const circumference = 2 * Math.PI * radius;
	// const offset = circumference - (value / 100) * circumference;

	// return (
	// 	<div className="semi-circular-progress-bar m-3">
	// 		<svg width={radius * 3} height={radius * 2} viewBox={`0 0 ${radius * 2} ${radius}`}>
	// 			<circle
	// 				className="progress-background"
	// 				cx={radius}
	// 				cy={radius}
	// 				r={radius}
	// 				fill="transparent"
	// 				stroke="#ddd"
	// 				strokeWidth="20"
	// 			/>
	// 			<circle
	// 				className="progress-bar"
	// 				cx={radius}
	// 				cy={radius}
	// 				r={radius}
	// 				fill="transparent"
	// 				stroke="#007bff"
	// 				strokeWidth="10"
	// 				strokeDasharray={`${circumference} ${circumference}`}
	// 				strokeDashoffset={offset}
	// 				strokeLinecap="round"
	// 			/>
	// 		</svg>
	// 	</div>
	// );
	return (
		<div>
			{/* <div className="text-center">
				<h5 style={{ color: 'black' }}>Credit Score</h5>
			</div> */}
			<div>
				<Progress style={{
					height: '20px'
				}} animated color={progressColour} value={totalCreditScore !== undefined ? totalCreditScore : 0}  ><h5 className='mt-2' style={{ color: 'whitesmoke' }}>Credit Score - {totalCreditScore !== undefined ? totalCreditScore : 0} </h5></Progress>

			</div>
			<Row>
				<Col>
					<Card className="text-primary">
						<CardBody>
							<Row>
								<Col md="6">
									<Button color="btn btn-info btn-sm" size="sm">Maximum Loan Amount  {customerDetails && customerDetails.loanAmount ? customerDetails.loanAmount : ""}</Button>
								</Col>
								<Col md="6">
									{customerDetails && customerDetails.decision == "Eligible" && (
										<Button color="btn btn-success btn-sm" size="sm">{customerDetails && customerDetails.decision ? customerDetails.decision : ""}
										</Button>
									)}
									{customerDetails && customerDetails.decision == "Not Eligible" && (
										<Button color="btn btn-danger btn-sm" size="sm">{customerDetails && customerDetails.decision ? customerDetails.decision : ""}
										</Button>
									)}
								</Col>
							</Row>
						</CardBody>
					</Card>
				</Col>
			</Row>

			{/* <div className="text-muted d-flex">riskLevel</div>
			<div className="text-center">
				<h5 style={{ color: 'black' }}>Credit Score</h5>
			</div> */}
		</div>
	);
};
SummaryBar.propTypes = {
	product: PropTypes.string,
	appraisalId: PropTypes.string,
}
export default SummaryBar;