import React, { useState, useEffect } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import './NavBar.css'
import { LogOut, ShoppingCart, Home, LogIn, UserPlus } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../Constants/AppConstants'
import { useQuery } from 'react-query'
import { ToastContainer } from 'react-toastify'
import { successToaster } from '../Toasters/Toasters'
// app navbar to navigate on differnet pages
export default function AppNavBar() {
  const fetchUserCart = async (id) => {
    let headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json'
    }

    let bodyContent = JSON.stringify({
      user_id: id
    })

    const res = await fetch(`${BASE_URL}product_Cart/show_cart.php`, {
      method: 'POST',
      body: bodyContent,
      headers: headersList
    })
    const result = await res.json()
    return result
  }
  let userLogin = JSON.parse(localStorage.getItem('user_info'))
  if (!userLogin) {
    userLogin = []
  }
  const { data, isLoading } = useQuery(['cart', userLogin[0]?.user_id], () =>
    fetchUserCart(userLogin[0]?.user_id)
  )

  const [cartCount, setCartCount] = useState([])
  const [topCategory, setTopCategory] = useState([])

  // useEffect(() => {
  // 	fetchUserCart();
  // }, []);

  const navigate = useNavigate()
  const [user, setuser] = useState([])
  useEffect(() => {
    const auth = localStorage.getItem('user_info')
    const parseddata = JSON.parse(auth)

    if (auth) {
      // navigate('/sign-in')
      setuser(parseddata[0])
    }
    // else {
    //   setuser(parseddata[0])
    // }

    //
  }, [])
  useEffect(() => {
    fetchTopCategory()
    // successToaster("Cart Updated");
  }, [])
  const fetchTopCategory = () => {
    let headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json'
    }

    fetch(`${BASE_URL}category/category_list.php`, {
      method: 'GET',
      headers: headersList
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        // console.log(data);
        setTopCategory(data.fetchcategory)
      })
  }

  return (
    // using third parthy library react-bootstap navbar component to design our navbar
    <Navbar className='nav'>
      <Container>
        <ToastContainer />
        <Navbar.Brand href='/'>
          <h3 className='text-light'>BeautyShop</h3>
        </Navbar.Brand>

        <Nav className='text-light'>
          <NavDropdown
            title={'Categories'}
            id='basic-nav-dropdown'
            className='text-light'
            variant='light'
          >
            {topCategory.map((data) => {
              return (
                <NavDropdown.Item
                  href={`/category-products/${data.category_id}`}
                >
                  {data.category_name}
                </NavDropdown.Item>
              )
            })}
          </NavDropdown>

          <Nav.Link className='text-light' href='/'>
            <Home className='p-1' size={25} />
            Home
          </Nav.Link>

          <Nav.Link className='text-light' href={'/cart'}>
            {userLogin.length > 0 ? (
              <>
                <ShoppingCart className='p-1' size={25} />
                Carts <sup>{data?.fetchcart?.length}</sup>
              </>
            ) : (
              ''
            )}
          </Nav.Link>

          {userLogin.length === 0 && (
            <Nav.Link className='text-light' href='/sign-up'>
              <UserPlus className='p-1' size={25} />
              Sign Up
            </Nav.Link>
          )}

          {!user.user_firstname ? (
            <Nav.Link className='text-light' href='/sign-in'>
              <LogIn className='p-1' size={25} />
              Sign In
            </Nav.Link>
          ) : (
            <>
              <Nav.Link className='text-light'>{user.user_firstname}</Nav.Link>

              <Nav.Link className='text-light' href='/sign-in'>
                <LogOut
                  onClick={() => {
                    localStorage.removeItem('user_info')
                    navigate('/sign-in')
                  }}
                />
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}
