<!--suppress XmlUnboundNsPrefix, HtmlUnknownAttribute, HtmlUnknownBooleanAttribute -->
<template>
  <div>
    <!-- 普通插槽 -->
    <CommonSlot>普通插槽</CommonSlot>

    <!-- 作用域插槽 -->
    <ScopedSlot>
      <!-- scopedSlot 这个变量可以随便起名 -->
      <template v-slot="ScopedSlot">
        <div>{{ ScopedSlot.slotData.title }}</div>
      </template>
    </ScopedSlot>

    <!-- 具名插槽 -->
    <NamedSlot>
      <template v-slot:header>
        <div>具名插槽 this is header</div>
      </template>
      <template v-slot:footer>
        <div>具名插槽 this is footer</div>
      </template>
    </NamedSlot>
  </div>
</template>

<script>
  import CommonSlot from './commonSlot';
  import ScopedSlot from './scopedSlot';
  import NamedSlot from './namedSlot';

  export default {
    name: "index",
    components: {
      CommonSlot,
      ScopedSlot,
      NamedSlot
    },
  }
</script>

<style scoped>

</style>
