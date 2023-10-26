


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
import {useState} from 'react';
import { SortableItem } from './SortableItem';
import DisplayCard from './DisplayCard';


function Mentors({mentors,setMentors}){
  const [skills, setSkills ] = useState(["Mentor1", "Mentor2", "Mentor3",'Mentor4','Mentor5++']);

  return (
    // <DndContext
    //   collisionDetection={closestCenter}
    //   onDragEnd={handleDragEnd}
    // >
    //   <Box  style={{}} >
       
    //     <SortableContext
    //       items={mentors}
    //       strategy={horizontalListSortingStrategy}
    //     >
    //       {mentors.map(mentor => 
    //       <TableRow
    //       key={mentor.id}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //       >
    //         <TableCell component="th" scope="row" > 
    //           <SortableItem key={mentor.id} id={mentor.id} data={mentor}/>
    //           </TableCell>

    //       </TableRow>
          
          
    //       )}
    //     </SortableContext>
    //   </Box>
      
    // </DndContext>
   
      <Box  style={{}} >
       
          {mentors.map(mentor => 
          <TableRow
          key={mentor.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row" > 
              <DisplayCard key={mentor.id} data={mentor} c={'white'}/>
            </TableCell>

          </TableRow>
          
          
          )}
        
      </Box>
      
    
  );

  function handleDragEnd(event) {
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER: " + over.id);
  
    if (active.id !== over.id) {
      setMentors((items) => {
        const activeMentor = items.find((mentor) => mentor.id === active.id);
        const overMentor = items.find((mentor) => mentor.id === over.id);
  
        if (activeMentor && overMentor) {
          const activeIndex = items.indexOf(activeMentor);
          const overIndex = items.indexOf(overMentor);
  
          // Swap the elements in the array
          const newItems = [...items];
          [newItems[activeIndex], newItems[overIndex]] = [newItems[overIndex], newItems[activeIndex]];
  
          console.log(newItems);
          return newItems;
        }
  
        return items; // No changes if active or over mentee is not found
      });
    }
  }



  

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
// function handleDragEnd(event) {
//     console.log("Drag end called");
//     const { active, over } = event;
//     console.log("ACTIVE: " + active.id);
//     console.log("OVER: " + over.id);

//     if (active.id !== over.id) {
//         setSkills((items) => {
//             const activeIndex = items.indexOf(active.id);
//             const overIndex = items.indexOf(over.id);

//             // Swap the elements in the array
//             const newItems = [...items];
//             [newItems[activeIndex], newItems[overIndex]] = [newItems[overIndex], newItems[activeIndex]];

//             console.log(newItems);
//             return newItems;
//         });
//     }
// }

}

export default Mentors;
