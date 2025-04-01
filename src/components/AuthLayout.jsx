import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const authstatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authentication && authstatus !== authentication) {
            navigate("/login");
        } else if (!authentication && authstatus !== authentication) {
            navigate("/");
        } else {
            setLoader(false);
        }
    }, [authstatus, navigate, authentication]);

    return loader ? <h1>...loading</h1> : <> {children}</>;
}
