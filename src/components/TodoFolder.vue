<template>
    <div class="folder" >
        <div class="folder__header">
            <div class="folder__control">
                <div class="folder__icon">{{ itemsCount }}</div>
                <button
                    class="folder__button-remove"
                    @click="removeFolder"
                />
            </div>

            <div class="folder__title">{{ title }}</div>
            <button
                class="folder__expand"
                @click="isOpened = !isOpened"
                :class="{'folder__expand_opened': isOpened}"
            ></button>
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
                    @add-item="addItem"
                    :folder-create="false"
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

            return `${doneItems.length} / ${items.value.length}`
        });
        const addItem = ( newItemName ) => {
            mutations.addItem( newItemName, props.id )
        }

        const removeFolder = () => {
            mutations.removeFolder( props.id )
        }

        return {
            itemsCount,
            isOpened,
            addItem,
            removeFolder,
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
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 24px;
        font-size: 10px;
        color: var(--color-primary);
        z-index: 1;

        &::before {
            position: absolute;
            width: 100%;
            height: 100%;
            content: '';
            background: url('../assets/icons/folder.svg') no-repeat center/contain;
            z-index: -1;
            filter: var(--icon-filter);
        }
    }

    &__control {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 24px;
        margin-right: 12px;

        &:hover {
            .folder__icon {
                display: none;
            }

            .folder__button-remove {
                display: block;
            }
        }
    }

    &__button-remove {
        display: none;
        width: 18px;
        height: 18px;
        background: url('../assets/icons/trash.svg') no-repeat center/contain;
        filter: var(--icon-filter);
        cursor: pointer;
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
