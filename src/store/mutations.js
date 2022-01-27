import state from './state'

const getItemsLocation = ( folderId ) => {
    let placeToSearch = null;
        
    if ( folderId ) {
        placeToSearch = state.folders.find( folder => folder.id === folderId )
    }
    else {
        placeToSearch = state;
    }

    return placeToSearch;
}

const mutations = {
    checkItem( id, folderId ) {
        const neededItem = getItemsLocation( folderId ).items.find( item => item.id === id);

        neededItem.done = !neededItem.done;
    },
    addItem( title, folderId ) {
        const id = new Date().valueOf();

        getItemsLocation( folderId ).items.push({
            id,
            title,
            done: false,
        })
    }
}

export default mutations;
