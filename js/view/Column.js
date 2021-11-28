// UI for an individual column 

import KanbanAPI from "../api/KanbanAPI.js";
import Item from "./Item.js";

export default class Column{
    constructor(id,title){
        this.elements = {};
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector(".kanban__column-title");
        this.elements.items = this.elements.root.querySelector(".kanban__column-items");
        this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;

        // TODO : add item
        this.elements.addItem.addEventListener("click", (e)=>{
            // There is 2 aspect of adding a new item:
            // 1. Save to localStorage
            const newItem = KanbanAPI.insertItem(id,"");

            // 2. render
            this.renderItem(newItem);
        });

        // render the items into the column
        KanbanAPI.getItems(id).forEach( item => {

            console.log(item.content);            
            
            this.renderItem(item);
        });        
    }

    // HTML for the column
    // We want to return a HTML element as an Object containing a basic structure for a particular column
    static createRoot(){
        // this range thing is a techniquie generating HTML using JS
        const range = document.createRange();

        // make the parent of the body the document becomes the context node
        range.selectNode(document.body);

        
        return range.createContextualFragment(`
            <div class="kanban__column">         
                <div class="kanban__column-title"></div> 
        
                <div class="kanban__column-items">  
                                
                        
                </div> 
        
                <button class="kanban__add-item" type="button">+ Add</button> 
            </div> 
        `).children[0];
    }

    renderItem(data){
        // TODO : Creatae Item Instance
        const item = new Item(data.id,data.content);
        // lets append our item to .kanban__columns-items div
        this.elements.items.appendChild(item.elements.root);
    }

}
