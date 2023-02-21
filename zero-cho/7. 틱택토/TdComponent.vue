<template>
  <td>{{cellData}}</td>
</template>

<script>
export default {
  name: "TdComponent",
  props: {
    cellData: String,
    cellIndex: Number,
    rowIndex: Number
  }
}
</script>

<style scoped>

</style>