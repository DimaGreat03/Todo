import React from "react";
import AddToDo from "../../AddToDo/AddToDo";
import Paginator from "../../Pagination/Paginator";
import Sort from "../../Sort/Sort";
import ToDoList from "../../ToDoList/ToDoList";
import axios from "axios";

const Home = ({ saveToDo, usersAccount }) => {
  const [items, setItems] = React.useState([]);
  const [observer, setObserver] = React.useState("");
  const [sort, setSort] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);


    React.useEffect(() => {
      axios
        .get(
          `https://649299ad428c3d2035d05219.mockapi.io/${usersAccount}?page=${currentPage}&limit=8&status=${sort}`
        )
        .then((response) => {
          setItems(response.data);
        });
    }, [observer, sort, currentPage, usersAccount]);

  return (
    <div>
      <AddToDo setDima={setObserver} usersAccount={usersAccount}/>
      <ToDoList setDima={setObserver} items={items} saveToDo={saveToDo} usersAccount={usersAccount}/>
      <Sort setSort={setSort} />
      <Paginator setCurrentPage={setCurrentPage} sort={sort} dima={observer} usersAccount={usersAccount}/>
    </div>
  );
};

export default Home;
