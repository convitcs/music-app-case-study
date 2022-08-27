import React, { useEffect, useState } from "react";
import { searchIcon } from "../../../assets";
import "./style.css";

const Header = () => {
  let [welcome, setWelcome] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setWelcome(true);
      console.log("ua alo");
    }, 2000);
  });
  return (
    <header className="header flex justify-sb">
      <div className={`welcome ${welcome ? "" : "active"}`}>
        Welcome back Cong Minh
      </div>
    </header>
  );
};

export default Header;
