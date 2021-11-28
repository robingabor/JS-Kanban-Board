export default class KanbanAPI{
    static getItems(columnID){
        const column = read().find(column => column.id == columnID );

        if(!column){
            return [];
        }

        return column.items;
    }

    static insertItem(columnID,content){
        const data = read();
        const column = data.find(column => column.id == columnID );
        // we want to push this item into 
        const item = {
            id : Math.floor(Math.random() * 100000),
            content
        }

        if(!column){
            throw new Error("Column does not exist");
        }
        // Insert our item into our column
        column.items.push(item);

        // Finally save to local storage
        save(data);

        return item;
    }

    static updateItem(itemID, newProps){
        // get the data from local storage
        const data = read();
        // destructuring assignment
        // sets item = arr[0]
        // and currentColumn = arr[1]
        const [item,currentColumn] = (()=>{
            for(const column of data){
                const item = column.items.find(item => item.id == itemID);

                if(item){
                    return [item,column];
                }
            }
        })();

        if(!item){
            throw new Error("Item not found");
        }

        // Update the item.content
        item.content = newProps.content === undefined ? item.content : newProps.content;

        // Update column and position
        // when drag and drop
        if(newProps.columnId !== undefined && newProps.position !== undefined){
            const targetColumn = data.find(column => column.id == newProps.columnId);
            console.log(targetColumn);

            if(!targetColumn){
                throw new Error("Target column not found");
            }

            // delete the item from its current column
            currentColumn.items.splice(currentColumn.items.indexOf(item),1);

            // Move item into its new column and position -> we wpnt delete with splice just insert a new item
            targetColumn.items.splice(newProps.position,0,item);

        }

        // Save the updated data
        save(data);

    }

    static deleteItem(itemID){
        const data = read();

        for(const column of data){
            const item = column.items.find(item => item.id == itemID);
            
            if(item){
                // if the item has been found then lets delete with splice
                column.items.splice(column.items.indexOf(item),1);
            }            
            
        }
        // finally lets save the modified data to localStorage
        save(data);
    }
}

// FUNCTIONS TO INTERACT LOCAL STRORAGE DIRECTLY

// READ from local storage
function read(){
    const json = localStorage.getItem("kanban-data");
    // we going to return a default array if local storage is not set yet
    // when user load the kanban board for the first time
    if(!json){
        return [
            {
                id:1,
                items:[]
            },
            {
                id:2,
                items:[]
            },
            {
                id:3,
                items:[]
            }
        ];
    }

    // lets parse our string to a JS object
    return JSON.parse(json);

}

// SAVE into local storage
function save(data){
    localStorage.setItem("kanban-data",JSON.stringify(data) );
}