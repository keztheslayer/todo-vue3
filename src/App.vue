<template>
  <div class="main">
    <theme-switcher />
    <todo-list :data="data"/>
  </div>
  
</template>

<script>
import TodoList from './components/TodoList.vue';
import ThemeSwitcher from './components/ThemeSwitcher.vue';
import fakeData from './utils/fakeData';

export default {
  name: 'App',
  components: {
    TodoList,
    ThemeSwitcher,
  },
  setup() {
    const data = fakeData;

    return {
      data
    }
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
