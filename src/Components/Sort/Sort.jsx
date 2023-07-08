import { Link } from "react-router-dom";
import s from "./sort.module.css"

const Sort = ({ setSort }) => {
  return (
    <div >
      <button  className={s.sort} onClick={() => setSort("")}>все</button>
      <button  className={s.sort} onClick={() => setSort(true)}>активные</button>
      <button  className={s.sort} onClick={() => setSort(false)}>завершенные</button>
      <Link to="/deleted">
         <button className={s.sort}> удаленные</button>
      </Link>
    </div>
  );
};

export default Sort;
