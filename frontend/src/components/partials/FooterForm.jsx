import React from 'react'
import '../../css/partials/FooterForm.css'

function FooterForm() {
  return (
    <footer className="FooterForm bg-footerForm fixed-bottom">
          <div className='container'>
            <div className="row d-flex justify-content-between align-items-center py-2">
                <h4 className='col-md-12'>@A small Project with MERN</h4>
                <div className='col-md-4'>
                    <h6 className='me-1'>Julian Valencia</h6>
                    <a target="_blank" rel="noreferrer" href="https://github.com/Hawru">Github</a>
                </div>
                <div className="col-md-4">
                    <h6 className='me-1'>Yuri Marcela</h6>
                    <a target="_blank" rel="noreferrer" href="https://github.com/marceladato">Github</a>
                </div>
            </div>
        </div>
      </footer>
  )
}

export default FooterForm