import './App.css';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

import Products from "./pages/Products";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import ProductUpdate from "./pages/ProductUpdate";

function App() {
  const history = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post('https://lengtith.onrender.com/api/auth/logout', {
        withCredentials: true,
      });

      if (res.status === 200) {
        return history("/login");
      }
    } catch (error) {
      return new Error("Unable TO Logout. Please try again");
    }
  };

  return (
    <div className="App">
      <div className="flex items-center justify-between bg-gray-300 p-5">
        <div className="flex gap-4">
          <Link to='/'>Welcome</Link>
          <Link to='/products'>Products</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to='/login'>Login</Link>
          <button className="px-3 py-2 rounded-lg bg-red-600 text-white" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <Routes>
        <Route index path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductUpdate />} />
      </Routes>

    </div>
  );
}

export default App;
