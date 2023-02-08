const defaultState = {
    listBoards: [
        // {name: "NameBoard", id: 1, is_editing: true, tasks: [{title: "NameTask", id:2, is_editing: true} ]}
    ],
}

const ADD_BOARD = "ADD_BOARD"
const ADD_TASK = "ADD_TASK"
const REMOVE_LIST_TASK= "REMOVE_LIST_TASK"
const REMOVE_LIST_BOARDS = "REMOVE_LIST_BOARDS"

export const listBoardsReducer = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_BOARD:
            return {...state, listBoards: [...state.listBoards, action.payload]}
        case ADD_TASK:
            const index = state.listBoards.findIndex(board => board.id === action.payload.id)
            const newBoard = [...state.listBoards]
            newBoard[index].tasks.push(action.payload.obj)
            return {...state, listBoards: newBoard}
        case REMOVE_LIST_TASK:
            const indexBoard = state.listBoards.findIndex(board => board.id === action.payload.id)
            const newArray = [...state.listBoards]
            const result = newArray[indexBoard].tasks.filter(task => task.id !== action.payload.taskId)
            newArray[indexBoard].tasks = result
            return {...state, listBoards: newArray}
        case REMOVE_LIST_BOARDS:
            return {...state, listBoards: state.listBoards.filter(board => board.id !== action.payload)}
        default:
            return state
    }

}

export const addBoardAction = (payload) => ({type: ADD_BOARD, payload})
export const addTaskAction = (id, obj) => ({type: ADD_TASK, payload:{id, obj}})
export const removeLiastTasksAction = (id, taskId) => ({type: REMOVE_LIST_TASK, payload:{id, taskId}})
export const removeListBoardAction = (payload) => ({type: REMOVE_LIST_BOARDS, payload})
