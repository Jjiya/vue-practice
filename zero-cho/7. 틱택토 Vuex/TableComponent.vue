<template>
  <slot></slot> <!-- component 안에 다른 태그를 넣어주면 slot 태그에 들어가게 됨. react의 children과 동일 -->
<!--  <slot name="default">-->
<!--    slot 안에 넣으면 기본 값 설정 가능 -->
<!--    <tr>-->
<!--      <td></td>-->
<!--    </tr>-->
<!--  </slot>-->
</template>

<script>
// import TrComponent from "./TrComponent";

export default {
  // name: "TableComponent",
  // components: {TrComponent},
  // computed: {
  //   tableData() {
  //     return this.$store.state.tableData;
  //   }
  // }
}
</script>

<style scoped>

</style>