import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import AdminPanel from './pages/AdminPanel.jsx';
import ErrorElement from './components/ErrorElement/ErrorElement.jsx';
import AddMeds from './components/Meds/AddMeds.jsx';
import Employees from './pages/RenderTables/Employees.jsx'
import UpdateMeds from './components/Meds/UpdateMeds.jsx';
import DropMeds from './components/Meds/DropMeds.jsx';
import UpdateEmployee from './components/Employees/UpdateEmployee.jsx'
import DropEmployee from './components/Employees/DropEmployee.jsx';
import UpdateUser from './components/Users/UpdateUser.jsx';
import DropUser from './components/Users/DropUser.jsx';
import AddUser from './components/Users/AddUser.jsx';
import UpdateOrders from './components/Orders/UpdateOrders.jsx';
import AddOrders from './components/Orders/AddOrders.jsx';
import DropOrders from './components/Orders/DropOrders.jsx';
import UpdateDelivery from './components/Delivery/UpdateDelivery.jsx';
import Catalog from './pages/RenderTables/Catalog.jsx';
import Login from './pages/login.jsx';
import CustomerList from './pages/RenderTables/CustomerList.jsx';
import DeliveryList from './pages/RenderTables/DeliveryList.jsx';
import OrderList from './pages/RenderTables/OrderList.jsx';
import DetailList from './pages/RenderTables/DetailList.jsx';
import UpdateOrderDetail from './components/Order_Details/UpdateOrderDetail.jsx';
import DropOrderDetail from './components/Order_Details/DropOrders.jsx';
import AddOrdersDetail from './components/Order_Details/AddOrdersDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Catalog />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/admin",
    element: <AdminPanel/>,
    errorElement: <ErrorElement />,
  },
  {
    path: "/employee",
    element: <Employees/>,
    errorElement: <ErrorElement />,
  },
  {
    path: "/employee/delivery",
    element: <DeliveryList/>,
    errorElement: <ErrorElement />,
  },
  {
    path: "/employee/delivery/edit/:deliveryId",
    element: <UpdateDelivery/>,
    errorElement: <ErrorElement />,
  },
  {
    path: "/employee/delivery/delete/:deliveryId",
    element: <UpdateDelivery/>,
    errorElement: <ErrorElement />,
  },
  {
    path: "/employee/users/orders",
    element: <OrderList/>,
    errorElement: <ErrorElement />,
  },
  {
    path: "/employee/users/orders/add",
    element: <AddOrders/>,
    errorElement: <ErrorElement />,
  },
  {
    path: "/employee/users/orders/edit/:orderId",
    element: <UpdateOrders/>,
    errorElement: <ErrorElement />,
  },
  {
    path: "/employee/users/orders/delete/:orderId",
    element: <DropOrders/>,
    errorElement: <ErrorElement />,
  },
  {
    path: "/employee/users",
    element: <CustomerList/>,
    errorElement: <ErrorElement />,
  },
  {
    path: "/employee/users/add",
    element: <AddUser/>,
    errorElement: <ErrorElement />,
  },
  {
    path: "/employee/users/edit/:userId",
    element: <UpdateUser/>,
    errorElement: <ErrorElement />,
  },
  {
    path: "/employee/users/delete/:userId",
    element: <DropUser/>,
    errorElement: <ErrorElement />,
  },
  {
    path: "/employee/edit/:empId",
    element: <UpdateEmployee/>,
    errorElement: <ErrorElement />,
  },
  {
    path: "/employee/delete/:empId",
    element: <DropEmployee/>,
    errorElement: <ErrorElement />,
  },
  {
    path: "employee/catalog/edit/:catalogId",
    element: <UpdateMeds/>,
    errorElement: <ErrorElement/>
  },
  {
    path: "employee/catalog/delete/:catalogId",
    element: <DropMeds/>,
    errorElement: <ErrorElement/>
  },
  {
    path: "employee/catalog/add/",
    element: <AddMeds/>,
    errorElement: <ErrorElement/>
  },
  {
    path: "employee/details",
    element: <DetailList/>,
    errorElement: <ErrorElement />
  },
  {
    path: "employee/details/add",
    element: <AddOrdersDetail/>,
    errorElement: <ErrorElement />
  },
  {
    path: "employee/details/edit/:detailId",
    element: <UpdateOrderDetail/>,
    errorElement: <ErrorElement />
  },
  {
    path: "employee/details/delete/:detailId",
    element: <DropOrderDetail/>,
    errorElement: <ErrorElement />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
