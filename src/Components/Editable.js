import React from 'react'
import { useState } from 'react';
import { X } from 'react-feather';

function Editable(props) {
    const [showEdit, setshowEdit] = useState(false);
    const [input, setinput] = useState(props.default || "");
    return (
        <div className='editable'>
            {
                showEdit ?
                    (
                        <form className={`editable_edit ${props.editClass || ""}`}
                            onSubmit={(event) => {
                                event.preventDefault();
                                if (props.onSubmit && input) props.onSubmit(input);
                                setshowEdit(false);
                                setinput("");
                            }}
                        >
                            <input type="text" value={input} placeholder={props.placeholder || "Enter item"}
                                onChange={(e) => { setinput(e.target.value) }} autoFocus />
                            <div className="editable_edit_footer">
                                <button type="submit">{props.buttonText || "Add"}</button>
                                <X onClick={() => { setshowEdit(false) }} />
                            </div>

                        </form>
                    ) : (
                        <p className={`editable_display ${props.displayClass || ""}`} onClick={() => { setshowEdit(true) }}>{props.text || "Add item"}</p>
                    )}
        </div>
    )
}

export default Editable
