<template>
    <div class="theme-switcher">
        <toggle v-model="isDarkTheme"></toggle>
    </div>
</template>

<script>
import Toggle from '@vueform/toggle';
import { ref, watch } from 'vue';
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

<style src="@vueform/toggle/themes/default.css"></style>
