import { reactive, watch } from 'vue';
import { LocalStorageClient } from '../core/LocalStorageClient';
import initialState from '../utils/initialState';

const storageKey = 'kek';
const storageClient = new LocalStorageClient( storageKey );

let baseState = storageClient.get() ?? initialState;
let state = reactive( baseState );

if ( storageClient.get() ) {
    state = reactive( storageClient.get() );
}

watch(state, ( newState ) => {
    storageClient.save( newState )
})

export default state;
