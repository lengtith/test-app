import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

const Login = () => {
  const history = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  const [auth, setAuth] = useState({
    username: "",
    password: "",

  })
  const handleAuth = (event) => {
    const { name, value } = event.target;
    setAuth({ ...auth, [name]: value });
  };
  const handleLogin = async () => {
    try {
      const res = await axios.post('https://lengtith.onrender.com/api/auth/login', { ...auth });
      const data = await res.data;
      setCookie("user", data.token, {
        path: "/", 
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        sameSite: 'none'
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin().then(() => history("/"));
  }
  return (
    <div>
      <div className='bg-white p-5 rounded-lg shadow-lg'>
        <h3>Login</h3>
        <form action="" onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2.5'>
            <input className='border' type="text" name="username" id="" value={auth.username} onChange={handleAuth} />
            <input className='border' type="text" name="password" id="" value={auth.password} onChange={handleAuth} />
            <button type='submit'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login