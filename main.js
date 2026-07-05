import {
  addNewTask,
  ClearCompleted,
  renderTasksStasus,
  togglelistener,
} from "./scripts/listeners";
import { initTaskListiner, renderTasks } from "./scripts/utils";

/*
saveTo DB
fetch from DB

toggle Dark theme
Toggle Theme save in DB 
get toggle theme form DB rerender

Add new data to DB Array of objects eche object has data and is completed

render data from DB
with number of items


is Completed Data or not 
save to db 
add class completed at HTML

Delete Task
render data

all 
active 
completed 
clear 



 */
addNewTask();
togglelistener();
initTaskListiner();
ClearCompleted();
renderTasksStasus();
