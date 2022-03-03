import state from '../state';

export default {
    addFolder( title ) {
        const id = new Date().valueOf();
        const folder = {
            title,
            id,
            items: [],
        }

        state.folders.push(folder);
    },
    removeFolder( folderId ) {
        const index = state.folders.findIndex( folder => folder.id === folderId);
        state.folders.splice( index, 1 );
    },
    editFolder(folderId, title) {
        const item = state.folders.find( folder => folder.id === folderId);
        item.title = title;
    },
}
