import { useState } from "react";
import s from "./auto.module.css";

const PageAuto = ({ ex }) => {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  console.log(value, value2);

  return (
      <div className={s.wrapper}>
        <span className={s.top}>Авторизируйтесь что бы войти</span> <p />
        <div className={s.login}>Login </div>
        <input  name="pincode" className={s.inputLogin} value={value} onChange={(e) => setValue(e.target.value)} />
        <div className={s.password}>Password </div>
        <input className={s.inputPassword} value={value2} onChange={(e) => setValue2(e.target.value)} />
        <div>
          <button className={s.button} onClick={() => ex(value, value2)}>
            Войти
          </button>
        </div>
      </div>
  );
};

export default PageAuto;
