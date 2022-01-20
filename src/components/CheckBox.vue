<template>
    <div class="checkbox">
        <label class="checkbox__label">
            <input v-bind="$attrs" type="checkbox" class="checkbox__input" :checked="modelValue" @change="handleChange($event.target.checked)"/>
            <span class="checkbox__mark"></span>
        </label>
    </div>
</template>
<script>
export default {
    inheritAttrs : false,
    emits: [
        'update:modelValue'
    ],
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
    },
    setup(_, { emit }) {
        const handleChange = (val) => {
            emit('update:modelValue', val);
        }

        return {
            handleChange,
        }
    }
}
</script>
<style lang="scss">
.checkbox {
    display: inline-block;

    &__label {
        display: block;
        position: relative;
        height: 20px;
        width: 20px;
        border-radius: 6px;
        cursor: pointer;

        &:hover {
            .checkbox__mark {
                border-color: var(--color-done);
            }
        }
    }

    &__input{
        position: absolute;
        width: 0;
        height: 0;

        &:checked + .checkbox__mark {
            border-color: var(--color-done);
            background-color: var(--color-done);

            &:after {
                display: block;
            }
        }
    }

    &__mark {
        width: 100%;
        height: 100%;
        background: transparent;
        transition: all 0.2s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid var(--color-ghost);
        border-radius: 6px;

        &:hover {
            border-color: var(--color-done);
        }

        &:after {
            content: '';
            width: 12px;
            height: 9px;
            background: url('../assets/icons/check.svg') no-repeat center/contain;
            display: none;
        }
    }
}
</style>
