import { Link } from "react-router-dom";
import s from "./sort.module.css";
import React from "react";

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
    </div>
  );
};

export default Sort;

{
  /* <button  className={s.sort} onClick={() => setSort("")}>все</button>
      <button  className={s.sort} onClick={() => setSort(true)}>активные</button>
      <button  className={s.sort} onClick={() => setSort(false)}>завершенные</button>
      <Link to="/deleted">
         <button className={s.sort}> удаленные</button>
      </Link> */
}
