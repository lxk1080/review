<template>
  <div>
    <slot name="header">默认的文本</slot>
    <slot name="footer">默认的文本</slot>
  </div>
</template>

<script>
  // 具名插槽

  export default {
    name: "namedSlot"
  }
</script>

<style scoped>

</style>
