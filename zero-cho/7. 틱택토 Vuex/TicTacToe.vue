<template>
  <div>
    <div>{{ store.turn }}님의 차례입니다.</div>
    <table-component :table-data="store.tableData"></table-component>
    <dialog open v-if="store.winner">
      {{ store.winner }}님의 승리입니다!
      <form method="dialog">
        <button value="cancel" @click="store.winner = null">닫기</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import TableComponent from "./TableComponent";
import {store} from "./EventBus";

export default {
  components: {TableComponent},
  data() {
    return {
      store
    };
  },
  computed: {},
  methods: {},
  created() { // 사용자 정의 event 등록 가능
  },
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