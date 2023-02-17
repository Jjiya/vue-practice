<template>
  <div>
    <div id="screen" v-bind:class="state" @click="onClickScreen">{{ message }}</div>
    <template v-show="result.length"> <!-- template를 사용하면 html로 변환 안함 그래서 위의 #screen과 아래 div가 형제 노드가 됨-->
      <!--
        v-if와 비슷한 느낌임. 안의 값이 false면 display: none;

        v-if는 false일 때 태그 자체가 존재하지 않음(주석으로 뜸)
        v-show는 false일 떄 display가 none으로 설정될 뿐 태그는 존재함

        레이아웃에 영향을 줄 수 있기때문에 아예 없어야하는건지, 눈에만 안보여야하는건지
       -->
      <div>평균 시간: {{ average }}ms</div>
      <button @click="onReset">리셋</button>
    </template>
    <div>
      기록 {{ result.length }}회
      <ol>
        <li v-for="rs in result">{{ rs }}ms</li>
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
  computed: {  // data의 값을 가공해서 사용할 때 주로 씀
    // 값이 cashing이 되기 때문에 computed를 사용함 (성능 최적화를 위함) result 값이 바뀌었을때만 재실행되게 됨 = react useEffect
    average() {
      return (this.result.reduce((sum, time) => sum + time, 0) / this.result.length) || 0;
    }
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
          }, Math.floor(Math.random() * 1000) + 2000);  // 2~3초

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