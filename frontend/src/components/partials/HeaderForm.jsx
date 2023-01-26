import React from 'react'
import '../../css/partials/HeaderForm.css'
import { Link } from 'react-router-dom'
import taskLogo2 from '../../img/taskLogo2.png'

function HeaderForm() {
  return (
    <header className="HeaderForm bg-headerForm">
        <div className='container text-center py-5'>
            <div className="row d-flex justify-content-center align-items-center py-2">          
                  <div className='col-md-4'>
                      <Link to="/">
                        <h3 className='logo-headerForm'><img src={taskLogo2} alt=""/>Tasky</h3>
                      </Link>
                  </div>
            </div>
        </div>
      </header>
  )
}

export default HeaderForm