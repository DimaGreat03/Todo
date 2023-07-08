import React from "react";
import AddToDo from "../../AddToDo/AddToDo";
import Paginator from "../../Pagination/Paginator";
import Sort from "../../Sort/Sort";
import ToDoList from "../../ToDoList/ToDoList";
import axios from "axios";

const Home = ({saveToDo}) => {
  const [items, setItems] = React.useState([]);
  const [observer, setObserver] = React.useState("");
  const [sort, setSort] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

//   const returnTask = (id, name, day, time) => {
//     let rerturnTask = {id: id, name: name, day: day, time: time}
//     setItems(
//         [...items, returnTask]
//     )
// }

  React.useEffect(() => {
    axios
      .get(
        `https://649299ad428c3d2035d05219.mockapi.io/names?page=${currentPage}&limit=8&status=${sort}`
      )
      .then((response) => {
        setItems(response.data);
      });
  }, [observer, sort, currentPage]);


  return (
    <div>
      <AddToDo setDima={setObserver} />
      <ToDoList
        setDima={setObserver}
        items={items}
        saveToDo={saveToDo}
      />
      <Sort setSort={setSort}/>
      <Paginator setCurrentPage={setCurrentPage} sort={sort} dima={observer} />
    </div>
  );
};

export default Home;
