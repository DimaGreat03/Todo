import { Link } from "react-router-dom";
import s from "./deletedTasks.module.css";
import React from "react";
import axios from "axios";



const DeletedTasks = ({ deletedTasks, setDeletedTasks }) => {
  const [popup, setPopup] = React.useState(false)
  const [popupId, setPopupId] = React.useState("")

  const returnTask = (value, time, day, id) => {
      axios
        .post(
          `https://649299ad428c3d2035d05219.mockapi.io/names/`,
          {name: value, status: true, time: time, day: day}, {})
        .then(() => {
          setDeletedTasks([...deletedTasks].filter(item => item.id != id))
        });
    };

  return (
    <div>
      <Link to="/">
        <button className={s.button}> Вернуться к задачам</button>
      </Link>
      <div className={s.tasks}>
        <div>
          {deletedTasks.map((item) => {
            return <li className={s.li}>{item.name} 
            
            <button 
            className={s.buttonTime} 
            onClick={() => returnTask(item.name, item.time, item.day, item.id)}
            >Вернуть</button>

            <button className={s.buttonTime}
               onClick={() =>{
               setPopupId(item.id) 
               setPopup(!popup)
            } }>
              {popup? (popupId == item.id ? item.time: item.day) : item.day} 
            </button>
            
            </li> 

          })}
        </div>
      </div>
    </div>
  );
};

export default DeletedTasks;
