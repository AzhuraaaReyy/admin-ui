import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./Pages/signIn";
import SignUpPage from "./Pages/signUp";
import ErrorRoute from "./Pages/errorRoute";
import ForgetPasswordPage from "./Pages/forgetpassword";


const App = () => {
  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <div>Halaman Utama</div>,
    },
    {
      path: "/eror",
      element: <ErrorRoute/>
    },
    {
      path: "/login",
      element: <SignInPage/>
    },
    {
      path: "/register",
      element: <SignUpPage/>
    },
    {
      path: "/forgetpassword",
      element: <ForgetPasswordPage/>
    },

  ]);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
};

export default App;
