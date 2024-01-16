import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';

import Products from "./pages/Products";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import ProductUpdate from "./pages/ProductUpdate";

function App() {
  return (
    <div className="App">
      <div className="flex items-center justify-between bg-gray-300 p-5">
        <div className="flex gap-4">
          <Link to='/'>Welcome</Link>
          <Link to='/products'>Products</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to='/'>Login</Link>
          <button className="px-3 py-2 rounded-lg bg-red-600 text-white">Logout</button>
        </div>
      </div>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

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
