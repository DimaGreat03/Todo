import axios from "axios";
import React from "react";
import s from "./pagination.module.css";

const Paginator = ({ setCurrentPage, sort, dima, usersAccount }) => {
  const [countPages, setCountPages] = React.useState("");
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(`https://649299ad428c3d2035d05219.mockapi.io/${usersAccount}?&status=${sort}`)
      .then((response) => setCountPages(response.data.length));
  }, [sort, dima]);

  let total = Math.ceil(countPages / 8);
  let pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((item, i) => (
        <button
          className={index === i ? s.active : s.notActive}
          onClick={() => setCurrentPage(item) || setIndex(i)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Paginator;
