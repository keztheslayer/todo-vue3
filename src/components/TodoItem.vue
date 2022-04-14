<template>
    <div
        class="q"
        :style="dotStyle"
    >
    </div>
    <div class="item"
        :data-item-id="id"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @mousedown="onMouseDown"
        @dragenter="onDragEnter"
        @dragleave="onDragleave"
        @dragover="onDragOver"
        @drop="onDrop"
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
import { reactive } from 'vue';
import CheckBox from './CheckBox.vue';
import mutations from '../store/mutations';
import getters from '../store/getters';
import { dragItem } from '../core/dragItem';
import _ from 'lodash-es'

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
        // clientX, clientY - Координаты курсора
        // Высчитываем расстояние от верха экрана до TodoItem, учитываем высоту TodoItem и навешиваем нужные стили
        // Тень/бордер на место падения TodoItem'а
        const dotStyle = reactive({
            top: '0px',
            left: '0px'
        })
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
            dragItem.value = event.target;
        }
        const onDragEnd = (event) => {
            event.target.removeAttribute('style');
        }

        const onDragEnter = (event) => {
            event.target.style.outline = '2px solid var(--color-done)';
        }
        const onDragleave = (event) => {
            event.target.style.outline = '';
        }
        const onDragOver = (event) => {
            event.preventDefault();
            dotStyle.top = event.clientY + 'px';
            dotStyle.left = event.clientX + 'px';
        }
        const onDrop = (event) => {
            event.target.style.outline = '';
            console.log('Drop!!!!!!!', event, dragItem.value)
        }
        const onMouseDown = (event) => {
            if ( event.target.dataset.action === 'edit' ) {
                return;
            }
            if (event.target.dataset.action !== 'move') {
                event.preventDefault();
            }
        }

        const documentDragOver = ( event ) => {
            event.preventDefault();
            console.log('DragOver')
        }

        document.addEventListener('dragover', _.throttle(documentDragOver, 400))

        return {
            items,
            handleItemChange,
            removeItem,
            editItem,
            onDragStart,
            onDragEnd,
            onMouseDown,
            onDragEnter,
            onDragleave,
            onDragOver,
            onDrop,
            dotStyle
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

.q {
    width: 20px;
    height: 20px;
    background-color: red;
    position: fixed;
    transition: all 0.2s ease;
    top: 0;
    left: 0;
}


</style>
