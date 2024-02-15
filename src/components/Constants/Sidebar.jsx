import React, { useContext, useEffect } from "react";
import { FaKaaba } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../../lib/consts/Navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { AppContext } from "../../App";

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
  const {userData, setUserData} = useContext(AppContext)

  useEffect(() => {
    if (!userData.isAuth && localStorage.getItem('isAuth')=='false') {
      navigate("/login");
    }
  }, [userData]);

  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-2 px-3 py-3 border-b border-neutral-700">
        <FaKaaba fontSize={28} color="yellow" />{" "}
        <span className="text-neutral-100 text-lg font-bold">Умра</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div className={classNames("", linkClasses)}>
          <div
            className="flex gap-2 text-red-500 cursor-pointer hover:no-underline"
            onClick={()=>{
              console.log(userData);
              setUserData({
                  isAuth: false,
                  isSuperAdmin: false,
                  token: ''
              });
              localStorage.setItem('isAuth', false);
              localStorage.setItem('isSuperAdmin', false);
              localStorage.setItem('token', '');
          }}
          >
            <span className="text-xl">
              <HiOutlineLogout />
            </span>
            Чыгуу
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
