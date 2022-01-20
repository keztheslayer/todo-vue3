import state from './state'

const mutations = {
    checkItem( id, folderId ) {
        let placeToSearch = null;
        
        if ( folderId ) {
            placeToSearch = state.folders.find( folder => folder.id === folderId )
        }
        else {
            placeToSearch = state;
        }

        const neededItem = placeToSearch.items.find( item => item.id === id);

        neededItem.done = !neededItem.done;
    }
}

export default mutations;

// let placeToSearch;

// if (folderid) {
//     placeToSearch = папка,,,
// }
// else {
//     placeToSearch = state;
// }

// placeToSearch.items.find()
