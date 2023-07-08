import "./App.css";
import { useState } from "react";
import Header from "./Components/Header/Header";
import React from "react";
import PageAuto from "./Components/pageAuto/pageAuto";
import Home from "./Components/Pages/Home/Home";
import DeletedTasks from "./Components/Pages/DeletedTasks/DeletedTasks";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [auto, setAuto] = useState(true);
  const [deletedTasks, setDeletedTasks] = React.useState([
    {id: 1, name: "Удаленная Задача №1", day: '08.07.2023', time: '14:35:33'},
    {id: 2, name: "Удаленная Задача №2", day: '08.07.2023', time: '12:05:13'},
    {id: 3, name: "Удаленная Задача №3", day: '08.07.2023', time: '14:45:32'}
]);


  const login = "Smit";
  const password = "007";

  const ex = (login1, password1) => {
    if (login1 == login && password1 == password) {
      setAuto(false);
    }
  };

  const saveToDo = (id, name, day, time) => {
    let delTask = {id: id, name: name, day: day, time: time}
    setDeletedTasks(
        [...deletedTasks, delTask]
    )
}

  return (
    <div>
      {auto ? (
        <PageAuto ex={ex} />
      ) : (
        <div className="App">
          <Header setAuto={setAuto} />
          <Routes>
            <Route path="/" element={<Home saveToDo={saveToDo}/>} />
            <Route path="deleted" element={<DeletedTasks deletedTasks={deletedTasks} setDeletedTasks={setDeletedTasks}/>} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
