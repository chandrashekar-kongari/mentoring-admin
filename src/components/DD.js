


import {Container, TableCell, TableRow} from '@mui/material';
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


function DD(){
  const [skills, setSkills ] = useState(["Communication", "Typing", "Reading",'writing','A++']);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Container className="p-3" style={{"width": "50%"}} align="center">
       
        <SortableContext
          items={skills}
          strategy={horizontalListSortingStrategy}
        >
          {/* We need components that use the useSortable hook */}
          {skills.map(language => 
          <TableRow
          key={language}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row" align="center"> 
              <SortableItem key={language} id={language}/>
              </TableCell>



            

          </TableRow>
          
          
          )}
        </SortableContext>
      </Container>
      
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
        setSkills((items) => {
            const activeIndex = items.indexOf(active.id);
            const overIndex = items.indexOf(over.id);

            // Swap the elements in the array
            const newItems = [...items];
            [newItems[activeIndex], newItems[overIndex]] = [newItems[overIndex], newItems[activeIndex]];

            console.log(newItems);
            return newItems;
        });
    }
}

}

export default DD;
