import './App.css';
import { useState } from 'react';
import Board from './Components/Board';
import Editable from './Components/Editable';
import { useEffect } from 'react';
import {Layers} from 'react-feather';

function App() {

  const [target,setTarget]=useState({});
  const [board, setboard] = useState( JSON.parse(localStorage.getItem("Task_Management_Board"))||[]);

  // ......................function to add a new card in any board
  const addCard = (title, boardId) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      tasks: [],
      labels: [],
      desc: "",
      date: "",
    };

    const index = board.findIndex((item) => item.id == boardId);
    if (index < 0) return;
    const tempboards = [...board]
    tempboards[index].cards.push(card);
    setboard(tempboards);
  };

  // ......................function to remove a card from any board

  const removeCard = (cardId, boardId) => {
    const boardindex = board.findIndex((item) => item.id === boardId);
    if (boardindex < 0) return;

    const cardindex = board[boardindex]?.cards.findIndex((item) => item.id === cardId);
    if (cardindex < 0) return;

    const tempboards = [...board];
    tempboards[boardindex]?.cards?.splice(cardindex, 1);
    setboard(tempboards);

  }
  // ......................function to add a new board 
  const addBoard = (title) => {
    setboard([...board, {
      id: Date.now() + Math.random() * 2,
      title,
      cards: [],
    }]);


  };

  // ......................function to remove any board 
  const removeBoard = (boardId) => {
    const tempboards = board.filter((item) => item.id !== boardId);
    setboard(tempboards);
  };
  //.........................function to handle dragenter on card
  const handleDragEnter=(cardId,boardId)=>{
   setTarget({
    cardId,
    boardId,
   });
  };

    //.........................function to handle dragend on card
  const handleDragEnd=(cardId,boardId)=>{
   let sourceBoardIndex,sourceCardIndex,targetBoardIndex,targetCardIndex;

   sourceBoardIndex=board?.findIndex((item)=>item?.id===boardId);
   if(sourceBoardIndex<0) return;

   sourceCardIndex=board[sourceBoardIndex]?.cards?.findIndex((item)=>item.id===cardId);
   if(sourceCardIndex<0) return;

   targetBoardIndex=board?.findIndex((item)=>item?.id===target.boardId);
   if(targetBoardIndex<0) return;

   targetCardIndex=board[targetBoardIndex]?.cards?.findIndex((item)=>item.id===target.cardId);
   if(targetCardIndex<0) return;
    
   const tempboards=[...board];
   const tempCard=tempboards[sourceBoardIndex].cards[sourceCardIndex];

   tempboards[sourceBoardIndex].cards.splice(sourceCardIndex,1);
   tempboards[targetBoardIndex].cards.splice(targetCardIndex,0,tempCard);

    setboard(tempboards);
  }
  // .....................function for updating a card.................
  const updateCard=(cardId,boardId,cardvalue)=>{
    const boardindex = board.findIndex((item) => item.id === boardId);
    if (boardindex < 0) return;

    const cardindex = board[boardindex]?.cards.findIndex((item) => item.id === cardId);
    if (cardindex < 0) return;

    const tempboards = [...board];
    tempboards[boardindex].cards[cardindex]=cardvalue;
    setboard(tempboards);
  }
useEffect(()=>{
  localStorage.setItem("Task_Management_Board",JSON.stringify(board));
},[board]);


  return (
    <div className='app '>
      <div className='app_navbar'>
        <div>
      <Layers/>
        </div>
        <div>
        <h1>Task Management Board</h1>
        </div>
      </div>
      <div className='app_outer custom-scroll'>
        <div className='app_boards'> 
          {board?.map((item) => (
            <Board key={item.id}
              board={item}
              removeBoard={removeBoard}
              addCard={addCard}
              removeCard={removeCard}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
              updateCard={updateCard}
              />
          ))}
          <div className='app_boards_board'>
            <Editable text="Add Board" placeholder="Enter Board Title" displayClass="app_boards_board_add" onSubmit={(value) => { addBoard(value) }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
