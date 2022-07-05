import React, { useState, useEffect } from 'react'
import AppNavBar from '../../components/NavaBar/Navbar'
import { useParams, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../Constants/AppConstants'
import ProductCard from '../../components/ProductCard/ProductCard'
import {
  successToaster,
  errorToaster
} from '../../components/Toasters/Toasters'
import { Circles } from 'react-loader-spinner'
import { useQueryClient } from 'react-query'
import query from 'express/lib/middleware/query'
const ShowSingleProductCategory = () => {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { category_id } = useParams()
  const navigator = useNavigate()

  useEffect(() => {
    let headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json'
    }

    let bodyContent = JSON.stringify({
      category_id: category_id
    })
    const fetchData = async () => {
      setLoading(true)
      const result = await fetch(
        `${BASE_URL}product/select_category_product.php`,
        {
          method: 'POST',
          headers: headersList,
          body: bodyContent
        }
      )
      const data = await result.json()

      if (data?.fetchproduct) {
        setProduct(data?.fetchproduct)
      }
      setLoading(false)
    }
    fetchData()
  }, [])
  console.log(product)
  const queryclient = useQueryClient()
  return (
    <div>
      <AppNavBar />
      {loading ? (
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Circles
            color='#00BFFF'
            size={100}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
        </div>
      ) : (
        <div className='container'>
          <div className='row'>
            {product?.length === 0 ? (
              <h4 className='mt-5'>No Product found for Category</h4>
            ) : (
              product?.map((product, index) => {
                return (
                  <div className='col-sm-6 col-md-4 col-lg-3'>
                    <div className='product-list'>
                      <ProductCard
                        img={product.product_image}
                        key={index}
                        AddToCart={() => {
                          const userLogin = JSON.parse(
                            localStorage.getItem('user_info')
                          )
                          if (userLogin) {
                            let headersList = {
                              Accept: '*/*',
                              'Content-Type': 'application/json'
                            }
                            let bodyContent = JSON.stringify({
                              product_id: product.product_id,
                              user_id: userLogin[0].user_id,
                              quantity: 1
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
                                queryclient.invalidateQueries('cart')
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
                        }}
                        onClick={() => {
                          navigator(`/product/${product.product_id}`)
                        }}
                      />
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default ShowSingleProductCategory
