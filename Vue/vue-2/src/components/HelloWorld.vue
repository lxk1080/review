<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>{{ arr }}</div>

    <button @click="click">点我</button>
  </div>
</template>

<script>

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        arr: [1,2,3]
      }
    },
    methods: {
      click() {
        this.$set(this.arr, 0, 'a');
      }
    },
    components: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
