import React from 'react'
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { MoreHorizontal } from 'react-feather';
import Card from './Card';
import Dropdown from './Dropdown';
import Editable from './Editable';


function Board({ board,removeBoard,addCard,removeCard,handleDragEnd,handleDragEnter,updateCard}) {
  let cards = board.cards;
  const [showDropdown, setshowDropdown] = useState(false);
  const boardRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (boardRef.current && !boardRef.current.contains(event.target)) {
        setshowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  return (

    <div className='board' ref={boardRef}>
      <div className='board_top'>
        <p className='board_top_title'>{board?.title}
          <span>{`${board?.cards?.length}`}</span>
        </p>
        <div className="board_top_more" onClick={() => { setshowDropdown(true) }}>
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown >
              <div className='board_dropdown' >
                <p onClick={()=>{removeBoard(board.id)}}>Delete Board</p>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className='board_cards custom-scroll'>
        {cards.map((card) =>(
             <Card 
              card={card}
              key={card?.id}
              removeCard={removeCard}
              boardId={board.id}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
              updateCard={updateCard}
              />
        ))}
        <Editable
          displayClass="board_cards_add"
          text="Add card"
          placeholder="Enter Card Title"
          onSubmit={(value)=>{addCard(value,board.id)}}  
        />
      </div>
    </div>
  )
}

export default Board;
