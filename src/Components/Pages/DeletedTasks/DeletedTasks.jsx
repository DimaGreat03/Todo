import s from "./deletedTasks.module.css"





const DeletedTasks = ({deletedTasks}) => {


  return <div className={s.tasks}>
    {deletedTasks.map(item => {
        return <li className={s.li}>{item}</li>
    })}
    <button>+</button>
    </div>;
};

export default DeletedTasks;
