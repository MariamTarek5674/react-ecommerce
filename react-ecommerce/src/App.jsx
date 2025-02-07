import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home/Home';
import MainLayout from './Layouts/MainLayout/MainLayout';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './lib/store';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './pages/NotFound/NotFound';

let routes = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
            <Home />
        ),
      },
      {
        path:'/product/:id',
        element:(
          <ProductDetails/>
        )
      },
      {
        path:'/create/product',
        element:(
          <ProtectedRoute>
            <CreateProduct/>
          </ProtectedRoute>
        )
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path:'/login',
    element:(
      <Login/>
    )
  }
]);

function App() {

  return (
    <>
     <Provider store={store}>
       <RouterProvider router={routes}></RouterProvider>
       <Toaster
            toastOptions={{
              position: "bottom-center", // Global position for all toasts
              style: {
                zIndex: 999, // Custom z-index for all toasts
                marginBottom: "30px",
              },
            }}
       />
     </Provider>
   </>
  )
}

export default App
