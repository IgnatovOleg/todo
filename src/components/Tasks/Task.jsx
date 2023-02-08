import React from "react";
import cl from "./Task.module.css"
import { FiTrash2 } from "react-icons/fi";

const Task = ({task, removeListTasks, board, titleTask, setTitleTask, nameTask, title}) => {


    const renameTask = (e, task) => {
        e.prevenDefault()
        task.title = titleTask
        task.is_editing = true
        setTitleTask([...titleTask])
    }


    return(
        <div className={cl.container}>
            <div className={cl.name}>
                {task.is_editing
                ? 
                    <form onSubmit={(e) => title(e, task)}>
                        <input
                            value={titleTask}
                            onChange={(e) => setTitleTask(e.target.value)}
                            type="text"
                            placeholder="Введите новое задание"
                        />
                    </form>
                :
                    <h4 onClick={(e) => renameTask(e, task) }>
                        {task.title}
                        <hr className={cl.hr}/>
                    </h4>
                }
            </div>
            <div className={cl.button}>
                <FiTrash2 
                onClick={(e) => removeListTasks(e, board, task)}
                />
            </div>
        </div>
    )
}
export default Task;