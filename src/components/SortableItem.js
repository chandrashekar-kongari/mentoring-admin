import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import { useEffect, useState } from "react";

import { Box, Button,Card } from "@mui/material";
import DisplayCard from "./DisplayCard";

export function SortableItem(props) {
    // props.id
    // JavaScript

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        
    }

    const [clicked,setClicked]=useState(false)
    const handleClick=(id)=>{
        console.log('id ',id)
        setClicked(true)
    }
    const s={
        'backroundColor':clicked?'red':'green'
    }

    const colors=['#FFFFF0','#FFFFE0','#FFFAF0','#FFFACD','#FFF8DC','#FFF0F5','#FFE4E1','#FFF5EE','#F5F5DC','#FAEBD7','#FFEFD5','#FFEBCD','#FFE4B5','#FFDAB9','#EEE8AA','#F0E68C','#FFD700','#FFF8DC','#DAA520','#B8860B','#9400D3','#9370DB','#7B68EE','#483D8B']
    function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }
    let c=''
    useEffect(()=>{
        c=getRandomColor()
    },[])

    return (
        <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {/* <Box  style={{marginBottom:'3rem',padding:'2rem',backgroundColor:props.data.c}}> */}
            {/* {props.data.name} */}
            <DisplayCard c={props.data.color} data={props.data}/>
            
            {/* </Box> */}
        </Box>
    )
}