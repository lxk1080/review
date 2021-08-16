<template>
  <div>
    <div>{{ message }}</div>
    <Child v-model="message"></Child>
  </div>
</template>

<script>
  import Child from './child';

  export default {
    name: "index",
    data() {
      return {
        message: '123',
      }
    },
    components: {
      Child,
    },
  }
</script>

<style scoped>

</style>
