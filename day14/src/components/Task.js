import { Draggable } from 'react-beautiful-dnd';
function Task({
  task,
  index
}) {
  console.log(window.globalCount++);
  return <Draggable draggableId={task.id} index={index}>
      {provided => {
      console.log(window.globalCount++);
      return <li className='task-item' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          {task.content}
        </li>;
    }}
    </Draggable>;
}
export default Task;