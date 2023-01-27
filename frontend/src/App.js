import {
  BrowserRouter,
  Routes,
  Route 
} from 'react-router-dom'

import Home from './pages/Home';
import Register from './pages/Register';
// import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} path='/' />
        <Route element={<Register />} path='/register' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
