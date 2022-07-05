import React, { useState, useEffect } from "react";
import Crousel from "../../components/Crousel/Crousel";
import AppNavBar from "../../components/NavaBar/Navbar";
import ProductCard from "../../components/ProductCard/ProductCard";
import { CROUSEL_DATA, BASE_URL } from "../../Constants/AppConstants";
import "./Landingpage.css";
import MyModal from "../../components/Modal/Modal";
import { useNavigate, useParams } from "react-router-dom";
import {
	successToaster,
	errorToaster,
} from "../../components/Toasters/Toasters";
import { Circles } from "react-loader-spinner";
import { useQueryClient } from "react-query";
export default function LandingPage() {
	const navigator = useNavigate();
	const queryclient = useQueryClient();
	const { success } = useParams();
	// console.log(success);

	const [showAdvisorModal, setShowAdvisiorModal] = useState(true);
	const toggleAdvisiorModal = () => {
		setShowAdvisiorModal(!showAdvisorModal);
	};
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		getProductCard();
	}, []);

	const getProductCard = async () => {
		let headersList = {
			Accept: "*/*",
			"User-Agent": "Thunder Client (https://www.thunderclient.com)",
		};
		setLoading(true);
		const res = await fetch(`${BASE_URL}product/Show_product.php `, {
			method: "GET",
			headers: headersList,
		});
		const data = await res.json();

		if (data?.fetchproduct) {
			setProducts(data?.fetchproduct);
		}
		setLoading(false);
	};

	// console.log(products)
	return (
		<div className="page-container">
			<MyModal open={showAdvisorModal} closeModal={toggleAdvisiorModal} />
			<>
				<AppNavBar />
			</>

			<div className="body">
				<Crousel crouselData={CROUSEL_DATA} />
				<h6 className="list-heading"> Shop Your Favourite Product Here </h6>
				{loading ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							margin: "100px",
						}}
					>
						<Circles
							color="#00BFFF"
							size={100}
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						/>
					</div>
				) : (
					<div className="product-list">
						{products.map((product, index) => {
							return (
								<div>
									<ProductCard
										img={product.product_image}
										key={index}
										AddToCart={() => {
											const userLogin = JSON.parse(
												localStorage.getItem("user_info")
											);
											if (userLogin) {
												let headersList = {
													Accept: "*/*",
													"Content-Type": "application/json",
												};
												let bodyContent = JSON.stringify({
													product_id: product.product_id,
													user_id: userLogin[0].user_id,
													quantity: 1,
												});
												fetch(`${BASE_URL}product_Cart/generate_cart.php`, {
													method: "POST",
													body: bodyContent,
													headers: headersList,
												})
													.then(function (response) {
														return response.json();
													})
													.then(function (data) {
														console.log(data);
														// alert(data);
														queryclient.invalidateQueries("cart");

														if (data.success === true) {
															successToaster(`Product ${data.msg} to Cart`);
														} else {
															errorToaster("someThing went wrong");
														}
													});
											} else {
												navigator("/sign-in");
											}
										}}
										onClick={() => {
											navigator(`/product/${product.product_id}`);
										}}
									/>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
