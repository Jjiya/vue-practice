<template>
  <div>
    <div>{{ turn }}님의 차례입니다.</div>
    <table-component/>
    <dialog open v-if="winner">
      {{turnMessage}}
      <form method="dialog">
        <button value="cancel" @click="closePopup">닫기</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import TableComponent from "./TableComponent";
import store, {NO_WINNER} from "./store";

export default {
  store,
  components: {TableComponent},
  data() {
    return {
      data: 1,
    };
  },
  computed: {
    ...mapState(["turn", "winner"]),
    // ...mapState({  // 객체 형으로도 가능
    //   winner : state => state.winner,
    //   turnState : "turn",  // <= state에 있는 키 값 변경 시 이런 방법도 가능
    //   turn (state) {
    //      return state.turn + this.data;  // 기존 component에 있는 값을 불러와서 쓸 수도 있음 ( arrow function(=>)에서는 적용 불가능)
    //    }
    // }),
    //아래의 코드를 mapState를 이용해 간편하게 불러올 수 있도록 변경할 수 있음
    // turn() {
    //   return this.$store.state.turn;
    // },
    // winner() {
    //   return this.$store.state.winner;
    // }
    ...mapGetters(["turnMessage"]),
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