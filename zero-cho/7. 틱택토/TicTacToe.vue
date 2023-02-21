<template>
  <div>
    <table-component :table-data="tableData"></table-component>
    <div>{{turn}}님의 차례입니다.</div>
  </div>
</template>

<script>
import TableComponent from "./TableComponent";

export default {
  components: {TableComponent},
  data() {
    return {
      tableData: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      turn: "O",

    };
  },
  computed: {},
  methods: {},
}
</script>

<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>