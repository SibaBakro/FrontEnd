import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App';
import './index.css'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Home from './dashboard/home/Home';
import NotFound from './dashboard/notFound/NotFound';
import Category from './dashboard/category/Category';
import CreateCategory from './dashboard/category/CreateCategory';
import EditCategory from './dashboard/category/EditCategory';
import Product from './dashboard/product/Product';
import CreateProduct from './dashboard/product/CreateProduct';
import EditProduct from './dashboard/product/EditProduct';
import Order from './dashboard/order/Order';
import Execute from './dashboard/order/Execute';

import Invoice from './dashboard/invoice/Invoice';
import User from './dashboard/user/User';
import Profile from './dashboard/user/Profile';
import Calendar from './dashboard/calendar/Calendar';
import Bar from './dashboard/barChart/bar'
import Pie from './dashboard/pieChart/pie'


import Client from './Client'
import HomeClient from './client/HomeClient'
import CategoryClient from './client/CategoryClient'
import NotFoundClient from './client/NotFoundClient'
import CategoriesClient from './client/CategoriesClient'
import DetailsProduct from './client/DetailsProduct'
import Cart from './client/Cart'
import ProfileClient from './client/ProfileClient'
import Contact from './client/Contact'
import About from './client/About'
import Favorite from './client/Favorite';
// import Chat from "./client/Chat"
import SignIn from './client/SignIn'
import SignUp from './client/SignUp'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path='/' element={<Client />}>

        <Route index element={<HomeClient />} />
        <Route path="category" element={<CategoryClient />} />
        <Route path="category/:id" element={<CategoriesClient />} />
        <Route path="detailsProduct/:id" element={<DetailsProduct />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="profile" element={<ProfileClient />} />
        <Route path="cart" element={<Cart />} />
        <Route path="favorite" element={<Favorite />} />

        {/* <Route path="chat" element={<Chat />} /> */}
      </Route>

      <Route path="signIn" element={<SignIn />} />
      <Route path="signUp" element={<SignUp />} />

      <Route path="*" element={<NotFoundClient />} />

    
      <Route path="/dashboard" element={<App />}>
        <Route index element={<Home />} />
        <Route path="category" element={<Category />} />
        <Route path="createCategory" element={<CreateCategory />} />
        <Route path="editCategory/:id" element={<EditCategory />} />
        <Route path="user" element={<User />} />
        <Route path="product" element={<Product />} />
        <Route path="createProduct" element={<CreateProduct />} />
        <Route path="editProduct/:id" element={<EditProduct />} />


        <Route path="order" element={<Order />} />
        <Route path="execute/:id" element={<Execute />} />

        <Route path="invoice" element={<Invoice />} />

        <Route path="profile" element={<Profile />} />
        <Route path="calendar" element={<Calendar />} />

        <Route path="bar" element={<Bar />} />
        <Route path="pie" element={<Pie />} />

        <Route path="*" element={<NotFound />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
  

    </>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);