import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Calendar, CheckSquare, List, Tag, Trash, Type } from 'react-feather'
import Chip from './Chip'
import Editable from './Editable'
import Modal from './Modal'

function CardInfo(props) {

    const [activecolor, setactivecolor] = useState("");
    const colors = ["#EF233C", "#FF1493", "#FF4500", "#7CFC00", "#7EB2DD", "#E36414", "#FFC857"];

    const [values, setvalues] = useState({ ...props.card });
// ................function to calculate percentage width of the progressbar.................................
    const calculatePercent = () => {
        if (values.tasks?.length === 0) return "0";

        const completed = values.tasks?.filter((item) => item.completed)?.length;
        return (completed / values.tasks?.length) * 100 + "";
    }


// ................function to add label in the cards.............................................................

const addLabel=(value,color)=>{
const index =values.labels?.findIndex((item)=>item.text===value);
if(index > -1) return;

const label={
    text:value,
    color,
};

setvalues({...values,labels:[...values.labels,label]});
setactivecolor("");
}

// ................function to remove label from the cards.............................................................

const removeLabel=(text)=>{
   const templabels=values.labels?.filter((item)=>item.text!==text);
    setvalues({...values,labels:templabels});
};

// ................function to add a new task......................................................

const addTask=(value)=>{
const task={
    id:Date.now()+Math.random(),
    text:value,
    completed:false
};

setvalues({...values,tasks:[...values.tasks,task]});

}
// ................function to remove any task......................................................
const removeTask=(id)=>{
    const temptasks=values.tasks?.filter((item)=>item.id!==id);
    setvalues({...values,tasks:temptasks})

}
// ...................function to update tasks......................................................
const updateTask=(id,completed)=>{
    const index =values.tasks?.findIndex((item)=>item.id===id);
    if(index<0) return;

    const temptasks=[...values.tasks];
    temptasks[index].completed=completed;
    setvalues({...values,tasks:temptasks});
}

    useEffect(()=>{
    props.updateCard(props.card.id,props.boardId,values);
    },[values]);


    return (
        <Modal onClose={() => props.onClose()}>
            <div className='cardinfo' >
                <div className='cardinfo_box'>
                    <div className='cardinfo_box_title'>
                        <Type />
                        Title
                    </div>
                    <div className='cardinfo_box_body'>
                        <Editable text={values.title} default={values.title} placeholder="Enter Title" buttonText="Set Title" 
                        onSubmit={(value)=>setvalues({...values,title:value})}
                        />
                    </div>
                </div>
                <div className='cardinfo_box'>
                    <div className='cardinfo_box_title'>
                        <List />
                        Description
                    </div>
                    <div className='cardinfo_box_body'>
                        <Editable text={values.desc} default={values.desc} placeholder="Enter Description" buttonText="Set Description"
                        onSubmit={(value)=>setvalues({...values,desc:value})}
                        />
                    </div>
                </div>
                <div className='cardinfo_box'>
                    <div className='cardinfo_box_title'>
                        <Calendar />
                        Date
                    </div>
                    <div className='cardinfo_box_body'>
                        <input type="date" defaultValue={values.date ? new Date(values.date).toISOString().substr(0, 10) : ""}
                        onChange={(event)=>setvalues({...values,date:event.target.value})}
                        />
                    </div>
                </div>
                <div className='cardinfo_box'>
                    <div className='cardinfo_box_title'>
                        <Tag />
                        Labels
                    </div>
                    <div className='cardinfo_box_labels'>
                        {values.labels?.map((item, index) => (
                            <Chip
                                close
                                onClose={() =>removeLabel(item.text)}
                                key={item.text + index}
                                color={item.color}
                                text={item.text}
                            />
                        ))}
                    </div>
                    <div className='cardinfo_box_colors'>
                        {colors.map((color, index) =>
                            <li key={index}
                                style={{ backgroundColor: color }}
                                className={color === activecolor ? "active" : ""}
                                onClick={() => setactivecolor(color)}>
                            </li>)}
                    </div>
                    <div className='cardinfo_box_body'>
                        <Editable text="Add Label" placeholder="Enter Label" buttonText="Add" 
                        onSubmit={(value)=>{addLabel(value,activecolor)}}
                        />
                    </div>
                </div>

                <div className='cardinfo_box'>
                    <div className='cardinfo_box_title'>
                        <CheckSquare />
                        Tasks
                    </div>
                    <div className='cardinfo_box_progress_bar' >
                        <div className='cardinfo_box_progress' style={{ width: calculatePercent() + "%",backgroundColor:calculatePercent()=="100"?"limegreen":""}} />
                    </div>
                    <div className='cardinfo_box_list'>
                        {values.tasks.map((item) =>
                            <div key={item.id} className='cardinfo_task' >
                                <input type="checkbox" defaultValue={item?.completed} defaultChecked={item?.completed}
                                onChange={(event)=>updateTask(item.id,event.target.checked)}
                                />
                                <p>{item.text}</p>
                                <Trash  onClick={()=>removeTask(item.id)}/> 
                            </div>
                        )}
                    </div>

                    <div className='cardinfo_box_body'>
                        <Editable text={"Add new task"} placeholder="Enter Task" buttonText="Add Task"
                        onSubmit={(value)=>addTask(value)}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CardInfo
