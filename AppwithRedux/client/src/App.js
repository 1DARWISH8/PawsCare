import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Router is imported from react-router-dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// individual components are imported from their file locations
import Rootlayout from './Rootlayout';
import Home from './components/Home';
import Store from './components/Store';
import GetStarted from './components/GetStarted';
import Register from './components/Register';
import Login from './components/Login';
import Contact from './components/Contact';
import Profile from './components/Profile';
import Appointment from './components/Appointment';
import Appointsuccess from './components/Appointsuccess';
import Healthcard from './components/Healthcard';
import Food from './components/Food';
import Treats from './components/Treats';
import Toys from './components/Toys';
import Essentials from './components/Essentials';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Checkappointment from './components/admin/Checkappointments';
import Manageusers from './components/admin/Manageusers';
import Managestore from './components/admin/Managestore'
import Bookappointment from './components/Bookappointment';
import Addproducts from './components/admin/Addproducts';
import Editproduct from './components/admin/Editproduct';
import Deletedproduct from './components/admin/Deletedproduct';
import Bookuserappointment from './components/admin/Bookuserappointment';


function App() {
  // browserRouter variable is created which contains all the paths and its components
  let browserRouter= createBrowserRouter([
    {
      path:'',
      // component is defined to the element that is to be rendered
      element:<Rootlayout/>,
      // Rootlayout contains children of components
      children:[
        {
          path:'',
          element:<Home/>,
          children:[
            {
              path:'/home/healthcard',
              element:<Healthcard/>
            }
          ]
        },
        {
          path:'/home',
          element:<Home/>
        },
        {
          path:'store',
          element:<Store/>,
          children:[
            {
              path:'/store/food',
              element:<Food/>
            },
            {
              path:'/store/treats',
              element:<Treats/>
            },
            {
              path:'/store/toys',
              element:<Toys/>
            },
            {
              path:'/store/essentials',
              element:<Essentials/>
            }
          ]
        },
        {
          path:"/cart",
          element:<Cart/>
        },
        {
          path:'/store/checkout',
          element:<Checkout/>
        },
        {
          path:'/getstarted',
          element:<GetStarted/>,
        },
        {
          path:'getstarted/register',
          element:<Register/>
        },
        {
          path:'getstarted/login',
          element:<Login/>
        },
        {
          path:'contact',
          element:<Contact/>
        },
        {
          path:'profile',
          element:<Profile/>
        },
        {
          path:'/home/appointment',
          element:<Appointment/>
        },
        {
          path:'/home/bookappointment',
          element:<Bookappointment/>
        },
        {
          path:'appointment/appointsuccess',
          element:<Appointsuccess/>
        },
        {
          path:'/store',
          element:<Store/>
        },
        {
          path:'/admin/checkappointment',
          element:<Checkappointment/>
        },
        {
          path:'/admin/bookuserappointment',
          element:<Bookuserappointment/>
        },
        {
          path:'/admin/manageusers',
          element:<Manageusers/>
        },
        {
          path:'/admin/managestore',
          element:<Managestore/>
        },
        {
          path:'/admin/addproduct',
          element:<Addproducts/>
        },
        {
          path:'/admin/editproduct',
          element:<Editproduct/>
        },
        {
          path:'/admin/deletedproducts',
          element:<Deletedproduct/>
        }
      ]
    }
  ])

  // RouterProvider is rendered with routing configuration defined by the browserRouter 
  return <RouterProvider router={browserRouter}/>
}

export default App;
