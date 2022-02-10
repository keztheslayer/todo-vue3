<template>
    <form @submit.prevent="addItem" class="add-item">
        <input
            v-model="textItem"
            type="text"
            placeholder="Введите новую задачу"
            class="add-item__input"
        />
        <button 
            class="app-button"
            type="submit"
            :disabled="textItem === ''"
        >
            +
        </button>
    </form>
</template>

<script>
import { ref } from 'vue'

export default {
    setup( props, { emit } ) {
        const textItem = ref('');

        const addItem = () => {
            if ( textItem.value !== '' ) {
                emit('add', textItem.value);
                textItem.value = '';
            }            
        }
        
        return { 
            textItem, 
            addItem,
        }
    }
}
</script>

<style lang="scss">
.add-item {
    margin-top: 16px;
    display: flex;
    align-items: center;

    &__input {
        flex-grow: 1;
        border: none;
        padding: 4px 8px;
        color: var(--color-primary);
        transition: color 0.3s ease-in-out;

        &:focus {
            border: none;
            outline: none;
            &::placeholder {
                color: var(--color-primary);
            }
        }
    }
}
.app-button {
    border-radius: 4px;
    background: var(--color-done);
    padding: 4px 8px;
    margin-left: 12px;
    color: #f2f2f2;
    font-weight: bold;
    cursor: pointer;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;

    &[disabled] {
        cursor: default;
        opacity: 0.5;
    }
}
</style>
