<template>
    <div class="todo">
        <todo-item />
    </div>
</template>
<script>
import TodoItem from './TodoItem.vue';

export default {
    name: 'TodoList',
    components: {
        TodoItem,
    },
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
