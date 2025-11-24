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

let router = createBrowserRouter([
  {path: '', element: <Layout/> , children: [
    {index: true , element:<Home/>},
    {path: 'login' , element:<Login/>},
    {path: 'register' , element:<Register/>},
    {path:'cart' , element:<Cart/>},
    {path :'products' , element:<Products/>},
    {path:'categories' , element:<Categories/>},
    {path:'brands' , element:<Brands/>},
    {path:'faqs' , element:<Faqs/>},
    {path:'*' , element:<Notfound/>}
  ]}
])
function App() {
  
  return (
    <>
    
      <RouterProvider router={router}>
        
      </RouterProvider>
    </>
  )
}

export default App
