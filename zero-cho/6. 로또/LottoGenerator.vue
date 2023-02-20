<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball v-for="ball in winBalls" :key="ball"></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus"></lotto-ball>
    <button v-if="redo">한 번 더!</button>
  </div>
</template>

<script>
import LottoBall from "./LottoBall";

const getWinNumbers = () => {
  const candidate = Array(45).fill().map((value, idx) => idx + 1);
  const shuffle = [];

  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() & candidate.length), 1)[0]);
  }

  const bonusNumber = shuffle[-1];
  const winNumbers = shuffle.splice(0, 6).sort((prev, current) => prev - current);

  return [...winNumbers, bonusNumber];
}

export default {
  components: {
    LottoBall,  // 파스칼 케이스와 케밥 케이스 자동 호환가능 => "lotto-ball" : LottoBall 을 왼쪽과 같이 줄일 수 있음
  },
  data() {
    return {
      winNumbers: getWinNumbers(),
      winBalls: [], // 시각적 효과 위함
      bonus: null,
      redo: false,
    };
  },
  computed: {},
  methods: {},
  mounted() {
  },
  beforeUnmount() {
  },
  watch() {

  },
}
</script>

<style scoped>
</style>