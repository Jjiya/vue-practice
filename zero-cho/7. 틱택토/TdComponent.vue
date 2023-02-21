<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
export default {
  name: "TdComponent",
  props: {
    cellData: String,
    cellIndex: Number,
    rowIndex: Number
  },
  methods: {
    onClickTd() {
      console.log(this.$root.$data);  // 최상위 root data 접근
      console.log(this.$parent.$data);  // 상위 parent data 접근

      let turning = {
        "O": "X",
        "X": "O",
      };
      let {turn} = this.$root.$data;

      this.$root.$data.turn = turning[turn];
    }
  }
}
</script>

<style scoped>

</style>