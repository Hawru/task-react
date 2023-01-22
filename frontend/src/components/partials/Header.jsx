import '../../css/Header.css';
import taskLogo2 from '../../img/taskLogo2.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
      <header className="Header bg-header">
        <div className='container'>
            <div className="row d-flex justify-content-between align-items-center py-2">          
                  <div className='col-md-4'>
                      <Link to="/">
                        <h3 className='logo'><img src={taskLogo2} alt=""/>Taski</h3>
                      </Link>
                  </div>
                <div className="col-md-4">
                    <button type='button' className='btn me-2 log-InBtn'>Log In</button>
                    <button type='button' className='btn sign-InBtn'>Sign In</button>
                </div>
            </div>
        </div>
      </header>
    );
  }
  
  export default Header;