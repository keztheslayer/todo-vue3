<template>
    <div class="folder" >
        <div class="folder__header">
            <div class="folder__icon"></div>
            <div class="folder__title">{{ title }}</div>
            <button class="folder__expand"></button>
            <div v-if="items.length > 0" class="folder__counter">{{ items.length }} </div>
        </div>
        <div class="folder__items">
            <todo-item
                v-for="item in items"
                :key="item.id"
                v-bind="item"
            />
        </div>
    </div>
</template>
<script>
import TodoItem from './TodoItem.vue';
export default {
    components : {
        TodoItem
    },
    props: {
        title: String,
        id: Number,
        isOpen: Boolean,
        items: Array
    },
}
</script>
<style lang="scss">
@import '../styles/variables.scss';
.folder {
    margin: 16px 0;

    &__header {
        display: flex;
        align-items: center;
        margin-top: 20px;
    }

    &__items {
        margin-left: 20px;
    }

    &__icon {
        width: 24px;
        height: 18px;
        background: url('../assets/icons/folder.svg') no-repeat center/contain;
        margin-right: 12px;
        filter: var(--icon-filter);
    }

    &__title {
        display: flex;
        flex-grow: 1;
        align-items: center;
        color: var(--color-primary);
        @include font-default();

        &:after {
            content: '';
            flex-grow: 1;
            width: 100%;
            height: 1px;
            display: block;
            margin: 0 12px;
            background-color: var(--color-ghost);
            opacity: 0.5;
        }
    }

    &__expand {
        width: 12px;
        height: 12px;
        border: none;
        outline: none;
        cursor: pointer;
        background: url('../assets/icons/arrow.svg') no-repeat center/contain;
    }

    &__counter {
        width: 20px;
        height: 20px;
        border-radius: 6px;
        background: var(--color-primary);
        color: var(--color-bg-app);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 12px;
        font-size: 11px;
    }
}
</style>
