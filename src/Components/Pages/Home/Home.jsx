import React from "react";
import Paginator from "../../Pagination/Paginator";
import Sort from "../../Sort/Sort";
import AddToDoList from "../../AddTodoList/AddTodoList";
import { Link } from "react-router-dom";
import s from "./home.module.css"
import axios from "axios";


const Home = ({ usersAccount, setUserId, todoLists, setDima, dima, setCurrentPage }) => {
  const [observer, setObserver] = React.useState("");
  const [sort, setSort] = React.useState("");
  const [popup, setPopup] = React.useState(false)
  const [popupId, setPopupId] = React.useState("")
  const [edit, setEdit] = React.useState(null)
  const [value, setValue] = React.useState('')

  const deleteTodo = (id) => {
    fetch(`https://649299ad428c3d2035d05219.mockapi.io/users/${id}/`, {
      method: "DELETE",
    }).then((response) => {
      setDima(response);
    });
  };

  const editTodo = (id) => {
    axios
      .put(
        `https://649299ad428c3d2035d05219.mockapi.io/users/${id}`,
        {name: value},{})
      .then((response) => {
        setDima(response);
        setEdit(null)
        setValue('')
      });
  };

  return (
    <div>
      <AddToDoList setDima={setDima} />
      <Link to="/deleted">
        <button className={s.notActive}> Deleted</button>
      </Link>
      {todoLists.map((item) => {
        return (
          <div className={s.main}>
             {
                edit == item.id 
                ? <input value={value} onChange={e => setValue(e.target.value)} className={s.input}/> 
                : <div className={s.div}>
                    <button className={s.button} onClick={() => deleteTodo(item.id)}>Delete</button>
                    <button className={s.button} onClick={() => setEdit(item.id) || setValue(item.name)}>Edit</button>              
                    <button className={s.button} onClick={() => {setPopupId(item.id) || setPopup(!popup)}}>
                            {popup? (popupId == item.id ? item.time: item.day) : item.day}
                    </button>
                </div>
             }
             
             {
               edit == item.id 
               ? <span>
                   <button className={s.button} onClick={() => editTodo(item.id)}>Save</button> 
                   <button className={s.button} onClick={() => setEdit(false)}>Cancel</button>
                </span>
               : <Link className={s.link} to="/todolist">
                <li onClick={() => setUserId(item.id)} className={s.li}>{item.name}  
                </li>
                </Link> 
             }
                
          </div>
        );
      })}
      <Paginator
        setCurrentPage={setCurrentPage}
        sort={sort}
        setDima={setDima}
        dima={dima}
        usersAccount={usersAccount}
      />
    </div>
  );
};

export default Home;
