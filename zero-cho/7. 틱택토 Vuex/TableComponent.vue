<template>
  <tr-component v-for="(rowData, rowIndex) in tableData"
                :key="rowIndex"
                :row-index="rowIndex"
  ></tr-component>
</template>

<script>
import TrComponent from "./TrComponent";

export default {
  name: "TableComponent",
  components: {TrComponent},
  computed: {
    tableData() {
      return this.$store.state.tableData;
    }
  }
}
</script>

<style scoped>

</style>