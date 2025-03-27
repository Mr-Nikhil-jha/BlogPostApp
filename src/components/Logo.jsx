import React from "react";
import blog from "../assets/blog.svg";

function Logo({ width = "100px" }) {
    return (
        <div>
            <span>
                <img src={blog} alt="logo" width={width} />
            </span>
        </div>
    );
}

export default Logo;
