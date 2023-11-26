import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Clock, CheckSquare } from 'react-feather';
import CardInfo from './CardInfo';
import Chip from './Chip';
import Dropdown from './Dropdown';

function Card({ card, removeCard, boardId, handleDragEnd, handleDragEnter, updateCard }) {
    const [showDropdown, setshowDropdown] = useState(false);
    const [showModal, setshowModal] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setshowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    });
    return (
        <>
            {showModal && (
                <CardInfo card={card} boardId={boardId} updateCard={updateCard} onClose={() => { setshowModal(false) }} />
            )}

            <div className='card' ref={cardRef} draggable
                onDragEnd={() => { handleDragEnd(card?.id, boardId) }}
                onDragEnter={() => { handleDragEnter(card?.id, boardId) }}
                onClick={(event) => { 
                    if(event.target.nodeName!=="svg" && event.target.parentNode.className!=="card_top_more") setshowModal(true);
                 }}
            >

                <div className='card_top'>
                    <div className='card_top_labels'>
                        {card?.labels?.map((label, index) => (
                            <Chip text={label.text} color={label.color} key={index} />
                        ))}
                    </div>
                    <div className="card_top_more" onClick={() => { setshowDropdown(true) }} >
                        <MoreHorizontal />
                        {showDropdown && (
                            <Dropdown onClose={() => { setshowDropdown(false) }}>
                                <div className='card_dropdown' >
                                    <p onClick={() => { removeCard(card.id, boardId) }}>Delete Card</p>
                                </div>
                            </Dropdown>
                        )}
                    </div>
                </div>
                <div className='card_title'>
                    {card?.title}
                </div>
                <div className='card_footer'>
                    {card?.date && (
                        <p><Clock />{card?.date} </p>
                    )}
                    {
                     card?.tasks.length>0 && (
                    <p>
                        <CheckSquare />
                        {card?.tasks?.filter((item) => item.completed).length}/{card?.tasks?.length}
                    </p>

                    )}
                </div>
            </div>
        </>
    )
}

export default Card;