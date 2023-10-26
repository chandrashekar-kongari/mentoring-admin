


import {Box, Container, TableCell, TableRow} from '@mui/material';
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable";
import {useEffect, useState} from 'react';
import { SortableItem } from './SortableItem';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { saveMentees } from '../features/AppSlice';
function Mentees({mentees,setMentees}){
//   const [skills, setSkills ] = useState(["Mentee1", "Mentee2", "Mentee3",'Mentee4','Mentee5++']);
    // const [mentees,setMentees]=useState([])
    const dispatch=useDispatch()
    const val=useSelector(state=>state.mentees)
    useEffect(()=>{
        
        // setMentees(val)
        console.log('mentees ',mentees)
    },[val])

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Box  >
       
        <SortableContext
          items={mentees}
          strategy={horizontalListSortingStrategy}
        >
          {/* We need components that use the useSortable hook */}
          {mentees.map((mentee,index) => 
          <TableRow
          key={mentee.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row" > 
              <SortableItem key={mentee.name} id={mentee.id} data={mentee}/>
              </TableCell>

          </TableRow>
          
          
          )}
        </SortableContext>
      </Box>
      
    </DndContext>
  );

  

//   function handleDragEnd(event) {
    
//     console.log("Drag end called");
//     const {active, over} = event;
//     console.log("ACTIVE: " + active.id);
//     console.log("OVER :" + over.id);

//     if(active.id !== over.id) {
//       setSkills((items) => {
//         const activeIndex = items.indexOf(active.id);
//         const overIndex = items.indexOf(over.id);
//         [items[activeIndex], items[overIndex]] = [items[overIndex], items[activeIndex]];

//         console.log(arrayMove(items, activeIndex, overIndex));
//         return arrayMove(items, activeIndex, overIndex);
//         // items: [2, 3, 1]   0  -> 2
//         // [1, 2, 3] oldIndex: 0 newIndex: 2  -> [2, 3, 1] 
//       });
      
//     }
//   }
function handleDragEnd(event) {
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER: " + over.id);
  
    if (active.id !== over.id) {
      setMentees((items) => {
        const activeMentee = items.find((mentee) => mentee.id === active.id);
        const overMentee = items.find((mentee) => mentee.id === over.id);
  
        if (activeMentee && overMentee) {
          const activeIndex = items.indexOf(activeMentee);
          const overIndex = items.indexOf(overMentee);
  
          
          const newItems = [...items];
          [newItems[activeIndex], newItems[overIndex]] = [newItems[overIndex], newItems[activeIndex]];
  
          console.log(newItems);
          return newItems;
        }
  
        return items; 
      }
      );
    }
  }

}

export default Mentees;
