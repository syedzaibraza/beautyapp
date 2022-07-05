import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../Constants/AppConstants'
import { useParams } from 'react-router-dom'
import AppNavBar from '../../components/NavaBar/Navbar'
import './ProductDetailsPage.css'
import { useNavigate } from 'react-router-dom'
import { Plus, Minus } from 'react-feather'
import {
  successToaster,
  errorToaster
} from '../../components/Toasters/Toasters'
import { Circles } from 'react-loader-spinner'
const ProductDetailPage = () => {
  const [productQty, setproductQty] = useState(1)
  const navigator = useNavigate()
  const { product_id } = useParams()
  const [product, setProduct] = useState([])
  const fetchProduct = async () => {
    let headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json'
    }
    let bodyContent = JSON.stringify({
      product_id: product_id
    })
    const response = await fetch(`${BASE_URL}product/show_single_product.php`, {
      method: 'POST',
      body: bodyContent,
      headers: headersList
    })
    const data = await response.json()
    setProduct(data?.fetchproduct[0])
  }
  const onAddToCart = () => {
    const userLogin = JSON.parse(localStorage.getItem('user_info'))

    if (userLogin) {
      let headersList = {
        Accept: '*/*',
        'Content-Type': 'application/json'
      }
      let bodyContent = JSON.stringify({
        product_id: product_id,
        user_id: userLogin[0].user_id,
        quantity: productQty
      })
      fetch(`${BASE_URL}product_Cart/generate_cart.php`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          console.log(data)
          // alert(data);
          if (data.success === true) {
            successToaster(`Product ${data.msg} to Cart`)
          } else {
            errorToaster('someThing went wrong')
          }

          // window.location.reload(false);
        })
    } else {
      navigator('/sign-in')
    }
  }
  useEffect(() => {
    fetchProduct()
  }, [])

  if (!product) return false
  function capitalizeFirstLetter(string) {
    const words = string?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    )
    return words
  }

  return (
    <>
      <AppNavBar />
      <div className='container'>
        <h1 className='h1 my-5'>
          {capitalizeFirstLetter(product.product_name)}
        </h1>
      </div>

      <div className='container bg- p-5 mb-5 product_container'>
        <div className='row'>
          <div className='col-md-6'>
            <img
              className='  img-fluid h-100 w-100 images_borders '
              src={product.product_image}
              alt=''
            />
          </div>
          <div className='col-md-6'>
            <h3>
              <div className='d-flex justify-content-between pb-2 '>
                <div>Price:</div>
                <div>
                  <span
                    className=''
                    style={{ fontSize: '20px', fontWeight: 'lighter' }}
                  >
                    ${product.product_price}
                  </span>
                </div>
              </div>
            </h3>

            <h3>
              <div className='d-flex justify-content-between py-2'>
                <div>Quantity:</div>
                <div>
                  <div class='input-group  '>
                    <button
                      disabled={productQty <= 1}
                      onClick={() => {
                        setproductQty(productQty - 1)
                      }}
                      class='input-group-text'
                    >
                      <Minus />
                    </button>
                    <input
                      type='text'
                      class='form-control'
                      defaultValue={1}
                      value={productQty}
                    />

                    <button
                      disabled={productQty == product.product_quantity}
                      onClick={() => {
                        setproductQty(productQty + 1)
                      }}
                      class='input-group-text'
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
              </div>
            </h3>
            <h3>
              <div className='d-flex justify-content-between py-2'>
                <div>
                  {' '}
                  <h3>Used For:</h3>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 'lighter' }}>
                  {product.product_usefor}
                </div>
              </div>
            </h3>
            <h3>Description:</h3>
            <span>{product.product_description}</span>
            <div>
              <div class=' d-flex justify-content-center mt-3'>
                <button
                  disabled={product.product_quantity == 0}
                  onClick={() => onAddToCart()}
                  class='btn btn-lg  button-dark_product '
                  type='button'
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetailPage
