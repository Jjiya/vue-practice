<template>
  <tr>
    <td-component v-for="(cellData, cellIndex) in rowData"
                  :key="cellIndex"
                  :row-index="rowIndex"
                  :cell-data="cellData" :cell-index="cellIndex"
    ></td-component>
  </tr>
</template>

<script>
import TdComponent from "./TdComponent";

export default {
  name: "TrComponent",
  components: {TdComponent},
  data() {
    return{
      parent: "부모인 tr이다."
    }
  },
  props: {
    rowData: Array,
    rowIndex: Number
  }
}
</script>

<style scoped>

</style>