import React, { useState } from "react";
import { Button, Col, FormControl, Row } from "react-bootstrap";
import s from "./AddToDo.module.css";
import axios from "axios";

const AddToDoList = ({ setDima }) => {
  const [value, setValue] = useState("");
  let day = new Date().toISOString().slice(0,10).split('-').reverse().join('.') 
  let time = new Date().toLocaleTimeString()

  const addTodoList = () => {
    setValue("");
    axios
      .post(
        `https://649299ad428c3d2035d05219.mockapi.io/users/`,
        { name: value, time: time, day: day, userId: '77'}, {}
      )
      .then((response) => {
        setDima(response);
      });
  };

  return (
    <Row>
      <Col className={s.addToDoForm}>
        <FormControl
          placeholder={"enter a new to-do list"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button className={s.btn} onClick={addTodoList} disabled={value === ""}>
          Send
        </Button>
      </Col>
    </Row>
  );
};

export default AddToDoList;
