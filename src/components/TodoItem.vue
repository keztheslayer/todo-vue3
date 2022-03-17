<template>
    <div class="item"
        :data-item-id="id"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @drag="onDrag"
        @mousedown="onMouseDown"
        @dragenter="onDragEnter"
        draggable="true"
    >
        <check-box 
            :modelValue="done"
            @change="handleItemChange()" 
        />
        <div
            class="item__title"
            :class="{'item__title_done': done}"
            contenteditable="true"
            data-action="edit"
            @input="editItem"
            @keydown.enter.escape.prevent="editItem && $event.target.blur()"
        >
            {{ title }}
        </div>
        <div class="item__buttons-wrapper">
            <button
                class="item__button-remove"
                @click="removeItem"
            />
            <button
                data-action="move"
                class="item__button-move"
            />
        </div>
    </div>
</template>
<script>
import CheckBox from './CheckBox.vue';
import mutations from '../store/mutations';
import getters from '../store/getters';

export default {
    name: 'TodoItem',
    components: {
        CheckBox,
    },
    props: {
        done: Boolean,
        title: String,
        id: Number,
        folderId: {
            type: [Number, null],
            default: null,
        }
    },
    setup(props) {
        const items = getters.items;
        const handleItemChange = () => {
            mutations.checkItem( props.id, props.folderId );
        };
        const removeItem = () => {
            mutations.removeItem( props.id, props.folderId );
        };
        const editItem = (event) => {
           mutations.editItem( props.id, props.folderId, event.target.textContent );
        }
        const onDragStart = (event) => {
            event.target.style.opacity = 0.5;
            console.log('Drag start', event);
        }
        const onDragEnd = (event) => {
            event.target.removeAttribute('style');
            console.log('Drag end', event);
        }
        const onDrag = () => {
            //console.log('Drag', event);
        }
        const onDragEnter = (event) => {
            event.target.style.background = "purple";
            console.log('on drag enter', event);
        }
        const onMouseDown = (event) => {
            if ( event.target.dataset.action === 'edit' ) {
                return;
            }
            if (event.target.dataset.action !== 'move') {
                event.preventDefault();
            }
        }
        return {
            items,
            handleItemChange,
            removeItem,
            editItem,
            onDragStart,
            onDragEnd,
            onDrag,
            onMouseDown,
            onDragEnter,
        }
    }
}
</script>
<style lang="scss">
@import '../styles/variables.scss';
.item {
    display: flex;
    align-items: center;
    margin: 8px 0;

    &:hover {
        & .item__button-remove,
        & .item__button-move {
            display: block;
        }
    }

    &__title {
        color: var(--color-primary);
        margin-left: 12px;
        @include font-default();

        &_done {
            text-decoration: line-through;
            color: var(--color-ghost);
        }
    }

    &__buttons-wrapper {
        display: flex;
        align-items: center;
        margin-left: auto;
    }

    &__button-move,
    &__button-remove {
        display: none;
        width: 18px;
        height: 18px;
        filter: var(--icon-filter);
        cursor: pointer;  
        &:hover {
            opacity: 0.8;
        }
    }

    &__button-remove {
        background: url('../assets/icons/trash.svg') no-repeat center/contain;
        margin-right: 10px;
    }

    &__button-move {
        background: url('../assets/icons/move.svg') no-repeat center/contain;
    }
}

</style>
