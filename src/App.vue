<template>
  <div class="main">
    <theme-switcher />
    <todo-list />
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
  }
}
</script>

<style>
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-bg);
  }
</style>
