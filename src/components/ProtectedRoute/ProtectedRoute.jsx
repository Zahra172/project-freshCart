import React from 'react'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute(props) {
    // let navigate = useNavigate();
    if(localStorage.getItem("userToken") !== null){
        return props.children
    }else{
    return <Navigate to='/login'/> // to return component 
    }
 
}
