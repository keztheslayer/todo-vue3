<template>
    <form @submit.prevent="add()" class="add-item">
        <input
            v-model="textItem"
            type="text"
            placeholder="Введите название"
            class="add-item__input"
        />
        <button 
            class="app-button"
            type="submit"
            :disabled="textItem === ''"
        >
            +
        </button>
        <button
            v-if="folderCreate" 
            class="app-button app-button_type_folder"            
            :disabled="textItem === ''"
            @click="add('folder')"
        >
            +
        </button>
    </form>
</template>

<script>
import { ref } from 'vue'

export default {
    props: {
        folderCreate: {
            type: Boolean,
            default: true,
        }
    },
    setup( props, { emit } ) {
        const textItem = ref('');

        const add = ( type = 'item' ) => {

            if ( textItem.value !== '' ) {
                emit(`add-${type}`, textItem.value);
                textItem.value = '';
            }            
        }
       
        return { 
            textItem, 
            add,
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

    &_type_folder {
        background: url('../assets/icons/folder.svg') no-repeat center;
        background-size: 123%;
        filter: var(--icon-filter);
    }
}
</style>
