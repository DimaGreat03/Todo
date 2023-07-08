import "./App.css";
import { useState } from "react";
import Header from "./Components/Header/Header";
import React from "react";
import PageAuto from "./Components/pageAuto/pageAuto";
import Home from "./Components/Pages/Home/Home";
import DeletedTasks from "./Components/Pages/DeletedTasks/DeletedTasks";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [auto, setAuto] = useState(false);
  const [deletedTasks, setDeletedTasks] = React.useState(['dima', 'petya', 'kolya']);


  const login = "Dima";
  const password = "[jnlju18";

  const ex = (login1, password1) => {
    if (login1 == login && password1 == password) {
      setAuto(false);
    }
  };

  const saveToDo = (name, day) => {
    setDeletedTasks(
        [...deletedTasks, (name + " " + "(" + day + ")")]
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
