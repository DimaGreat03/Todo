import { Link } from "react-router-dom";
import s from "./sort.module.css";
import React from "react";
import axios from "axios";
import TodoLists from "../Pages/Todolists/Todolists";

const Sort = ({ setSort }) => {
  const [list, setList] = React.useState([
    { name: "все", status: "" },
    { name: "активные", status: "true" },
    { name: "завершенные", status: "false" },
  ]);
  const [index, setIndex] = React.useState(0);


  return (
    <div>
      {list.map((item, i) => {
        return (
          <button
            className={index === i ? s.active : s.notActive}
            onClick={() => setIndex(i) || setSort(item.status)}
          >
            {item.name}
          </button>
        );
      })}
      <Link to="/deleted">
        <button className={s.notActive}> удаленные</button>
      </Link>

      {/* {todoLists.map((item) => {
        return (
          <Link to="/todolist">
            <button className={s.notActive}>{item.name}</button>
          </Link>
        );
      })} */}
    </div>
  );
};

export default Sort;
