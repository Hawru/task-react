import '../css/Home.css'
import Header from './partials/Header'
import Footer from './partials/Footer'

function Home() {
    return (
      <div className="Home bg-home">
          <Header/>
          <div className='container py-5'>
            <h1>Tasky</h1>
          </div>
          <Footer/>
      </div>
    );
  }
  
  export default Home;