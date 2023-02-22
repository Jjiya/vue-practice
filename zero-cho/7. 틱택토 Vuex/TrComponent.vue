<template>
  <tr>
    <td-component v-for="(cellData, cellIndex) in rowData"
                  :key="cellIndex"
                  :row-index="rowIndex"
                  :cell-index="cellIndex"
    ></td-component>
  </tr>
</template>

<script>
import TdComponent from "./TdComponent";

export default {
  name: "TrComponent",
  components: {TdComponent},
  data() {
    return {
      parent: "부모인 tr이다."
    }
  },
  computed: {
    rowData() {
      return this.$store.state.tableData[this.rowIndex];
    }
  },
  props: {
    rowIndex: Number
  }
}
</script>

<style scoped>

</style>