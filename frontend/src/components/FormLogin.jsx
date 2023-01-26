import React from 'react'
import HeaderForm from './partials/HeaderForm'
import FooterForm from './partials/FooterForm'
import '../css/FormLogin.css'
import { Link } from 'react-router-dom'

function FormLogin() {
  return (
    <div className='FormLogin bg-formLogin'>
        <HeaderForm/>
        <div className="container">
          <div className='row justify-content-center'>
            <form action="" method='POST' encType='multipart/form-data' className='col-lg-4 d-flex justify-content-center bg-contFormLogin p-3 rounded row'>
              <h6 className='col-12'>Log In to your account</h6>
              <div className="mb-3 col-12 text-start">
                <label htmlFor="username" className="form-label">Username </label>
                <input type="text" className="form-control" id="username" required/>
              </div>
              <div className="mb-3 col-12 text-start">
                <label htmlFor="password" className="form-label">Password </label>
                <input type="password" className="form-control" id="password" required/>
              </div>
              <div className="mb-3 col-12 text-start">
                <button className='btn btn-login col-12'>Log In</button>
              </div>
              <div className='col-12 newAccLogin'>
                  <h6>New to Tasky?</h6>
                  <Link to="singup">
                    Sign Up
                  </Link>
              </div>
            </form>
          </div>
        </div>
        <FooterForm/>
    </div>
  )
}

export default FormLogin