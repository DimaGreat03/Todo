import React from "react";
import s from "./Header.module.css";

const Header = ({setAuto}) => {
  return (
    <div>
      <div className={s.root}>
        <span className={s.nameTodo}>ToDo List </span>
        <button className={s.exit} onClick={() => setAuto(true)}>exit</button>
      </div>
    </div>
  );
};

export default Header;
