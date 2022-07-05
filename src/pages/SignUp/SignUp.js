import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import "./signIn.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants/AppConstants";
import { ToastContainer } from "react-toastify";
import { successToaster } from "../../components/Toasters/Toasters";
const SignUp = () => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobile_no, setMobile_no] = useState("");
	const [password, setPassword] = useState("");
	const [address, setAddress] = useState("");

	function handleSubmit(event) {
		event.preventDefault();
		let headersList = {
			Accept: "*/*",
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			user_firstname: firstName,
			user_lastname: lastName,
			user_email: email,
			user_mobileno: mobile_no,
			user_password: password,
			user_address: address,
		});

		fetch(`${BASE_URL}User_customer/signup.php`, {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				setFirstName("");
				setLastName("");
				setEmail("");
				setMobile_no("");
				setPassword("");
				setAddress("");
				if (data.success === true) {
					successToaster("User Created Successfully");
					navigate("/sign-in");
				}
			});
	}

	return (
		<div className="Login ">
			<div className="">
				<ToastContainer />
				<Form className=" opa px-4 py-4 " onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>First Name</Form.Label>
						<Form.Control
							required
							type="text"
							placeholder="First Name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							required
							type="text"
							placeholder="Last Name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>E-mail</Form.Label>
						<Form.Control
							required
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Mobile No#</Form.Label>
						<Form.Control
							required
							type="text"
							placeholder="Mobile No#"
							value={mobile_no}
							onChange={(e) => setMobile_no(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Your full Address</Form.Label>
						<Form.Control
							required
							type="text"
							placeholder="Address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							required
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<div className="d-flex justify-content-between">
						<div className="text-muted">
							If you have already register <Link to="/sign-in">Sign In</Link>
						</div>

						<div className="">
							<Button variant="primary" type="submit">
								Register
							</Button>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default SignUp;
