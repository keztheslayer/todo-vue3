<template>
    <div class="checkbox">
        <label class="checkbox__label">
            <input type="checkbox" class="checkbox__input" />
            <span class="checkbox__mark"></span>
        </label>
    </div>
</template>
<script>

</script>
<style lang="scss">
.checkbox {
    display: inline-block;

    &__label {
        display: block;
        position: relative;
        height: 24px;
        width: 24px;
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
        }
    }
}
</style>
