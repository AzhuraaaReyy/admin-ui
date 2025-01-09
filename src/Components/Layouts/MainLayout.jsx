import Header from "../Fragments/Header";
import Navbar from "../Fragments/Navbar";
import { useContext } from "react";
import { ThemeContext } from "../../Context/themeContext";
import { NotifContext } from "../../Context/notifContext";
import SimpleBackdrop from "../Elements/Backdrop";
import CustomizedSnackbars from "../Elements/SnackBar";
import { useDarkMode } from "../../hooks/useDarkMode";

const MainLayout = (props) => {
  const { children } = props;
  const { theme } = useContext(ThemeContext);
  const { msg, setMsg, open, setOpen, isLoading, setIsLoading } =
    useContext(NotifContext);
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`flex w-screen min-h-screen max-w-full ${
        darkMode ? "bg-defaultBlack" : "bg-special-mainBg"
      } ${theme.name}`}
    >
      {/* navbar start*/}
      <Navbar darkMode={darkMode} />
      {/* navbar end*/}

      <div className="w-screen">
        {msg && (
          <CustomizedSnackbars
            severity={msg.severity}
            message={msg.desc}
            open={open}
            setOpen={setOpen}
          />
        )}
        {/* header start*/}
        <Header darkMode={darkMode} />
        {/* header end*/}
        {/* content start*/}
        <main
          className={`px-6 py-4 min-h-[calc(100vh-4rem)] ${
            darkMode ? "bg-defaultBlack" : "bg-special-mainBg"
          }`}
        >
          {children}
        </main>
        {/* content end*/}
      </div>
    </div>
  );
};

export default MainLayout;
