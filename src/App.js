import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthContext } from './context/AuthContext.js';
import Home from "./pages/home/Home.jsx";
import Hotel from "./pages/hotel/Hotel.jsx";
import List from "./pages/list/List.jsx";
import Login from './pages/login/Login.jsx';
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import {Navigate} from 'react-router-dom'

function App() {
  const ProtectedRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    // const navigate = useNavigate();
    if(!user){
      return <Navigate to='/login'/>
    }
    return children;
  }
  return (
    <div>
      <Router>
        <Routes>
          <Route index path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
          } />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
