import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './signIn.css'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../Constants/AppConstants'
import { useNavigate } from 'react-router-dom'
import {
  errorToaster,
  successToaster
} from '../../components/Toasters/Toasters'
import { ToastContainer } from 'react-toastify'
export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    let headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json'
    }

    let bodyContent = JSON.stringify({
      user_email: email,
      user_password: password
    })

    fetch(`${BASE_URL}User_customer/login.php`, {
      method: 'POST',
      body: bodyContent,
      headers: headersList
    })
      .then(function (response) {
        return response.text()
      })
      .then(function (data) {
        console.log(data)
        const parsedData = JSON.parse(data)
        console.log(parsedData.success)

        if (parsedData.success === true) {
          localStorage.setItem(
            'user_info',
            JSON.stringify(parsedData.fetchuser)
          )
          successToaster('Login Successfully')
          navigate('/')
        } else {
          errorToaster('Invalid Credentials')
        }
      })
  }

  return (
    <div className='Login '>
      <ToastContainer />
      <div className=''>
        <Form className=' opa px-4 py-4 ' onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className='d-flex justify-content-between'>
            <div className='text-muted'>
              register if you don't have an account{' '}
              <Link to='/sign-up'>Sign Up</Link>
            </div>

            <div className=''>
              <Button variant='primary' type='submit'>
                Login
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
