<template>
    <div class="item">
        <check-box name="test" v-model="kek" />
        {{ kek }}
        <div></div>
        <div></div>
    </div>
</template>
<script>
import CheckBox from './CheckBox.vue';
import { ref } from 'vue';

export default {
    name: 'TodoItem',
    components: {
        CheckBox,
    },
    setup() {
        const kek = ref( true );

        return {
            kek
        }
    }
}
</script>
<style lang="scss">
    .item {
        display: flex;
    }
</style>
