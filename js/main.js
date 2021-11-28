import KanbanAPI from "./api/KanbanAPI.js";
import Kanban from "./view/Kanban.js";

// KanbanAPI.updateItem(47109,{
//     "columnId" :1,
//     "position":0,
//     "content":"Updated content"
// });

// KanbanAPI.deleteItem(47109);

new Kanban(document.querySelector(".kanban"));


