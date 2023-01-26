import React from 'react'
import HeaderForm from './partials/HeaderForm'
import FooterForm from './partials/FooterForm'
import '../css/FormSignUp.css'
import { Link } from 'react-router-dom'

function FormSignUp() {
  return (
    <div className='FormSignUp bg-formSignUp'>
        <HeaderForm/>
        <div className="container">
          <div className='row justify-content-center'>
            <form action="" method='POST' encType='multipart/form-data' className='col-lg-4 d-flex justify-content-center bg-contFormSignUp p-3 rounded row'>
              <h6 className='col-12'>Create your account</h6>
              <div className="mb-3 col-12 text-start py-2">
                <label htmlFor="firstName" className="form-label">First Name <span className='required'>*</span></label>
                <input type="text" className="form-control" id="firstName" required/>
              </div>
              <div className="mb-3 col-12 text-start">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" required/>
              </div>
              <div className="mb-3 col-12 text-start">
                <label htmlFor="email" className="form-label">Email <span className='required'>*</span></label>
                <input type="email" className="form-control" id="email" required/>
              </div>
              <div className="mb-3 col-12 text-start">
                <label htmlFor="username" className="form-label">Username <span className='required'>*</span></label>
                <input type="text" className="form-control" id="username" required/>
              </div>
              <div className="mb-3 col-12 text-start">
                <label htmlFor="password" className="form-label">Password <span className='required'>*</span></label>
                <input type="password" className="form-control" id="password" required/>
              </div>
              <div className="mb-3 col-12 text-start">
                <label htmlFor="accountImage" className="form-label">Profile Image</label>
                <input className="form-control" type="file" id="accountImage"/>
              </div>
              <div className="mb-3 col-12 text-start">
                <label htmlFor="birthDate" className="form-label">Birth Date</label>
                <input className="form-control" type="date" id="birthDate"/>
              </div>
              <div className="mb-3 col-12 text-start">
                <button className='btn btn-login col-12'>Sign Up</button>
              </div>
              <div className='col-12 newAccLogin'>
                  <h6>Already have an account?</h6>
                  <Link to="login">
                    Log In
                  </Link>
              </div>
            </form>
          </div>
        </div>
        <FooterForm/>
    </div>
  )
}

export default FormSignUp