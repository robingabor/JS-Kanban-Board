// define the entry point for user interface

import Column from "./Column.js";

export default class Kanban{
    // root refers the div element with tha kanban class
    constructor(root){
        this.root = root;

        Kanban.columns().forEach(column =>{
            // TODO : create an instance of Column Class
            const columnView = new Column(column.id,column.title);

            // Lets append the generated HTMl to our root element alias the kanban container
            this.root.appendChild(columnView.elements.root);

        });
    }

    // gonna return an array with every single column and it s name and titel
    static columns(){
        return [
            {
                id:1,
                title: "Not started"
            },
            {
                id:2,
                title: "In Progress"
            },
            {
                id:3,
                title: "Finished"
            }
        ];
    }

}