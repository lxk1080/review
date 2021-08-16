<template>
  <div>
    <input type="text" :value="mess" @input="$emit('modelChange', $event.target.value)">
  </div>
</template>

<script>
  export default {
    name: "child",
    model: { // 主要是这个api，上面的变量名和触发的事件名要和 model 里对应，注意变量名赋给了 value，不能用 v-model
      prop: 'mess', // 作为 model 的变量，名字随便，需要在 props 里声明
      event: 'modelChange', // 方法也是自己随便写
    },
    props: {
      mess: { // 随便定义一个变量，只需要和 model 里的 prop 相同即可
        type: String,
        default: '',
      }
    },
  }
</script>

<style scoped>

</style>
