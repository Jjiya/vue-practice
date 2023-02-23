<template>
  <div>
    <mine-form/>
    <div>{{ timer }}</div>
    <table-component></table-component>
    <div v-if="halted">{{ resultMessage }}</div>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import TableComponent from "./TableComponent";
import MineForm from "./MineForm";
import store, {INCREMENT_TIMER} from "./store";

let interval = null;
let time = {
  hour: 0,
  minute: 0,
  second: 0,
}
export default {
  store,
  components: {TableComponent, MineForm},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      timer: state => {
        if (state.timer === 0) {
          time = {
            hour: 0,
            minute: 0,
            second: 0,
          }
        } else {
          time.second++;

          if (60 <= time.second) {
            time.minute++;
            time.second -= 60;

            if (time.minute % 60 === 0) {
              time.hour++;
              time.minute -= 60;
            }
          }
        }

        return `${time.hour}시간 ${time.minute}분 ${time.second}초`;
      },
      halted: state => state.halted,
    }),
    ...mapGetters(["resultMessage"]),
  },
  methods: {},
  watch: {
    halted(isStop, prev) {
      if (isStop) {  // 게임 중단
        clearInterval(interval);
        return;
      }

      interval = setInterval(() => {
        this.$store.commit(INCREMENT_TIMER);
      }, 1000);
    }
  },
  beforeUnmount() {
    clearInterval(interval);
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