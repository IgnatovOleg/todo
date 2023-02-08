import React, { useState } from "react";
import cl from "./ListBoards.module.css";
import { useDispatch, useSelector } from "react-redux";
import Task from "../Tasks/Task";
import {addTaskAction, removeLiastTasksAction, renameBoardAction} from "../../store/listBoardsReducer";
import { FiX } from "react-icons/fi";
import { BiPlus, BiEditAlt } from "react-icons/bi";


const ListBoards = ({board, deleteBoard, nameBoard, setNameBoard, namedBoard}) => {

    const dispatch = useDispatch()
    const listBoards = useSelector(state => state.listBoards.listBoards)

    const [titleTask, setTitleTask] = useState("")


    const addNewTasks = (e, board) => {
        e.preventDefault()
        const newTask = {
            id: Date.now(),
            title: titleTask,
            is_editing: true
        }
    dispatch(addTaskAction(board.id, newTask))
    setTitleTask("")
    }


    const removeListTasks = (e, board,task) => {
        e.preventDefault()
        dispatch(removeLiastTasksAction(board.id, task.id))
    }


    const renameBoard = (board) => {
        board.name = nameBoard
        board.is_editing = true
        setNameBoard([...nameBoard])
        setNameBoard("")
    }
    const title = (e, task) => {
        e.preventDefault()
        task.title = titleTask
        task.is_editing = false
        setTitleTask([...titleTask])
        setTitleTask("")
    }

    
    

    return(
        <div className={cl.board}>
            <div className={cl.container}>
                <div className={cl.nameBoardAndDelete}>
                {board.is_editing
                ?   <form onSubmit={(e) => namedBoard(e, board)}>
                        <input
                            className={cl.inputNameBoard}
                            value = {nameBoard}
                            onChange = {(e) => setNameBoard(e.target.value)}
                            placeholder="Введите название доски"
                            type="text"
                        />
                    </form>
                :   <div className={cl.nameBoard}> 
                        <h3 onClick={(e) => renameBoard(e, board)}>{board.name}</h3> 
                    </div>

                }
                    <div className={cl.deleteBoard}> <FiX onClick = {() => deleteBoard(board)}/> </div>
                </div>
                <div className={cl.inputAdd}>
                    <div className={cl.btnAdd}
                        onClick={(e) => addNewTasks(e, board)}
                    >
                        <BiPlus/>
                    </div>
                </div>
                {board.tasks.length > 0
                    ?   <div className={cl.task}>
                            {board.tasks.map(task => 
                                <div>
                                    <Task
                                        title={title}
                                        addNewTasks={addNewTasks} 
                                        board={board} 
                                        titleTask={titleTask} 
                                        setTitleTask={setTitleTask} 
                                        removeListTasks={removeListTasks} 
                                        task={task} 
                                        key={task.id}/>
                                </div>
                                )}
                        </div>
                    :   <div className={cl.empty}>
                            Просто, нажми на белый кружочек и введи свою задачу
                        </div>
                }
            </div>
        </div>
    )
}
export default ListBoards;