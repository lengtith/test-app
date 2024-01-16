import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="flex items-center justify-between bg-gray-300 p-5 mb-5">
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
    </div>
  );
}

export default App;
