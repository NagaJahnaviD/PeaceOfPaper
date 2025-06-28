import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.jsx'
import { useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import FAQ from './components/FAQ.jsx'
import Profile from './components/Profile.jsx'
import Home from './components/Home.jsx'
import Meditate from './components/Meditate.jsx'
import RootLayout from './components/RootLayout.jsx'
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import Journal from './components/Journal.jsx';

const browserRouterObj=createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"signin",
        element:<Signin/>
      },
      {
        path:"signup",
        element:<Signup/>
      },
    
      {
        path:"profile",
        element:<Profile/>,
      },{
        path:"journal",
        element:<Journal/>,
      },
      {
        path:"meditate",
        element:<Meditate/>,
      },
      {
        path:"faq",
        element:<FAQ/>,
      },

]
}
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={browserRouterObj}/>
  </StrictMode>,
)
