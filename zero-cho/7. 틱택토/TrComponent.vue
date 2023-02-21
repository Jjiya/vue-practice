<template>
  <tr>
    <td-component v-for="(cellData, index) in rowData"
                  :row-index="rowIndex"
                  :cell-data="cellData" :cell-index="index"
    ></td-component>
  </tr>
</template>

<script>
import TdComponent from "./TdComponent";

export default {
  name: "TrComponent",
  components: {TdComponent},
  props: {
    rowData: Array,
    rowIndex: Number
  }
}
</script>

<style scoped>

</style>