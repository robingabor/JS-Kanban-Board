// class to represent an item

import KanbanAPI from "../api/KanbanAPI.js";

export default class Item{

    constructor(id,content){
        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban__item-input");

        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.content = content;

        // Event handlers        
        // Blur event happens when we click on an item then click away 
        const onBlur = ()=>{
            const newContent = this.elements.input.textContent.trim();

            console.log(this.content);
            console.log(newContent);
            // Check if the content changed or not - if yes we have to update our localStorage
            if(this.content == newContent)
            {
                return;
            }
            
            this.content = newContent;

            // Finally lets update our localStorege
            KanbanAPI.updateItem(id,{
                content : this.content
            });
            
        }

        // EVENT LISTENERS
        this.elements.input.addEventListener("blur", onBlur);

    }

    // HTML for the column
    // We want to return a HTML element as an Object containing a basic structure for a particular column
    static createRoot(){
        // this range thing is a techniquie generating HTML using JS
        const range = document.createRange();

        // make the parent of the body the document becomes the context node
        range.selectNode(document.body);

        
        return range.createContextualFragment(`
                     
                     
            <div class="kanban__item" draggable="true">                              
                <div class="kanban__item-input" contenteditable></div>        
            </div>       
            
        `).children[0];
    }

}