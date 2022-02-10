<template>
    <div class="folder" >
        <div class="folder__header">
            <div class="folder__icon"></div>
            <div class="folder__title">{{ title }}</div>
            <button 
                class="folder__expand"
                @click="isOpened = !isOpened"
                :class="{'folder__expand_opened': isOpened}"
            ></button>
            <div v-if="items.length > 0" class="folder__counter">{{ itemsCount }}</div>
        </div>
        <transition
            name="fade"
        >
            <div
                v-if="isOpened"
                class="folder__items"
            >
                <todo-item
                    v-for="item in items"
                    :key="item.id"
                    :folder-id="id"
                    v-bind="item"
                />
                <add-item
                    @add="addItem"
                />
            </div>
        </transition>
    </div>
</template>
<script>
import TodoItem from './TodoItem.vue';
import { computed, toRefs, ref } from 'vue';
import mutations from '../store/mutations';
import AddItem from './AddItem.vue';

export default {
    components : {
        TodoItem,
        AddItem,
    },
    props: {
        title: String,
        id: Number,
        isOpen: Boolean,
        items: Array
    },
    setup( props ) {
        const isOpened = ref(false);
        const { items } = toRefs(props);
        const itemsCount = computed(() => {
            const doneItems = items.value.filter( item => item.done );

            return `${doneItems.length}/${items.value.length}`
        });
        const addItem = ( newItemName ) => {
            mutations.addItem( newItemName, props.id )
        }

        return {
            itemsCount,
            isOpened,
            addItem,
        }
    }
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
        white-space: nowrap;
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
        transition: transform 0.3s;
        filter: var(--icon-filter);

        &_opened {
            transform: rotate(180deg);
        }
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
.fade-enter-active,
.fade-leave-active {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.4s ease;
    transition-property: opacity, transform;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-15px);
}
</style>
