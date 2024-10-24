import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import useAuth from "../Context/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";


// Higher Order Component
const AuthorisedRoute = ({Component}) => {
  const {id} = useParams()
  const {user} = useAuth()

  const [post, setPost] = useState<any>(null)

  useEffect(() => {
    axios.get(`/api/posts/get/${id}`)
    .then(resp=> resp.data)
    .then(data=> {
        setPost(data)
    })
    .catch(console.log)
}, [id, user])
  
  if (post && post.author_username === user)
    return <Component post={post}/>
  return <h1>Not authorised to perform action!</h1>
};

AuthorisedRoute.propTypes = {
  Component: PropTypes.elementType,
};

export default AuthorisedRoute;
