import "./App.css";
import { useState } from "react";
import Header from "./Components/Header/Header";
import React from "react";
import PageAuto from "./Components/pageAuto/pageAuto";
import Home from "./Components/Pages/Home/Home";
import DeletedTasks from "./Components/Pages/DeletedTasks/DeletedTasks";
import { Route, Routes } from "react-router-dom";
import TodoLists from "./Components/Pages/Todolists/Todolists";
import axios from "axios";


const App = () => {
  const [auto, setAuto] = useState(true);
  const [usersAccount, setUsers] = React.useState("")
  const[userId, setUserId] = React.useState("")
  const users = [{ login: "Smit", password: "007"}];
  const [todoLists, setTodoLists] = React.useState([]);
  const [dima, setDima] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [deletedTasks, setDeletedTasks] = React.useState([]);


  const ex = (login1, password1) => {
    if (login1 == users[0].login && password1 == users[0].password) {
      setAuto(false);
    }
  };

  const saveToDo = (id, name, day, time, userName) => {
    let delTask = { id: id, name: name, day: day, time: time, user: userName };
    setDeletedTasks([...deletedTasks, delTask]);
  };

  React.useEffect(() => {
    axios
      .get(`https://649299ad428c3d2035d05219.mockapi.io/users?page=${currentPage}&limit=8`)
      .then((response) => {
        setTodoLists(response.data)
      });
  }, [dima, currentPage]);



  return (
    <div className="App">
      {auto ? (
        <PageAuto ex={ex} />
      ) : (
        <div >
          <Header setAuto={setAuto} />
          <Routes>
            <Route path="/" element={<Home setCurrentPage={setCurrentPage} dima={dima} setDima={setDima} todoLists={todoLists} setUserId={setUserId} saveToDo={saveToDo} usersAccount={usersAccount}/>} />
            <Route path="deleted" element={<DeletedTasks usersAccount={usersAccount}
                     deletedTasks={deletedTasks} setDeletedTasks={setDeletedTasks}/>}
            />
            <Route path="/todolist" element={<TodoLists saveToDo={saveToDo} name={userId}/>}/>
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
