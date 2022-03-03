<template>
    <div class="item">
        <check-box 
            :modelValue="done"
            @change="handleItemChange()" 
        />
        <div 
            class="item__title"
            :class="{'item__title_done': done}"
            contenteditable="true"
            @input="editItem"
            @keydown.enter.escape.prevent="editItem && $event.target.blur()"
        >
            {{ title }}
        </div>
        <button
            class="item__button-remove"
            @click="removeItem"
        />
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
        return {
            items,
            handleItemChange,
            removeItem,
            editItem,
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
        & .item__button-remove {
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

    &__button-remove {
        display: none;
        margin-left: auto;
        width: 18px;
        height: 18px;
        background: url('../assets/icons/trash.svg') no-repeat center/contain;
        filter: var(--icon-filter);
        cursor: pointer;
    }
}

</style>
