<template>
  <div>
    <h1>{{ result }}</h1>
    <form @submit.prevent="onSubmitForm"> <!-- v-on >> @로 변환 가능, event.preventDefault를 여기서 .prevent를 추가함으로써 적용 가능 -->
      <input ref="answer" maxlength="4" v-model="value">
      <button>입력</button>
    </form>

    <div>
      <p>기록</p>
      <div v-for="idx in [1,2,3,4]">
        {{ idx }}번째 수: <input>
      </div>
    </div>

    <div> 시도: {{ tries.length }}</div>
    <ul>
      <li v-for="trying in tries">
        <div>{{ trying.tryNumber }}</div>
        <div>- {{ trying.result }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let array = [];

  for (let i = 0; i < 4; i++) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }

  return array;
}
export default {
  data() {
    return {
      answer: getNumbers(),
      tries: [],
      value: "",
      result: ""
    };
  },
  methods: {
    onSubmitForm() {
      let result;
      if (this.value === this.answer.join(",")) {
        result = "홈런";
        this.result = result;

        this.resetGame();
      } else {
        if (this.tries.length === 9) {
        this.result = `10회 실패. 정답은 ${this.answer.join(",")}입니다! 5초 뒤 다시 시작합니다.`;

          setTimeout(() => {
            this.resetGame();
          }, 5000);
        }

        let ball = 0;
        let strike = 0;

        [...this.value].forEach((number, idx) => {
          number = parseInt(number);

          if (number === this.answer[idx]) {
            strike++;
          } else if (this.answer.includes(number)) {
            ball++;
          }
        });

        result = `${strike} 스트라이크, ${ball}볼입니다.`;
      }

      this.tries.push({
        tryNumber: this.value,
        result,
      });

      this.value = "";
      this.$refs.answer.focus();
    },
    resetGame() {
      this.value = "";
      this.result = "";
      this.tries = [];
      this.answer = getNumbers();
      alert("게임을 다시 시작합니다.");
    }
  }
}
</script>

<style></style>