<template>
    <div class="theme-switcher">
        <p class="theme-switcher__text">Темная тема</p>
        <toggle :off-label="'Off'" :on-label="'On'" v-model="isDarkTheme"></toggle>
    </div>
</template>

<script>
import Toggle from '@vueform/toggle';
import { ref, watch } from 'vue';
import '@vueform/toggle/themes/default.css';
export default {
    components: {
        Toggle
    },
    setup() {
        const isDarkTheme = ref( false );

        watch(isDarkTheme, () => {
            const rootElement = document.documentElement;

            if ( isDarkTheme.value ) {
                rootElement.setAttribute('data-theme', 'dark');
                
                return;
            }

                rootElement.removeAttribute('data-theme');
        })

        return {
            isDarkTheme,
        }
    }
}
</script>

<style lang="scss">
    .theme-switcher {
        position: absolute;
        top: 36px;
        right: 36px;

        &__text {
            color: var(--color-primary);
        }
    }
</style>
