<template>
  <div>
    <!-- slotData 这个参数可以随便起名 -->
    <slot :slotData="data">默认的文本</slot>
  </div>
</template>

<script>
  // 作用域插槽

  export default {
    name: "scopedSlot",
    data() {
      return {
        data: {
          title: '作用域插槽 hahaha',
        },
      }
    },
  }
</script>

<style scoped>

</style>
