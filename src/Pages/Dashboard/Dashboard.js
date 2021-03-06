import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import logo from '../../images/logo.png';
import AddReview from './AddReview/AddReview';
import AddProduct from './Admin/AddProduct/AddProduct';
import AdminRoute from './Admin/AdminRoute/AdminRoute';
import ManageAllOrders from './Admin/ManageAllOrders/ManageAllOrders';
import ManageProducts from './Admin/ManageProducts/ManageProducts';
import './Dashboard.css';
import MakeAdmin from './MakeAdmin/MakeAdmin';
import MyOrders from './MyOrders/MyOrders';
import Pay from './Pay/Pay';
const Dashboard = () => {
    let { path, url } = useRouteMatch();
    const { logOut, admin } = useAuth();
    const [mobileMenu, setMobileMenu] = useState(true);
    const handleMobileButton = () => {
        setMobileMenu(!mobileMenu);
    }
    return (
        <div className="relative min-h-screen md:flex">

            <div className="bg-black text-gray-100 flex justify-between md:hidden">
                <a href="#" className="block p-4 text-white font-bold"><img style={{ width: '100px' }} src={logo} /></a>

                <button onClick={handleMobileButton} className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <div className={`sidebar bg-black text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${mobileMenu ? '-translate-x-full' : ''} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>

                <Link to="/" className="text-white flex items-center space-x-2 px-4">
                    <img src={logo} />
                </Link>

                <nav>
                    {!admin && <div>
                        <Link to={`${url}/pay`} className="sidebar-nav block py-2.5 px-4 rounded transition duration-200 hover:text-white">
                            Pay
                        </Link>
                        <Link to={`${url}/myOrders`} className="sidebar-nav block py-2.5 px-4 rounded transition duration-200 hover:text-white">
                            My Orders
                        </Link>
                        <Link to={`${url}/addReview`} className="sidebar-nav block py-2.5 px-4 rounded transition duration-200 hover:text-white">
                            Add Review
                        </Link>
                    </div>
                    }

                    {admin && <div>
                        <Link to={`${url}/manageOrders`} className="sidebar-nav block py-2.5 px-4 rounded transition duration-200 hover:text-white">
                            Manage All Orders
                        </Link>
                        <Link to={`${url}/addProduct`} className="sidebar-nav block py-2.5 px-4 rounded transition duration-200 hover:text-white">
                            Add a Product
                        </Link>
                        <Link to={`${url}/makeAdmin`} className="sidebar-nav block py-2.5 px-4 rounded transition duration-200 hover:text-white">
                            Make Admin
                        </Link>
                        <Link to={`${url}/manageProduct`} className="sidebar-nav block py-2.5 px-4 rounded transition duration-200 hover:text-white">
                            Manage Products
                        </Link>

                    </div>}

                    <button onClick={logOut} className="sidebar-nav w-full text-left block py-2.5 px-4 rounded transition duration-200 hover:text-white">
                        Logout
                    </button>
                </nav>
            </div>

            <div className="flex-1 p-10 text-2xl font-bold">
                <Switch>
                    <Route exact path={path}>
                        {!admin && <MyOrders></MyOrders>}
                        {admin && <ManageAllOrders />}
                    </Route>
                    <Route path={`${path}/myOrders`}>
                        <MyOrders></MyOrders>
                    </Route>
                    <Route path={`${path}/pay`}>
                        <Pay></Pay>
                    </Route>
                    <Route path={`${path}/addReview`}>
                        <AddReview></AddReview>
                    </Route>
                    <AdminRoute path={`${path}/manageOrders`}>
                        <ManageAllOrders></ManageAllOrders>
                    </AdminRoute>

                    <AdminRoute path={`${path}/addProduct`}>
                        <AddProduct></AddProduct>
                    </AdminRoute>
                    <AdminRoute path={`${path}/manageProduct`}>
                        <ManageProducts></ManageProducts>
                    </AdminRoute>

                    <AdminRoute path={`${path}/makeAdmin`}>
                        <MakeAdmin></MakeAdmin>
                    </AdminRoute>
                </Switch>
            </div>

        </div>
    );
};

export default Dashboard;