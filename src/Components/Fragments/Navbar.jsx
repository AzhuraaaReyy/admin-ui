import { Link } from "react-router-dom";
import { Icon } from "../Elements/Icon";
import Logo from "../Elements/Logo/index";

const Navbar = () => {
  const menus = [
    {
      id: "overview",
      link: "/",
      icon: <Icon.Overview />,
      label: "Overview",
    },
    {
      id: "balance",
      link: "/balance",
      icon: <Icon.Balance />,
      label: "Balance",
    },
    {
      id: "transaction",
      link: "/transaction",
      icon: <Icon.Transaction />,
      label: "Transaction",
    },
    {
      id: "bills",
      link: "/bills",
      icon: <Icon.Bills />,
      label: "Bills",
    },
    {
      id: "expenses",
      link: "/expenses",
      icon: <Icon.Expenses />,
      label: "Expenses",
    },
    {
      id: "goals",
      link: "/goals",
      icon: <Icon.Goals />,
      label: "Goals",
    },
    {
      id: "settings",
      link: "/settings",
      icon: <Icon.Settings />,
      label: "Settings",
    },
  ];

  return (
    <nav className="bg-defaultBlack text-special-bg2 sm:w-72 w-28 min-h-screen px-7 py-12 flex flex-col justify-between">
      <div>
        <div className="flex justify-center mb-10">
          <Logo variant="text-white text-sm sm:text-2xl" />
        </div>
        {menus.map((menu) => (
          <Link to={menu.link} key={menu.id}>
            <div className="flex hover:bg-green-700 hover:text-white px-4 py-3 rounded-md transition-colors duration-500 ease-in-out">
              <div className="mx-auto sm:mx-0">{menu.icon}</div>
              <div className="ms-3 hidden sm:block">{menu.label}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="sticky bottom-12">
        <Link to="/logout">
          <div className="flex bg-special-bg3 px-4 py-3 rounded-md hover:text-white hover:text-white hover:bg-green-700 transition duration-300 ease-in-out">
            <div className="mx-auto sm:mx-0">
              <Icon.Logout />
            </div>
            <div className="ms-3 hidden sm:block">Logout</div>
          </div>
        </Link>
        <div className="border-b my-10 border-b-special-bg"></div>
        <div className="flex justify-between">
          <div className="mx-auto sm:mx-0 self-center">
            <img src="/images/profile.png" />
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-bold">Username</div>
            <div className="text-xs">View Profile</div>
          </div>
          <div className="hidden sm:block self-center justify-self-end">
            <Icon.KebabMenuIcon />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
