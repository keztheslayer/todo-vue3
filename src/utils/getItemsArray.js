import state from "../store/state";

export const getItemsArray = ( folderId ) => {
    let placeToSearch = null;
        
    if ( folderId ) {
        placeToSearch = state.folders.find( folder => folder.id === folderId )
    }
    else {
        placeToSearch = state;
    }

    return placeToSearch.items;
}
