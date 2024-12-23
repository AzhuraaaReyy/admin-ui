import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignInPage from "./Pages/signIn";
import SignUpPage from "./Pages/signUp";
import ErrorRoute from "./Pages/errorRoute";
import ForgetPassword from "./Pages/forgetpassword";
import DashboardPage from "./Pages/dashboard";
import BalancePage from "./Pages/balance";
import ExpensesPage from "./Pages/expenses";
import GoalPage from "./Pages/goal";
import { useContext } from "react";
import { AuthContext } from "./Context/authContext";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  // Update `Children` to lowercase `children` as per React conventions
  const RequireAuth = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
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
      path: "/error", // Fix typo "/eror" to "/error"
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
      element: <Navigate to="/login" />, // Redirect to login after logout
    },
  ]);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
};

export default App;
