import {
  Routes,
  Route 
} from 'react-router-dom'

import Home from './pages/Home';
import Register from './pages/Register';
import './App.css';
import CallbackPage from './pages/CallbackPage';
import AuthenticationGuard from './components/AuthenticationGuard';
import ParticipantList from './pages/ParticipantList';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} path='/' />
      <Route element={<Register />} path='/register' />
      <Route element={<CallbackPage />} path='/callback' />
      <Route element={<AuthenticationGuard component={ParticipantList} />} path='/participants' />
    </Routes>
  );
}

export default App;
