<template>
    <div class="todo">
        {{ items }}
        <hr>
        {{ folders }}
        <todo-folder
            v-for="folder in folders"
            :key="folder.id"
            :isOpen="true"
            v-bind="folder"
        />
        <todo-item
            v-for="item in items"
            :key="item.id"
            v-bind="item"
        />
        <add-item
            @add="addItem"
        />
    </div>
</template>
<script>    
import getters from '../store/getters';
import mutations from '../store/mutations';
import TodoItem from './TodoItem.vue';
import TodoFolder from './TodoFolder.vue';
import AddItem from './AddItem.vue';

export default {
    name: 'TodoList',
    components: {
        TodoItem,
        TodoFolder,
        AddItem,
    },
    setup() {
        const { items, folders } = getters;
        const addItem = ( newItemName ) => {
            mutations.addItem( newItemName )
        }
        
        return {
            items,
            folders,
            addItem,
        }
    }
}

</script>

<style lang="scss">
    .todo {
        width: 500px;
        padding: 36px 24px 48px;
        box-shadow: 12px 8px 40px rgba(0, 0, 0, 0.2);
        background-color: var(--color-bg-app);
        color: var(--color-primary);
    }
</style>
