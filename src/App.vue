<template>
  <div class="main">
    <theme-switcher />
    <todo-list/>
  </div>
  
</template>

<script>
import TodoList from './components/TodoList.vue';
import ThemeSwitcher from './components/ThemeSwitcher.vue';

export default {
  name: 'App',
  components: {
    TodoList,
    ThemeSwitcher,
  },
  setup() {
  }
}
</script>

<style>
  .main {
    padding: 36px;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-bg);
  }
</style>
