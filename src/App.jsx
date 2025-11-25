import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Notfound from './components/Notfound/Notfound'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Faqs from './components/Faqs/Faqs'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

let router = createBrowserRouter([
  {path: '', element: <Layout/> , children: [
    {index: true , element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path: 'login' , element:<Login/>},
    {path: 'register' , element:<Register/>},
    {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path :'products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'faqs' , element:<ProtectedRoute><Faqs/></ProtectedRoute>},
    {path:'*' , element:<Notfound/>}
  ]}
])
function App() {
  
  return (
    <>
       <UserContextProvider>
      <RouterProvider router={router}>
        
      </RouterProvider>
      </UserContextProvider>
    </>
  )
}

export default App
