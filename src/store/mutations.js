import state from './state'

const mutations = {
    checkItem(id) {
        const neededItem = state.items.find( item => item.id === id);

        neededItem.done = !neededItem.done;
    }
}

export default mutations;
