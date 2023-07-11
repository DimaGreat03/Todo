import axios from "axios";
import React from "react";
import {Button} from "react-bootstrap";
import s from "../../ToDoList/ToDoList.module.css"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {faLockOpen} from "@fortawesome/free-solid-svg-icons";
import AddTask from "../../AddTask/AddTask";
import { Link } from "react-router-dom";


const TodoLists = ({name, saveToDo}) => {

    const [items, setItems] = React.useState([])
    const [edit, setEdit] = React.useState(null)
    const [value, setValue] = React.useState('')
    const [popup, setPopup] = React.useState(false)
    const [popupId, setPopupId] = React.useState("")
    const [disabled, setDisabled] = React.useState(0)
    const [dima, setDima] = React.useState('')
    const [countPages, setCountPages] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1)
    const [sort, setSort] = React.useState("")
    const [index, setIndex] = React.useState(0);
    const buttonSort = [{title: "все", status: ""}, {title: "активные", status: true}, {title: "завершенные", status: false}]

    
    React.useEffect(() => {
        axios
          .get(
            `https://649299ad428c3d2035d05219.mockapi.io/users/${name}/tasks?page=${currentPage}&limit=9&status=${sort}`
          )
          .then((response) => {
            setItems(response.data)
          });
      }, [name, currentPage, sort, dima]);

      React.useEffect(() => {
        axios
          .get(`https://649299ad428c3d2035d05219.mockapi.io/users/${name}/tasks?status=${sort}`)
          .then((response) => setCountPages(response.data.length))
      }, [sort, dima]);
    
      let total = Math.ceil(countPages / 10);
      let pages = [];
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }

      const deleteTask = (id) => {
        fetch(`https://649299ad428c3d2035d05219.mockapi.io/users/${name}/tasks/${id}`, {
          method: "DELETE",
        }).then((response) => {
          setDima(response);
        });
      };

      const editTask = (id) => {
        axios
          .put(
            `https://649299ad428c3d2035d05219.mockapi.io/users/${name}/tasks/${id}`,
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
            `https://649299ad428c3d2035d05219.mockapi.io/users/${name}/tasks/${id}`,
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


    return (
        <div>
            Add your new task and dont forget achieve your goals
            <AddTask setDima={setDima} userId={name}/>
            <Link  to={"/"}><button className={s.link}> Back home</button></Link>
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
                                <button className={s.time} onClick={() => {
                                  setPopupId(item.id) 
                                  setPopup(!popup)}}>
                                       {popup? (popupId == item.id ? item.time: item.day) : item.day}
                                  </button>
                                <Button 
                                   className={s.btn} 
                                   disabled={item.id == disabled}  
                                   onClick={() => {
                                        deleteTask(item.id)
                                        saveToDo(item.id, item.name, item.day, item.time, name)
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
        <div>
           {buttonSort.map(item => {
             return <button className={s.button} onClick={() => setSort(item.status)}>{item.title}</button>
           })}
        </div>
        {pages.map((item, i) => {
          return <button className={index === i ? s.buttonPagesActive : s.buttonPagesNot} onClick={() => setCurrentPage(item) || setIndex(i)}>{item}</button>
        })}
        </div>
    )
}

export default TodoLists