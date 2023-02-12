import {
  Routes,
  Route 
} from 'react-router-dom'

import Home from './pages/Home';
import Register from './pages/Register';
import AuthenticationGuard from './components/AuthenticationGuard';
import ParticipantList from './pages/ParticipantList';
import './App.css';
import Callback from './pages/Callback';
import Registration from './pages/Registration';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} path='/' />
      <Route element={<Register />} path='/register' />
      <Route element={<Callback />} path='/callback' />
      <Route element={<AuthenticationGuard component={ParticipantList} />} path='/participants' />
      <Route element={<Registration />} path='/register/view' />
    </Routes>
  );
}

export default App;
