import React, { useEffect } from "react";
import { FaKaaba } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { DASHBOARD_SIDEBAR_LINKS } from "../../lib/consts/Navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";

const linkClasses =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";
const SidebarLink = ({ item }) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname == item.path
          ? "bg-neutral-700 text-white"
          : "text-neutral-400",
        linkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !localStorage.getItem("isAuth") ||
      localStorage.getItem("isAuth") == "false"
    ) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-2 px-3 py-3 border-b border-neutral-700">
        <FaKaaba fontSize={28} color="yellow" />{" "}
        <span className="text-neutral-100 text-lg font-bold">
          {import.meta.env.VITE_APP_COMPANY_NAME}
        </span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        <div className={classNames("", linkClasses)}>
          <div
            className="flex gap-2 text-red-500 cursor-pointer hover:no-underline"
            onClick={() => {
              localStorage.removeItem("isAuth");
              localStorage.removeItem("companyId");
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <span className="text-xl">
              <HiOutlineLogout />
            </span>
            Выход
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
