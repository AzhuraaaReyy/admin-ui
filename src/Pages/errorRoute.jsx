import { useRouteError } from "react-router-dom";
import Logo from "../Components/Elements/Logo";
import { useDarkMode } from "../hooks/useDarkMode"; // Gunakan hook dark mode jika ada

const ErrorRoute = () => {
  const error = useRouteError();
  const { darkMode } = useDarkMode(); // Ambil state dark mode

  // Menangani kasus di mana `error` mungkin null
  const status = error?.status || 404;
  const statusText = error?.statusText || "Not Found";

  return (
    <div
      className={`flex justify-center min-h-screen items-center flex-col ${
        darkMode ? "bg-defaultBlack text-white" : "bg-special-mainBg text-black"
      }`}
    >
      <Logo />
      <h1 className="text-2xl font-bold mt-3 mb-1">Sorry,</h1>
      <p>
        {status} || {statusText}
      </p>
    </div>
  );
};

export default ErrorRoute;
