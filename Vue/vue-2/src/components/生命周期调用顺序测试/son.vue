<template>
  <div>
    <div>我是 son</div>
    <div>{{ str }}</div>
    <button @click="sonClick">点son</button>
  </div>
</template>

<script>
  export default {
    name: "Son",
    props: {
      mes: {
        type: String,
      }
    },
    data() {
      return {
        data: 'haha',
      }
    },
    computed: {
      str() {
        return this.data + ' uu'
      }
    },
    beforeCreate() {
      console.log('Son beforeCreate')
    },
    created() {
      console.log('Son created')
    },
    beforeMount() {
      console.log('Son beforeMount')
    },
    mounted() {
      console.log('Son mounted')
    },
    beforeUpdate() {
      console.log('Son beforeUpdate')
    },
    updated() {
      console.log('Son updated')
    },
    beforeDestroy() {
      console.log('Son beforeDestroy')
    },
    destroyed() {
      console.log('Son destroyed')
    },
    methods: {
      sonClick() {
        this.data = 'hehe'
      },
    },
  }
</script>

<style scoped>

</style>
