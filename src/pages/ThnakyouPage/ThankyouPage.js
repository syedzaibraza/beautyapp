import React from "react";

const ThankyouPage = () => {
	return (
		<div className="mt-5 pt-5 py-5">
			<div class=" text-center">
				<h1 class="display-3">Thank You!</h1>
				<p class="lead">
					<strong>Order has been created successfully</strong> and will be
					delivered 2 to 3 working days
				</p>
				<hr />

				<p class="lead">
					<a class="btn btn-primary btn-sm" href="/" role="button">
						Continue to homepage
					</a>
				</p>
			</div>
		</div>
	);
};

export default ThankyouPage;
