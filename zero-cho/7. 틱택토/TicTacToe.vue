<template>
  <div>
    <div>{{ turn }}님의 차례입니다.</div>
    <table-component :table-data="tableData"></table-component>
    <!--    <div v-if="winner">{{ winner }}님의 승리입니다!</div>-->
    <dialog open v-if="winner">
      {{ winner }}님의 승리입니다!
      <form method="dialog">
        <button value="cancel" @click="this.winner = null">닫기</button>
      </form>
    </dialog>
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
      winner: null,
    };
  },
  computed: {},
  methods: {
    initData(winner) {
      this.tableData = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ];

      if (winner) {
        this.turn = winner;
      } else {
        this.changeTurn();
      }

      this.winner = winner;

      setTimeout(() => {
        this.winner = null;
      }, 2000);
    },
    changeTurn() {
      const turning = {
        "O": "X",
        "X": "O",
      };

      this.turn = turning[this.turn];
    }
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