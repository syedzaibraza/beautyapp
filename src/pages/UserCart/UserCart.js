import React, { useState, useEffect } from "react";
import AppNavBar from "../../components/NavaBar/Navbar";
import { Trash2 } from "react-feather";
import { BASE_URL } from "../../Constants/AppConstants";
import { Link, useNavigate } from "react-router-dom";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import axios from "axios";
import {
  successToaster,
  errorToaster,
  warnToaster,
} from "../../components/Toasters/Toasters";
import { Circles } from "react-loader-spinner";

const UserCart = () => {
  const usequery = useQueryClient();

  const deleteProductCart = (productId) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      product_id: productId,
      user_id: userLogin[0].user_id,
    });

    fetch(`${BASE_URL}product_Cart/delete_cart.php`, {
      method: "DELETE",
      body: bodyContent,
      headers: headersList,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        fetchUserCart();
      });
  };
  const deleteCartMut = useMutation(deleteProductCart);

  const userLogin = JSON.parse(localStorage.getItem("user_info"));

  const { data, isLoading, isError } = useQuery(
    ["cart", userLogin[0].user_id],
    () => fetchUserCart(userLogin[0].user_id)
  );

  const cartCount = data?.fetchcart;

  let total = null;
  for (let i = 0; i < cartCount?.length; i++) {
    total += cartCount[i].product_price * cartCount[i].product_quantity;
    console.log(total);
  }
  const usercart = [];
  for (let i = 0; i < cartCount?.length; i++) {
    usercart.push({
      product_id: cartCount[i].product_id,
      product_quantity: cartCount[i].product_quantity,
      product_price: cartCount[i].product_price,
    });
  }
  const fetchUserCart = async (id) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify({
      user_id: id,
    });
    const res = await fetch(`${BASE_URL}product_Cart/show_cart.php`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    const result = await res.json();
    return result;
  };
  return (
    <div>
      <AppNavBar />
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          <Circles
            color="#00BFFF"
            size={100}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      ) : (
        <>
          {!cartCount?.length ? (
            <>
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                your cart is empty
              </h1>
            </>
          ) : (
            <div className="container mb-4">
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col"> </th>
                          <th scope="col">Product</th>
                          <th scope="col" className="text-center">
                            Quantity
                          </th>
                          <th scope="col" className="text-right">
                            Price
                          </th>
                          <th> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartCount?.map((data) => {
                          return (
                            <tr>
                              <Link to={`/product/${data.product_id}`}>
                                <td>
                                  <img
                                    alt="pro-img"
                                    width={100}
                                    height={100}
                                    src={data?.product_image}
                                    className="img-fluid rounded"
                                  />
                                </td>
                              </Link>
                              <td>{data.product_name}</td>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  value={data.product_quantity}
                                />
                              </td>
                              <td className="text-right">
                                {data.total_bill} $
                              </td>
                              <td className="text-right">
                                <button className="btn btn-sm btn-danger">
                                  <Trash2
                                    onClick={() => {
                                      deleteCartMut.mutate(data.product_id);
                                      usequery.invalidateQueries([
                                        "cart",
                                        userLogin[0].user_id,
                                      ]);
                                      warnToaster("Product Deleted");
                                    }}
                                  />
                                </button>
                              </td>
                            </tr>
                          );
                        })}

                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <strong>Total</strong>
                          </td>
                          <td className="text-right">
                            <strong>{total}$</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col mb-2">
                  <div className="row">
                    <div className="col-sm-12  col-md-10">
                      <Link to="/">
                        <button className="btn btn-block btn-light">
                          Continue Shopping
                        </button>
                      </Link>
                    </div>
                    <div className="col-sm-12 col-md-2 text-right">
                      <Link to="/thank-you">
                        <button className="btn btn-lg btn-block btn-success text-uppercase">
                          Checkout
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserCart;
