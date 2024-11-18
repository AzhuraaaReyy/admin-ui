import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./Pages/signIn";
import SignUpPage from "./Pages/signUp";
import ErrorRoute from "./Pages/errorRoute";
import ForgetPassword from "./Pages/forgetpassword";
import DashboardPage from "./Pages/dashboard";
import BalancePage from "./Pages/balance";
import ExpensesPage from "./Pages/expenses";
import GoalPage from "./Pages/goal";

const App = () => {
  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <DashboardPage />,
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
      element: <BalancePage />,
    },
    {
      path: "/bills",
      element: <ErrorRoute />,
    },
    {
      path: "/transaction",
      element: <ErrorRoute />,
    },
    {
      path: "/expenses",
      element: <ExpensesPage />,
    },
    {
      path: "/goals",
      element: <GoalPage />,
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
