import axios from "axios";
import React from "react";
import s from "./pagination.module.css"


const Paginator = ({ setCurrentPage, sort, dima }) => {
  
  const [countPages, setCountPages] = React.useState("");

  React.useEffect(() => {
    axios
      .get(`https://649299ad428c3d2035d05219.mockapi.io/names?&status=${sort}`)
      .then((response) => setCountPages(response.data.length));
  }, [sort, dima]);


  let total = Math.ceil(countPages/8)
  let pages =[]
  for(let i=1; i<=total; i++) {
    pages.push(i)
  }

  return (
    <div>
      {pages.map((item) => (
        <button className={s.button}onClick={() => setCurrentPage(item)}>{item}</button>
      ))}
    </div>
  );
};

export default Paginator;
