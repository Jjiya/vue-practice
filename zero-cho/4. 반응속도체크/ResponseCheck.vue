<template>
  <div>
    <div id="screen" v-bind:class="state" @click="onClickScreen">{{ message }}</div>
    <div>
      <div>평균 시간: {{ (result.reduce((sum, time) => sum + time, 0) / result.length) || 0 }}ms</div>
      <button @click="onReset">리셋</button>
    </div>
    <div>
      기록 {{result.length}}회
      <ol>
        <li v-for="rs in result">{{rs}}ms</li>
      </ol>
    </div>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let stateToNowTimeout = null;

export default {
  data() {
    return {
      result: [],
      state: "waiting",
      message: "클릭해서 시작하세요.",
    };
  },
  methods: {
    onReset() {
      this.result = [];
    },
    onClickScreen() {
      switch (this.state) {
        case "waiting":
          this.state = "ready";
          this.message = "초록색이 되면 클릭하세요.";

          stateToNowTimeout = setTimeout(() => {
            this.state = "now";
            this.message = "지금 클릭하세요!";
            startTime = new Date();
          }, Math.floor(Math.random() * 1000) + 2000);

          break;
        case "ready":
          clearTimeout(stateToNowTimeout);

          this.state = "waiting";
          this.message = "너무 성급하시군요! 초록색이 된 후에 클릭하세요.";

          setTimeout(() => {
            this.onClickScreen();
          }, 1500);
          break;

        case "now":
          endTime = new Date();
          this.state = "waiting";
          this.message = "클릭해서 시작하세요.";

          this.result.push(endTime - startTime);
          break;
      }
    },
  }
}
</script>

<style scoped>
/*scoped: 현재 컴포넌트에서만 css가 적용되게끔 범위 적용하는 것*/
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}

#screen.waiting {
  background-color: aqua;
}

#screen.ready {
  background-color: red;
  color: #fff;
}

#screen.now {
  background-color: green;
}
</style>