import { combineReducers, createStore } from "redux";
import { listBoardsReducer } from "./listBoardsReducer";


const rootReducer = combineReducers({
    listBoards: listBoardsReducer,
})

export const store = createStore(rootReducer)