import React, { useState } from 'react';
import './App.css';
import ListBoards from './components/ListBoards/ListBoards';
import { useDispatch, useSelector } from 'react-redux';
import { addBoardAction, removeListBoardAction } from './store/listBoardsReducer';
import { BiPlus } from "react-icons/bi";


function App() {
  const [nameBoard, setNameBoard] = useState("")

  const dispatch = useDispatch()
  const listBoards = useSelector(state => state.listBoards.listBoards)

  

  const addNewBoard = (e) => {
    e.preventDefault()
    const newBoard = {
      id: Date.now(),
      name: nameBoard,
      tasks: [],
      is_editing: true
    }
    dispatch(addBoardAction(newBoard))
    setNameBoard("")
  }
  
  const namedBoard = (board) => {
    board.name = nameBoard
    board.is_editing = false
    setNameBoard([...nameBoard])
    setNameBoard("")
  }



  const deleteBoard = (b) => {
    dispatch(removeListBoardAction(b.id))
  }




  return (
    <div className="App">
      <div className='form'> 
        <BiPlus className="addBoard" onClick={(e) => addNewBoard(e)}/>
      </div>
      <div>
        {listBoards.length > 0 
          ? 
            <div className='listBoard'>
              {listBoards.map(board => 
                  <ListBoards board={board} 
                  deleteBoard={deleteBoard} 
                  nameBoard={nameBoard}
                  setNameBoard={setNameBoard}
                  namedBoard={namedBoard}
                  key={board.id}
                  />
              )}
            </div>
          :
          <div className='massage'>
            <span>Списки отсутствуют</span>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
