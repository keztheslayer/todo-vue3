<template>
    <div class="item">
        <check-box 
            :modelValue="done"
            @change="handleItemChange()" 
        />
        <div class="item__title" :class="{'item__title_done': done}">{{ title }}</div>
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
        return {
            items,
            handleItemChange,
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

    &__title {
        color: var(--color-primary);
        margin-left: 12px;
        @include font-default();

        &_done {
            text-decoration: line-through;
            color: var(--color-ghost);
        }
    }
}

</style>
