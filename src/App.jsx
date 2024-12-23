import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignInPage from "./Pages/signIn";
import SignUpPage from "./Pages/signUp";
import ErrorRoute from "./Pages/errorRoute";
import ForgetPassword from "./Pages/forgetpassword";
import DashboardPage from "./Pages/dashboard";
import BalancePage from "./Pages/balance";
import ExpensesPage from "./Pages/expenses";
import GoalPage from "./Pages/goal";
import { Children, useContext } from "react";
import { AuthContext } from "./Context/authContext";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const RequireAuth = ({ Children }) => {
    return isLoggedIn ? Children : <Navigate to="/login" />;
  };

  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <RequireAuth>
          <DashboardPage />
        </RequireAuth>
      ),
    },
    {
      path: "/eror",
      element: <ErrorRoute />,
    },
    {
      path: "/login",
      element: <SignInPage />,
    },
    {
      path: "/register",
      element: <SignUpPage />,
    },
    {
      path: "/forgetpassword",
      element: <ForgetPassword />,
    },
    {
      path: "/balance",
      element: (
        <RequireAuth>
          <BalancePage />
        </RequireAuth>
      ),
    },
    {
      path: "/bills",
      element: (
        <RequireAuth>
          <ErrorRoute />
        </RequireAuth>
      ),
    },
    {
      path: "/transaction",
      element: (
        <RequireAuth>
          <ErrorRoute />
        </RequireAuth>
      ),
    },
    {
      path: "/expenses",
      element: (
        <RequireAuth>
          <ExpensesPage />
        </RequireAuth>
      ),
    },
    {
      path: "/goals",
      element: (
        <RequireAuth>
          <GoalPage />
        </RequireAuth>
      ),
    },
    {
      path: "/settings",
      element: <ErrorRoute />,
    },
    {
      path: "/logout",
      element: <SignInPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
};

export default App;
