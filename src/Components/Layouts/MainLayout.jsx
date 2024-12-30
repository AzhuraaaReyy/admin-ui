import Header from "../Fragments/Header";
import Navbar from "../Fragments/Navbar";
import { useContext } from "react";
import { ThemeContext } from "../../Context/themeContext";
import { NotifContext } from "../../Context/notifContext";
import SimpleBackdrop from "../Elements/Backdrop";
import CustomizedSnackbars from "../Elements/SnackBar";
const MainLayout = (props) => {
  const { children } = props;
  const { theme } = useContext(ThemeContext);
  const { msg, setMsg, open, setOpen, isLoading, setIsLoading } =
    useContext(NotifContext);
  return (
    <div
      className={`flex bg-special-mainBg w-screen min-h-screen max-w-full ${theme.name}`}
    >
      {/* navbar start*/}
      <Navbar />
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
        <Header />
        {/* header end*/}
        {/* content start*/}
        <main className="px-6 py-4">{children}</main>
        {/* content end*/}
      </div>
    </div>
  );
};

export default MainLayout;
