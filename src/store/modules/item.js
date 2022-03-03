
import { getItemsArray } from '../../utils/getItemsArray';

export default {
    checkItem( id, folderId ) {
        const neededItem = getItemsArray( folderId ).find( item => item.id === id);

        neededItem.done = !neededItem.done;
    },
    addItem( title, folderId ) {
        const id = new Date().valueOf();

        getItemsArray( folderId ).push({
            id,
            title,
            done: false,
        })
    },
    removeItem( id, folderId ) {
        const array = getItemsArray( folderId );
        const index = array.findIndex( item => item.id === id);
        array.splice( index, 1 );
    },
    editItem( id, folderId, title ) {
        const array = getItemsArray( folderId );
        const item = array.find( item => item.id === id);
        
        item.title = title;
    },
}
