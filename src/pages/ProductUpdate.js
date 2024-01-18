import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

const ProductUpdate = () => {
  const [cookies] = useCookies(["user"]);
  const [userInfo, setUserInfo] = useState({})
  const [user, setUser] = useState({})

  useEffect(() => {

    const getUser = async () => {
      try {
        const res = await axios
          .get("https://lengtith.onrender.com/api/users/user", {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': cookies.user,
            }
          });
        setUser(res.name)
      } catch (error) {
        console.log(error);
      }
    }

    const getUserinfo = async () => {
      try {
        const res = await axios
          .get("https://lengtith.onrender.com/api/users/info", {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': cookies.user,
            }
          })
        setUserInfo(res.intro)
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
    getUserinfo();
  }, [cookies])


  return (
    <div>
      {user}
      {userInfo}
    </div>
  )
}

export default ProductUpdate