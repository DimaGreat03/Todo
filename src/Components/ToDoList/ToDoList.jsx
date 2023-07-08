import React, {useState} from "react";
import {Button} from "react-bootstrap";
import s from "./ToDoList.module.css"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {faLockOpen} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ToDoList = ({items, setDima, saveToDo}) => {

    const [edit, setEdit] = useState(null)
    const [value, setValue] = useState('')
    const [popup, setPopup] = useState(false)
    const [popupId, setPopupId] = useState("")
    const [disabled, setDisabled] = useState(0)

    
    const deleteTask = (id) => {
        fetch(`https://649299ad428c3d2035d05219.mockapi.io/names/${id}`, {
          method: "DELETE",
        }).then((response) => {
          setDima(response);
          setDisabled(false)
        });
      };

      const editTask = (id) => {
        axios
          .put(
            `https://649299ad428c3d2035d05219.mockapi.io/names/${id}`,
            {name: value},{})
          .then((response) => {
            setDima(response);
            setEdit(null)
          });
      };

      const editStatus = (id, status) => {
        setValue('')
        axios
          .put(
            `https://649299ad428c3d2035d05219.mockapi.io/names/${id}`,
            {status: status? false : true},{})
          .then((response) => {
            setDima(response);
            setEdit(null)
          });
      };

      const editTodo2 = (id, title) => {
        setEdit(id)
        setValue(title)
      }


    return <div>
        {
            items.map(item => (
                <div key={item.id} className={s.toDoListItems}>
                    {
                        edit == item.id
                            ? <div>
                                <input 
                                className={s.input} 
                                autoFocus 
                                value={value} 
                                onChange={e => setValue(e.target.value)} />
                            </div>
                            : <div className={!item.status && s.close}><li>{item.name} </li></div>
                    }
                    {
                        edit == item.id
                            ? <div>
                              <button className={s.cancel} onClick={() => setEdit(null)}>cancel</button>
                              <Button onClick={() => editTask(item.id)}><FontAwesomeIcon icon={faSave}/></Button>
                              </div>
                              
                            : <div>
                                <span className={s.time} onClick={() => {
                                  setPopupId(item.id) 
                                  setPopup(!popup)}}>
                                       {popup? (popupId == item.id ? item.time: item.day) : item.day}
                                  </span>
                                <Button 
                                   className={s.btn} 
                                   disabled={item.id == disabled}  
                                   onClick={() => {
                                        deleteTask(item.id)
                                        saveToDo(item.id, item.name, item.day, item.time)
                                        setDisabled(item.id)}}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                                <Button className={s.btn} onClick={() => {editTodo2(item.id, item.name) }}><FontAwesomeIcon icon={faPenToSquare}/></Button>
                                <Button className={s.btn} onClick={() => editStatus(item.id, item.status)}>{item.status?<FontAwesomeIcon icon={faLockOpen}/> : <FontAwesomeIcon icon={faLock}/>}</Button>
                            </div>
                    }
                </div>
            ))
        }
    </div>
}

export default ToDoList;