<template>
  <div>
    <div>我是 Father</div>
    <div>{{ message }}</div>
    <button @click="fatherClick">点father</button>
    <Son :mes="message" @sonClick="onSonClick"></Son>
  </div>
</template>

<script>
  import Son from './son';

  export default {
    name: "Father",
    data() {
      return {
        message: '没变',
      }
    },
    beforeCreate() {
      console.log('Father beforeCreate')
    },
    created() {
      console.log('Father created')
    },
    beforeMount() {
      console.log('Father beforeMount')
    },
    mounted() {
      console.log('Father mounted')
    },
    beforeUpdate() {
      console.log('Father beforeUpdate')
    },
    updated() {
      console.log('Father updated')
    },
    beforeDestroy() {
      console.log('Father beforeDestroy')
    },
    destroyed() {
      console.log('Father destroyed')
    },
    methods: {
      onSonClick() {
        this.message = '变了';
      },
      fatherClick() {
        this.message = '变了';
      },
    },
    components: {
      Son,
    },
  }
</script>

<style scoped>

</style>
