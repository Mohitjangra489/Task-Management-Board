import React from 'react'
import { X } from 'react-feather'

function Modal(props) {
  return (
    <div className='modal' onClick={()=>(props.onClose ? props.onClose():"")}>
      <div className='modal_content custom-scroll' onClick={(event)=>{event.stopPropagation()}}>
        <div className='modal_close'> <X  onClick={()=>(props.onClose ? props.onClose():"")}/></div>
        <div>
        {props.children}
        </div>
      
      </div>
    </div>
  )
}

export default Modal
