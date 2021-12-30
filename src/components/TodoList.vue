<template>
    <div class="todo">
        {{ items }}
        <todo-item
            v-for="item in items"
            :key="item.id"
            :title="item.title"
            :done="item.done"
            :id="item.id"
        />
    </div>
</template>
<script>    
import getters from '../store/getters';
import TodoItem from './TodoItem.vue';

export default {
    name: 'TodoList',
    components: {
        TodoItem,
    },
    setup() {
        const items = getters.items;
        
        return {
            items,
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
