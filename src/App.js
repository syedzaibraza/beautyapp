import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home/Home";
import Category from "./pages/Categogory/Category";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import UserCart from "./pages/UserCart/UserCart";
import CheckOut from "./pages/CheckOut/CheckOut";
import ShowSingleProductCategory from "./pages/ShowSingleProductCategory/ShowSingleProductCategory";
import ThankyouPage from "./pages/ThnakyouPage/ThankyouPage";
import "react-toastify/dist/ReactToastify.css";

// file where all routes configured
function App() {
	// app routes path will be path of and element will be the the page render on path
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/home" element={<Home />} />
			<Route path="/category" element={<Category />} />
			<Route path="/sign-in" element={<SignIn />} />
			<Route path="/sign-up" element={<SignUp />} />
			<Route path="/product/:product_id" element={<ProductDetailPage />} />
			<Route path="/cart" element={<UserCart />} />
			<Route path="/check-out" element={<CheckOut />} />
			<Route
				path="/category-products/:category_id"
				element={<ShowSingleProductCategory />}
			/>
			<Route path={"/thank-you"} element={<ThankyouPage />} />
		</Routes>
	);
}

export default App;
