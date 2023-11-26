import React, { useRef } from 'react'
import { useEffect } from 'react'

function Dropdown(props) {
    const dropdownRef = useRef(null);

    return (
        <div ref={dropdownRef} className='dropdown' style={{ position: "absolute", top: "100%", right: "0",zIndex:"5" }}>
            {props.children}
        </div>
    )
}

export default Dropdown
