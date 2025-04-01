import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appWrite/auth";
import { logout } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";

function LogoOutBtn() {
    const disPatch = useDispatch();
    let navigate = useNavigate();
    const logoutHandler = () => {
        authService.logout().then(() => {
            disPatch(logout());
            navigate("/login");
        });
    };
    return (
        <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full cursor-pointer" onClick={logoutHandler}>
            Logout
        </button>
    );
}

export default LogoOutBtn;
