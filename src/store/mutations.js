import state from './state'

const getItemsArray = ( folderId ) => {
    let placeToSearch = null;
        
    if ( folderId ) {
        placeToSearch = state.folders.find( folder => folder.id === folderId )
    }
    else {
        placeToSearch = state;
    }

    return placeToSearch.items;
}

const mutations = {
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
    addFolder( title ) {
        const id = new Date().valueOf();
        const folder = {
            title,
            id,
            items: [],
        }

        state.folders.push(folder);
    },
    removeItem( id, folderId ) {
        const array = getItemsArray( folderId );
        const index = array.findIndex( item => item.id === id);
        array.splice( index, 1 );
    },
    removeFolder( folderId ) {
        const index = state.folders.findIndex( folder => folder.id === folderId);
        state.folders.splice( index, 1 );
    }
}

export default mutations;
