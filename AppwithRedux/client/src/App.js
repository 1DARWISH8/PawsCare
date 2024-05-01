//Import Styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Router is imported from react-router-dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// individual components are imported from their file locations
import Rootlayout from './Rootlayout';
import Home from './components/Home';
import Store from './components/Store';
import Register from './components/Register';
import Login from './components/Login';
import Contact from './components/Contact';
import Profile from './components/Profile';
import Appointment from './components/Appointment';
import Cart from './components/Cart';
import Checkappointment from './components/admin/Checkappointments';
import Manageusers from './components/admin/Manageusers';
import Managestore from './components/admin/Managestore'
import Bookappointment from './components/Bookappointment';
import Addproducts from './components/admin/Addproducts';
import Editproduct from './components/admin/Editproduct';
import Deletedproduct from './components/admin/Deletedproduct';
import Bookuserappointment from './components/admin/Bookuserappointment';
import Adminbookappointment from './components/admin/Adminbookappointment';
import Userprofile from './components/admin/Userprofile';
import Productpage from './components/Productpage';
import Orders from './components/Orders';
import Wishlist from './components/Wishlist';
import Manageorders from './components/admin/Manageorders';
import Myappointments from './components/Myappointments';
import Dashboard from './components/admin/Dashboard';
import Shop from './components/Shop';
import Searchresults from './components/Searchresults';
import ProductsNotfound from './components/ProductsNotfound';
import { useSelector } from 'react-redux';

  // // Function to set token in Axios headers
  // const setAuthToken = (getToken) => {
  //   if (getToken) {
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${getToken}`;
  //   } else {
  //     delete axios.defaults.headers.common['Authorization'];
  //   }
  // };

function App() {

// Destructure the currentUser and loginStatus from the userLogin state using useSelector hook
  let { currentUser, loginStatus } = useSelector(state => state.userLogin);


  // if (loginStatus)
  // {
  //   let getToken = sessionStorage.getItem('token')
  //   setAuthToken(getToken)
  // }
  // else
  // {
  //   setAuthToken(null)
  // }


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
          element:<Home/>
        },
        // {
        //   path:'/home',
        //   element:<Home/>
        // },
        {
          path:'/productsnotfound',
          element:<ProductsNotfound/>
        },
        {
          path:'/searchshop',
          element:<Searchresults/>
        },
        {
          path:'/shop',
          element:<Shop/>
        },
        {
          path:'store',
          element:<Store/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'contact',
          element:<Contact/>
        },
        {
          path:'/home/bookappointment',
          element:<Bookappointment/>
        },
        {
          path:'/home/appointment',
          element:<Appointment/>
        },
        {
          path:'/store',
          element:<Store/>
        },
        {
          path:'/store/productpage',
          element:<Productpage/>
        },
        {
          path:"/cart",
          element:(loginStatus===true && currentUser.userType ==="user")?<Cart/>:<Login/>
        },
        {
          path:'profile',
          element:(loginStatus===true && currentUser.userType ==="user")?<Profile/>:<Login/>
        },
        {
          path:'/user/orders',
          element:(loginStatus===true && currentUser.userType ==="user")?<Orders/>:<Login/>
        },
        {
          path:'/user/wishlist',
          element:(loginStatus===true && currentUser.userType ==="user")?<Wishlist/>:<Login/>
        },
        {
          path:'/home/myappointments',
          element:(loginStatus===true && currentUser.userType ==="user")?<Myappointments/>:<Login/>
        },
        {
          path:'/dashboard',
          element:(loginStatus===true && currentUser.userType ==="admin")?<Dashboard/>:<Login/>
        },
        {
          path:'/admin/checkappointment',
          element:(loginStatus===true && currentUser.userType ==="admin")?<Checkappointment/>:<Login/>
        },
        {
          path:'/admin/bookuserappointment',
          element:(loginStatus===true && currentUser.userType ==="admin")?<Bookuserappointment/>:<Login/>
        },
        {
          path:'/admin/adminbookappointment',
          element:(loginStatus===true && currentUser.userType ==="admin")?<Adminbookappointment/>:<Login/>
        },
        {
          path:'/admin/manageusers',
          element:(loginStatus===true && currentUser.userType ==="admin")?<Manageusers/>:<Login/>
        },
        {
          path:'/admin/managestore',
          element:(loginStatus===true && currentUser.userType ==="admin")?<Managestore/>:<Login/>
        },
        {
          path:'/admin/manageorders',
          element:(loginStatus===true && currentUser.userType ==="admin")?<Manageorders/>:<Login/>
        },
        {
          path:'/admin/addproduct',
          element:(loginStatus===true && currentUser.userType ==="admin")?<Addproducts/>:<Login/>
        },
        {
          path:'/admin/editproduct',
          element:(loginStatus===true && currentUser.userType ==="admin")?<Editproduct/>:<Login/>
        },
        {
          path:'/admin/deletedproducts',
          element:(loginStatus===true && currentUser.userType ==="admin")?<Deletedproduct/>:<Login/>
        },
        {
          path:'/admin/userprofile',
          element:(loginStatus===true && currentUser.userType ==="admin")?<Userprofile/>:<Login/>
        }
      ]
    }
  ])

  // RouterProvider is rendered with routing configuration defined by the browserRouter 
  return <RouterProvider router={browserRouter}/>
}

export default App;
