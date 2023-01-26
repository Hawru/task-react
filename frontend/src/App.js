import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FormLogin from './components/FormLogin';
import FormSignUp from './components/FormSignUp';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<FormLogin />} />
            <Route exact path='/signup' element={<FormSignUp />} />
        </Routes>
    </div>
  );
}

export default App;
