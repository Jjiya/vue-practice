<template>
  <tr-component v-for="(rowData, rowIndex) in tableData"
                :key="rowIndex"
                :row-data="rowData" :row-index="rowIndex"
  ></tr-component>
</template>

<script>
import TrComponent from "./TrComponent";

export default {
  name: "TableComponent",
  components: {TrComponent},
  props: {
    tableData: Array
  }
}
</script>

<style scoped>

</style>