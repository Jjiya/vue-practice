<template>
  <div>
    <div>{{ turn }}님의 차례입니다.</div>
    <table-component />
    <dialog open v-if="winner">
      {{ winner }}님의 승리입니다!
      <form method="dialog">
        <button value="cancel" @click="closePopup">닫기</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import TableComponent from "./TableComponent";
import store, {NO_WINNER} from "./store";

export default {
  store,
  components: {TableComponent},
  data() {
    return {};
  },
  computed: {
    turn() {
      return this.$store.state.turn;
    },
    winner() {
      return this.$store.state.winner;
    }
  },
  methods: {
    closePopup() {
      this.$store.commit(NO_WINNER);
    }
  }
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