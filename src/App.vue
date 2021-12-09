<template>
  <div class="main">
    <todo-list />
  </div>
  
</template>

<script>
import TodoList from './components/TodoList.vue';

export default {
  name: 'App',
  components: {
    TodoList,
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
  }
</style>
