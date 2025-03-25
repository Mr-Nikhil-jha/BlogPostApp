import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appWrite/Config";
import { logout } from "../../store/AuthSlice";

function LogoOutBtn() {
  const disPatch = useDispatch();
  const logoutHandler = () => {
    authService.logOut().then(() => {
      disPatch(logout());
    });
  };
  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
      Logout
    </button>
  );
}

export default LogoOutBtn;
