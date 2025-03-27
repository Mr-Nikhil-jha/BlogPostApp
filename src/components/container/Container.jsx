import React from "react";

function Container({ children }) {
  // console.log("Parent component:", this.props.parent);
  // console.log("Props:", this.props);
  return <div className="w-full max-w-7xl mx-auto px-4">{children}</div>;
}

export default Container;
